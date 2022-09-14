import { Tooltip } from "chart.js";

  const Labels = [
 'Jan',
 'Feb',
 'Mar',
 'Apr',
 'May',
 'Jun',
 'Jul',
 'Aug',
 'sep'
];
export const options = {
 elements:{
  point:{
   backgroundColor:'transparent',
   
  }
 },
 responsive: true,
 interaction: {
   mode: 'index',
   intersect: false,
 },
 stacked: false,
 plugins: {
   title: {
     display: true,
     text: 'Chart.js Line Chart - Multi Axis',
     color:'#7a8195'
   },
   legend:{
    labels:{
      color:"#7a8195"
    }
   }
 },
 scales: {
 x:{
   ticks:{
     color:"#7a8195"
   },
 },
  y: {
   ticks:{
    color:'#7a8195'
  },
    type: 'linear',
    display: true,
    position: 'left',
  },
  y1: {
    type: 'linear',
    display: true,
    position: 'right',
    ticks:{
     color:'#7a8195'
   },
    // grid line settings
    grid: {
      drawOnChartArea: false, // only want the grid lines for one axis to show up
    },
  },
  y2:{
   type: 'linear',
   display: false,
   position: 'left',
  }
}
}
export const data ={
 labels: Labels,
 datasets: [
   {
    tension: 0.4,
     label: 'Dataset 1',
     data: [10,50,100,50,60,70,10,40,55],
     borderColor: '#0DB8D3',
     backgroundColor: '#0DB8D3',
     yAxisID: 'y',
   },
   {
    label: 'Dataset 2',
    data: [100,20,100,20,60,70,10,30,55],
    borderColor: '#C33ECE',
    backgroundColor: '#C33ECE',
    yAxisID: 'y1',
    tension: 0.4,
  },
  {
   label: 'Dataset 3',
   data: [50,20,50,20,100,70,10,30,55],
   borderColor: '#d9234b',
   backgroundColor: '#d9234b',
   yAxisID: 'y2',
   tension: 0.4,
 },
 ]
};