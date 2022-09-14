import React, { useRef } from 'react'
import { useState } from 'react'
import 'chart.js/auto';
import { Bar} from 'react-chartjs-2';
import { useEffect } from 'react';
import { data } from '../../Data/data';
function BarChart() {
  const chartRef = useRef();
  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales:{
      y:{
        ticks:{
          color:'#7a8195'
        }
      },
      x:{
        ticks:{
          color:"#7a8195"
        }
      }
    },
    plugins:{
      legend:{
        labels:{
          color:"#7a8195"
        }
       }
    }
  }
  const [chartData, setChartData] = useState({
    datasets: [],
  });
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
   ]
   const gradient = (ctx,color1,color2)=>{
    let gradients = ctx.createLinearGradient(0, 0, 0, 400);
    gradients.addColorStop(0, color2);   
    gradients.addColorStop(1, color1);
    return gradients
   }
  useEffect(()=>{
    const chart = chartRef.current;
     if (chart) {
      setChartData({
        datasets: [
  {
      
      label: 'sales',
      barThickness:16,
      borderRadius:50,
      backgroundColor : gradient(chart.ctx,"#00D5FF",'#01F0D1'), 
      borderColor: "transparent",
      borderWidth: 4,
      data: data('mg',Labels),
      parsing: {
                yAxisKey: 'mg'
             }
  },
  {
      label: 'subscribing',
      barThickness:16,
      borderRadius:50,
      backgroundColor :gradient(chart.ctx,'#F699D0','#FEC2A0'), // Put the gradient here as a fill color
     borderColor : "transparent",
     borderWidth: 4,
     data:data('cogs',Labels),
     parsing: {
                yAxisKey: 'cogs'
             }
  },         
  {
     label: 'likes',
     barThickness:16,
     borderRadius:50,
     backgroundColor : gradient(chart.ctx,'#704FD3','#C5B4F5'), // Put the gradient here as a fill color
     borderColor : "transparent",
     borderWidth: 4,
     data:data('net',Labels),
     parsing: {
                yAxisKey: 'net'
            }
  },
]
      });
     }
  },[])
  return (
     <Bar ref={chartRef} data={chartData} options={options} />
  )
}

export default BarChart