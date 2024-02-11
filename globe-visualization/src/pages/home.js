import React, { useEffect, useRef, useState } from 'react';
import BlueMarble from '../resources/globeImg.jpg';
import Globe from 'react-globe.gl';
import CountriesMap from '../data/worldmap.geojson';
import CountryCoords from '../data/countryCoords.js';
import ConocoData from '../data/conocoData.json';

export default function Home({
  searchInput,
  setSelectedCountry,
  setCountryDescription,
}) {
  const globeRef = useRef();
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

  useEffect(() => {
    panToCountry(searchInput);

    searchInput = searchInput.toLowerCase();
    let CountryName = '';
    const acronymUsed = CountryCoords.find(
      (loc) =>
        loc.name.toLowerCase() === searchInput ||
        loc.country.toLowerCase() === searchInput
    );
    if (acronymUsed) CountryName = acronymUsed.name;
    let foundCountry = CountryName;
    CountryName = Object.keys(ConocoData).find((key) =>
      key.toLowerCase().includes(CountryName.toLowerCase())
    );
    if(!CountryName && foundCountry) CountryName = foundCountry;
    if (!CountryName || CountryName == 'Titles') {return};

    setSelectedCountry(CountryName);
    if (!ConocoData[CountryName]) {
      setCountryDescription('ConocoPhilips has no recorded activity here.');
      return;
    }
    const labels = Object.values(ConocoData['Titles']);
    const vals = Object.values(ConocoData[CountryName]);
    const description = labels
      .map((label, index) => `${label}: ${vals[index]}`)
      .join(' \n');
    setCountryDescription(description);
  }, [searchInput]);

  const panToCountry = (country) => {
    country = country.toLowerCase();
    const location = CountryCoords.find(
      (loc) =>
        loc.name.toLowerCase() === country ||
        loc.country.toLowerCase() === country
    );
    if (!location) return;

    globeRef.current.pointOfView(
      { lat: location.latitude, lng: location.longitude, altitude: 2 },
      500
    );
  };

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
      ref={globeRef}
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
