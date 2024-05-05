import React,{useState,useEffect,Suspense} from 'react';
import Loading from '../components/Loading';
import DateFormatter from '../hooks/DateFormatter';
import axios from 'axios'

export default function Earth() {
  const [getDate, setGetDate] = useState(new Date());
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageURI, setImageURI] = useState('');
  const [dateOnURL, setDateOnURL] = useState('');
  const [apiData, setApiData] = useState('');

  const dataValidator = (selectedDate) => {
    if( selectedDate >= new Date()){
      alert('We can show you the future yet !!!')
    }else{
      setGetDate(selectedDate)
    }
  }

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  let content = [{}]
useEffect(() => {
  console.log(new Date().toISOString().split('T')[0])
  content.length = 0;
  const fetchDailyData = async () =>{
    await axios.get(`https://api.nasa.gov/EPIC/api/natural/date/${dateOnURL}?api_key=${import.meta.env.VITE_NASA_API_KEY}`)
    .then(function (response) {
      console.log(response.data);
      const result = DateFormatter(response.data);
      // setImageURI(result[0])
      let currentIndex = 0;
      const intervalId = setInterval(() => {
        setImageURI(result[currentIndex]);
        setApiData(result[currentIndex])
        currentIndex = (currentIndex + 1) % result.length;
      }, 3000);
      return () => clearInterval(intervalId); 
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  setDateOnURL(getDate.toISOString().split('T')[0])
  fetchDailyData()
  console.log('ran')
}, [getDate]);

  if(content.length === 0 && imageLoaded ){
    return(
      <>
      <div className="hero min-h-screen bg-base">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="skeleton h-64 w-64 flex justify-center items-center"><Loading/></div>
        </div>
      </div>
      </>
    )
  }
  
  return (
    <div>
      <div className='lg:text-[96px] md:text-[64px] md:-mb-16 text-center'>AstroVisions</div>
      <div className="hero min-h-screen bg-base">
        <div className='grid grid-cols-1'>
          <input type="date" onChange={(e)=>dataValidator(new Date(e.target.value))} value={getDate ? getDate.toISOString().split('T')[0] : ''} id="earth-time" name="earth-time" className='input input-bordered input-info' />
          <div className="relative">
            {!imageLoaded && (
              <div className="absolute top-20 inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
                <Loading />
              </div>
            )}
            {imageURI === '' ? 
            <></>:
            <Suspense fallback={<Loading />}>
              <img
              onLoad={handleImageLoad}
              src={`https://api.nasa.gov/EPIC/archive/natural/${imageURI}.png?api_key=${import.meta.env.VITE_NASA_API_KEY}`}
              className="md:mt-12 lg:mb-1 lg:order-2 md:order-1 sm:order-1 max-w-sm rounded-lg shadow-2xl"
              alt="NASA EPIC Image"
              />
            </Suspense>
          }
          </div>
        </div>
      </div>
    </div>
  );
}
