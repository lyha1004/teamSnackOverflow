import React, { useEffect } from 'react';
import { useControls } from 'leva';

export default function GUI({ setSearchInput, setFilter }) {
  const values = useControls({
    Filter: { value: '1', options: ['1', '2', '3'] },
  });

  const [{ Country }, set] = useControls(() => ({
    Country: 'Country Name',
  }));

  useEffect(() => {
    setFilter(values['Filter']);
    console.log(values['Filter']);
  }, values['Filter']);

  useEffect(() => {
    setSearchInput(Country);
  }, [Country]);

  return <div></div>;
}
