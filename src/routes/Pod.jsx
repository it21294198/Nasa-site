import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import axios from 'axios';

export default function Pod() {
  const [showContent, setShowContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_POD_END_POINT, {
          params: {
            api_key: import.meta.env.VITE_NASA_API_KEY
          }})
        // const response = await axios.get(`${import.meta.env.VITE_POD_END_POINT}?api_key=${import.meta.env.VITE_NASA_API_KEY}`);
        setShowContent(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching APOD data:', error);
      }
    };

    fetchData();
  }, []);

  if (!showContent) {
    return (
      <>
        <div className="hero min-h-screen bg-base">
          <div className="hero-showContent flex-col lg:flex-row-reverse">
            <div className="skeleton h-64 w-64 flex justify-center items-center">
              <Loading />
            </div>
            <div className='grid gap-3 mt-4'>
              <div className="skeleton h-8 w-32"></div>
              <div className="skeleton h-32 w-96"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <div className='lg:text-[96px] md:text-[64px] md:-mb-16 text-center'>AstroVisions</div>
      <div className="hero min-h-screen bg-base p-8">
        <div className="hero-showContent grid gap-2 lg:grid-cols-2 md:grid-cols-1 justify-items-center">
          <img src={showContent.url} className="md:mt-12 lg:mb-1 lg:order-2 md:order-1 sm:order-1 max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-[25px] font-bold">{showContent.title}</h1>
            <p className="">{showContent.explanation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}