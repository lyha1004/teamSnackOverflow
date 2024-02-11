import React from 'react';
import { useControls } from 'leva';

export default function MyComponent() {
  const values = useControls({
    select: { value: 'Filter', options: ['1', '2', '3'] },
  });

  const { Country } = useControls({ Country: 'Country Name' });

  const otherValues = useControls({
    Information: { value: 'Text!', render: (get) => <div>{get()}</div> },
  });

  return (
    <div>
      <h2>Selected Country: {Country}</h2>
      <pre>{JSON.stringify(values, null, ' ')}</pre>
      <pre>{JSON.stringify({ ...values, ...otherValues }, null, ' ')}</pre>
    </div>
  );
}
