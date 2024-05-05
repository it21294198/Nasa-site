// sign in and login
import React,{useState, useContext , useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { logUser } from '../context/userSlice'
import Loading from '../components/Loading'
import {UserContext } from '../context/use_context'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { state, setState } = useContext(UserContext);

  useEffect(() => {

    if(sessionStorage.getItem('token') !== null || ''){
      // setState('test')
      // navigate("/");
    }
    
  }, []);

  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }
  });

  const loginUser = () =>{
    if(email !== '' && password !== ''){
      setIsLoading(true);
      axios.post(`${import.meta.env.VITE_SERVE_URL}/user/login`,{
        email,
        password
      })
      .then(function (response) {
        console.log(response);
        sessionStorage.setItem('token', response.data.access_token);
        console.log(sessionStorage.getItem('token'))
        setState(email)
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false); // Set loading state to false after the API request is completed
      });
    }else{
      alert('Enter Email and Password Both')
    }
  }

  const signInUser = () =>{
    if(email !== '' && password !== ''){
      axios.post(`${import.meta.env.VITE_SERVE_URL}/user`,{
        email,
        password
      })
      .then(function (response) {
        console.log(response);
        if(response.data.email === email){
          alert('Press the login button')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }else{
      alert('Enter Email and Password Both')
    }
  }

  if(isLoading){
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
      <div className="lg:hidden mt-10 -mb-32 flex justify-center bg-gray-700 bg-opacity-50 flex-col items-center">
        <div className="md:text-[64px]">AstroVisions</div>
        <div className="md:text-[32px]">From infinity univers to your eyes</div>
      </div>
      <div className="hero min-h-screen bg-base">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className='lg:ml-32 grid grid-cols-1 gap-3 w-64'>
            <div>{state}</div>
          <input onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="Email" className="input input-bordered input-info w-full max-w-xs" />
          <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" className="input input-bordered input-info w-full max-w-xs" />
          <div className='grid grid-cols-2 gap-4'>
            <button className="btn btn-outline" onClick={loginUser}>LogIn</button> 
            <button className="btn btn-outline btn-info" onClick={signInUser}>SignIn</button>
          </div>
          </div>
          <div className='lg:block sm:hidden mr-32'>
            <div className='md:text-[128px] md:-mb-16 lg:block md:hidden'>Astro</div>
            <div className='md:text-[128px] md:-mb-8 lg:block md:hidden'>Visions</div>
            <div className='md:text-[28px] md:mb-16 lg:block md:hidden'>From infinity univers to your eyes</div>
          </div>
        </div>
      </div>
    </div>
  )
}
