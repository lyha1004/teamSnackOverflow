import React from 'react';
import { useRef } from 'react'; 
import Globe from 'react-globe.gl';

export default function Home() {
  const globeEl = useRef();

  return (
    <Globe
      ref={globeEl}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
    />
  );
}
