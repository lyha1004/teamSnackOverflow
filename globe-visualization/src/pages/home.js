import React, { useEffect, useRef, useState } from 'react';
import blueMarble from '../resources/globeImg.jpg';
import Globe from 'react-globe.gl';
import countriesMap from '../data/worldmap.geojson';

export default function Home() {
  const [countries, setCountries] = useState();
  const [hoveredPolygon, setHoveredPolygon] = useState();

  useEffect(() => {
    fetch(countriesMap)
      .then((res) => res.json())
      .then((countries) => {
        setCountries(countries);
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
      polygonAltitude={(d) => (d === hoveredPolygon ? 0.09 : 0.03)}
      polygonCapColor={() => 'rgba(0, 100, 0, 0.65)'}
      polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
      polygonStrokeColor={() => '#111'}
      polygonLabel={() => 'Testing text'} 
      onPolygonHover={(polygon) => setHoveredPolygon(polygon)}
      polygonsTransitionDuration={200}
    />
  ) : (
    <div>Loading data...</div>
  );
}
