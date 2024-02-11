import React, { useEffect, useRef, useState } from 'react';
import blueMarble from '../resources/globeImg.jpg';
import Globe from 'react-globe.gl';
import countriesMap from '../data/worldmap.geojson';

export default function Home() {
  const [countries, setCountries] = useState();

  useEffect(() => {
    fetch(countriesMap)
      .then((res) => res.json())
      .then((countries) => {
        setCountries(countries);
        console.log('countries loaded');
      });
  }, []);

  return countries ? (
    <Globe
      globeImageUrl={blueMarble}
      backgroundImageUrl='//unpkg.com/three-globe/example/img/night-sky.png'
      lineHoverPrecision={0}
      polygonsData={countries.features.filter(
        (d) => d.properties.ISO_A2 !== 'AQ'
      )}
      polygonAltitude={0.06}
      polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
      polygonStrokeColor={() => '#111'}
      polygonLabel='testing'
      onPolygonHover={(polygon) => console.log('polygon', polygon)}
      polygonsTransitionDuration={10}
    />
  ) : (
    <div>Loading data...</div>
  );
}
