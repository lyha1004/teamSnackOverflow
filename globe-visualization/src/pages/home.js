import React from 'react';
import { useRef } from 'react'; 
import blueMarble from '../resources/globeImg.jpg'
import Globe from 'react-globe.gl';

export default function Home() {
  const globeEl = useRef();

  return (
    <Globe
      ref={globeEl}
      globeImageUrl={blueMarble}
    />
  );
}
