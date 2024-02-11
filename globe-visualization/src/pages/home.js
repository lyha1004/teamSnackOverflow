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
  filter,
}) {
  const globeRef = useRef();
  const [countries, setCountries] = useState();
  const [hoveredPolygons, setHoveredPolygons] = useState([]);
  const [colorMapping, setColorMapping] = useState({});

  const ConocoFilters = {};
  Object.keys(ConocoData['Titles']).forEach((key) => {
    ConocoFilters[ConocoData['Titles'][key]] = key;
  });

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
    processColors();
  }, []);

  useEffect(() => {
    panToCountry(searchInput);

    const CountryName = getSelected(searchInput);
    setSelectedCountry(CountryName);
    getDescription(CountryName);
  }, [searchInput]);

  useEffect(() => {
    processColors();
  }, [filter]);

  const getSelected = (searchInput) => {
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
    if (!CountryName && foundCountry) CountryName = foundCountry;
    if (!CountryName || CountryName === 'Titles') {
      return '';
    }
    return CountryName;
  };

  const getDescription = (country) => {
    if (!ConocoData[country]) {
      setCountryDescription('ConocoPhilips has no recorded activity here.');
      return;
    }
    const labels = Object.values(ConocoData['Titles']);
    const vals = Object.values(ConocoData[country]);
    const description = labels
      .map(
        (label, index) =>
          `${label}${vals[index] != null ? ': ' + vals[index] : ''}`
      )
      .join(' \n');
    setCountryDescription(description);
  };

  const processColors = () => {
    let vals = Object.fromEntries(
      Object.entries(ConocoData).map(([country, data]) => [
        country,
        data[ConocoFilters[filter]],
      ])
    );
    delete vals['Titles'];
    if (!vals) return;

    const minValue = Math.min(...Object.values(vals));
    const maxValue = Math.max(...Object.values(vals));

    const colors = Object.entries(vals).map(([country, val]) => {
      const normalizedValue = (val - minValue) / (maxValue - minValue);

      const green = Math.round((1 - normalizedValue) * 128);
      const red = Math.round(normalizedValue * 255);
      const blue = 0;
      const alpha = 0.6;

      return { [country]: `rgba(${red}, ${green}, ${blue}, ${alpha})` };
    });
    setColorMapping(colors);
  };

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
    if (ConocoData[name]) {
      return (
        filter +
        ': ' +
        ConocoData[country.properties.NAME][ConocoFilters[filter]]
      );
    } else {
      const matchingKey = Object.keys(ConocoData).find((key) =>
        key.includes(name)
      );
      return matchingKey
        ? filter + ': ' + ConocoData[matchingKey][ConocoFilters[filter]]
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
      polygonCapColor={(feat) => {
        for (const pair of colorMapping) {
          for (const prop in pair) {
            if (prop.includes(feat.properties.NAME)) return pair[prop];
          }
        }
      }}
      polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
      polygonStrokeColor={() => '#111'}
      polygonLabel={labelEffect}
      onPolygonHover={hoverEffect}
      onPolygonClick={(polygon) => {
        const countryName = getSelected(polygon.properties.NAME);
        panToCountry(polygon.properties.NAME);
        setSelectedCountry(countryName);
        getDescription(countryName);
      }}
      polygonsTransitionDuration={200}
    />
  ) : (
    <div>Loading data...</div>
  );
}
