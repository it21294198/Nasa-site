import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import axios from 'axios'

export default function Mars() {
  const [cardsData, setCardsData] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const [imageNo, setImageNo] = useState(0);

  const goBack = () => {
    if(imageNo>=9){
      setImageNo(imageNo - 9)
    }
    }

  const goForward = () => {
    if(cardsData.length >= imageNo){
      setImageNo(imageNo + 9)
    }
  }

  useEffect(() => {
    const fetchDailyData = async () =>{
      await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${import.meta.env.VITE_NASA_API_KEY}`)
      .then(function (response) {
        console.log(response.data.photos)
        setCardsData(response.data.photos)
        setShowContent(true)
      })
      .catch(function (error) {
        console.log(error);
      })
    }
    fetchDailyData()
  }, [imageNo]);

  if (!showContent) {
    return (
      <>
        <div className='grid md:grid-cols-1 lg:grid-cols-3 gap-1 justify-center items-center'>
          {[...Array(7)].map((_, index) => (
            <div key={index} className="flex justify-center items-center m-4">
              <div className="flex flex-col gap-4 w-full justify-center items-center">
                <div className="skeleton h-32 w-96 flex justify-center items-center"><Loading /></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-96"></div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="flex justify-center items-center">
    <div className="grid grid-cols-1 justify-center items-center">
      <div className='grid md:grid-cols-1 lg:grid-cols-3 gap-1 justify-center items-center'>
        {cardsData.slice(imageNo, imageNo+9).map((card) => (
          <div key={card.id} className="card w-96 bg-base-100 shadow-xl m-1 p-1">
            <figure><img src={card.img_src} alt={card.full_name} /></figure>
            <div className="card-body">
              <h2 className="card-title">{card.full_name}</h2>
              <p>Images from {card.rover.name} rover</p>
            </div>
          </div>
        ))}
    </div>
        <div className='grid md:grid-cols-2 gap-3 ml-10 mr-10 p-10'>
          <button onClick={goBack} className="btn btn-outline btn-info">Back</button>
          <button onClick={goForward} className="btn btn-outline btn-info">Forward</button>
        </div>
      </div>
      </div>
  );
}