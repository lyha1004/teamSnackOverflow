import '../style/lineGraph.css';
import { LineChart } from '@mui/x-charts/LineChart';
import YearlyData from '../data/conocoDataYearly.json';
import { useEffect } from 'react';

export default function LineGraph({ filter }) {
  let ind = '1';
  for (const key in YearlyData['Titles']) {
    if (YearlyData['Titles'][key] === filter) {
      ind = key;
    }
  }

  let xVals = Object.keys(YearlyData);
  xVals.pop();
  xVals = xVals.map((year) => new Date(year));

  let yVals = Object.values(YearlyData)
    .flatMap((obj) => Object.entries(obj))
    .filter(([key, value]) => key === ind)
    .map(([key, value]) => value);
  yVals.pop();
  console.log(xVals);

  const textElements = document.querySelectorAll('tspan');

  useEffect(() => {
    textElements.forEach((element) => {
      element.style.fill = '#8c92a3';
    });
  }, [yVals]);

  return (
    <div className='lineChartContainer'>
      <LineChart
        xAxis={[
          {
            data: [...xVals],
            scaleType: 'time',
          },
        ]}
        series={[
          {
            data: [...yVals],
            label: filter,
          },
        ]}
        width={350}
        height={250}
      />
    </div>
  );
}
