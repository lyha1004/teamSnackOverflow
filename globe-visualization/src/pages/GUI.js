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
    Information: { value: 'Text!', editable: false },
  });

  useEffect(() => {
    console.log(Country);
    setSearchInput(Country);
    set({ Country: ''});
  }, [Country]);

  return <div></div>;
}
