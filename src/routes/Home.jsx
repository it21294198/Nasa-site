import React, { useRef, useEffect } from 'react';
import { Canvas } from '../context/Canvas'

export default function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    // Canvas API code goes here
    Canvas(context,canvas)
  }, []);

  return (
    <div className="relative h-screen">
      <canvas
        className="absolute inset-0 h-full w-full z-0"
        ref={canvasRef}
      />
      <div className="relative z-1 md:p-32 md:mb-20">
        <div className="md:text-[128px] md:-mb-16 sm:text-[64px]">Astro</div>
        <div className="md:text-[128px] md:-mb-8">Visions</div>
        <div className="md:text-[28px] md:mb-16">
          From infinity universe to your eyes
        </div>
      </div>
    </div>
  );
}
