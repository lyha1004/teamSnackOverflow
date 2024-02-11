import React, { useEffect, useRef, useState } from 'react';
import BlueMarble from '../resources/globeImg.jpg';
import Globe from 'react-globe.gl';
import CountriesMap from '../data/worldmap.geojson';
import ConocoData from '../data/conocoData.json';

export default function Home() {
  const [countries, setCountries] = useState();
  const [hoveredPolygons, setHoveredPolygons] = useState([]);
  let conocoCountries = Object.keys(ConocoData);
  conocoCountries.shift();
  conocoCountries.pop();

  useEffect(() => {
    fetch(CountriesMap)
      .then((res) => res.json())
      .then((countries) => {
        setCountries(countries);
      });
  }, []);

  const hoverEffect = (polygon) => {
    if (!polygon) {
        setHoveredPolygons([]);
        return;
    }
    const country = polygon.properties.NAME;
    if (country === 'Norway' || country === 'United Kingdom') {
      setHoveredPolygons(
        countries.features.filter(
          (d) =>
            d.properties.NAME === 'Norway' ||
            d.properties.NAME === 'United Kingdom'
        )
      );
    } else if (country === 'Indonesia' || country === 'Malaysia') {
      setHoveredPolygons(
        countries.features.filter(
          (d) =>
            d.properties.NAME === 'Indonesia' ||
            d.properties.NAME === 'Malaysia'
        )
      );
    } else {
      setHoveredPolygons([polygon]);
    }
  };

  return countries ? (
    <Globe
      globeImageUrl={BlueMarble}
      backgroundImageUrl='//unpkg.com/three-globe/example/img/night-sky.png'
      lineHoverPrecision={0}
      polygonsData={countries.features.filter(
        (d) => d.properties.ISO_A2 !== 'AQ'
      )}
      polygonAltitude={(d) => (hoveredPolygons.includes(d) ? 0.09 : 0.03)}
      polygonCapColor={() => 'rgba(0, 100, 0, 0.65)'}
      polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
      polygonStrokeColor={() => '#111'}
      polygonLabel={() => 'Testing text'}
      onPolygonHover={hoverEffect}
      polygonsTransitionDuration={200}
    />
  ) : (
    <div>Loading data...</div>
  );
}
