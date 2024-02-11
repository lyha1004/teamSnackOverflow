import '../style/lineGraph.css'
import { LineChart } from '@mui/x-charts/LineChart';

export default function LineGraph() {
  return (
    <div className='lineChartContainer'>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
          },
        ]}
        width={350}
        height={250}
      />
    </div>
  );
}
