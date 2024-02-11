import React, { useEffect } from 'react';
import { useControls } from 'leva';

export default function GUI({ setSearchInput }) {
  const values = useControls({
    Filter: { value: 'Filter', options: ['1', '2', '3'] },
  });

  const [{ Country }, set] = useControls(() => ({
    Country: 'Country Name',
  }));

  const otherValues = useControls({
    Information: { value: 'abcdefghijklmnopqrstuv\no', editable: false },
  });

  useEffect(() => {
    setSearchInput(Country);
  }, [Country]);

  return <div></div>;
}
