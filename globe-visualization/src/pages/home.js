import React, { useEffect, useRef, useState } from 'react';
import BlueMarble from '../resources/globeImg.jpg';
import Globe from 'react-globe.gl';
import CountriesMap from '../data/worldmap.geojson';
import ConocoData from '../data/conocoData.json';

export default function Home() {
  const [countries, setCountries] = useState();
  const [hoveredPolygons, setHoveredPolygons] = useState([]);

  const getConocoCountries = (data) => {
    let parsedData = Object.keys(data);
    parsedData.shift();
    parsedData.pop();

    for (let i = 0; i < parsedData.length; i++) {
      if (parsedData[i].includes('/')) {
        const countries = parsedData[i].split('/');
        parsedData.splice(i, 1, ...countries);
        i++;
      }
    }
    console.log(parsedData);
    return parsedData;
  };

  let conocoCountries = getConocoCountries(ConocoData);

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

  const labelEffect = (country) => {
    const name = country.properties.NAME;
    if (ConocoData[name])
      return (
        ConocoData['Titles'][1] + ': ' + ConocoData[country.properties.NAME][1]
      );
    else {
      const matchingKey = Object.keys(ConocoData).find((key) =>
        key.includes(name)
      );
      return matchingKey
        ? ConocoData['Titles'][1] + ': ' + ConocoData[matchingKey][1]
        : undefined;
    }
  };

  return countries ? (
    <Globe
      globeImageUrl={BlueMarble}
      backgroundImageUrl='//unpkg.com/three-globe/example/img/night-sky.png'
      lineHoverPrecision={0}
      polygonsData={countries.features.filter((d) =>
        conocoCountries.includes(d.properties.NAME)
      )}
      polygonAltitude={(d) => (hoveredPolygons.includes(d) ? 0.09 : 0.03)}
      polygonCapColor={() => 'rgba(0, 100, 0, 0.65)'}
      polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
      polygonStrokeColor={() => '#111'}
      polygonLabel={labelEffect}
      onPolygonHover={hoverEffect}
      polygonsTransitionDuration={200}
    />
  ) : (
    <div>Loading data...</div>
  );
}
