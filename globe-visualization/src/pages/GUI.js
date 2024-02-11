import React, { useEffect } from 'react';
import { useControls } from 'leva';

export default function GUI({ setSearchInput, setFilter }) {
  const values = useControls({
    Filter: {
      value: 'CO2 from Operations',
      options: [
        'CO2 from Operations',
        'CO2 from Imported Electricity',
        'Methane (CO2e)',
        'Nitrous Oxide (CO2e)',
        'Total Greenhouse Gases',
        'Total Greenhouse Gas Intensity (kg CO2e/BOE)',
        'Combustion Energy',
        'Imported Electricity',
        'Total Energy',
        'Fresh Water Withdrawn (MCM)',
        'Non-Fresh Water Withdrawn (MCM)',
        'Produced Water Recycle/Reuse (MCM)',
        'Hydrocarbons in Overboard Discharges (tonnes)'
      ],
    },
  });

  const [{ Country }, set] = useControls(() => ({
    Country: 'Country Name',
  }));

  useEffect(() => {
    setFilter(values['Filter']);
  }, [values['Filter']]);

  useEffect(() => {
    setSearchInput(Country);
  }, [Country]);

  return <div></div>;
}
