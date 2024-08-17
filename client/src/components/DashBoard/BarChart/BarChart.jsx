import React, { useRef } from 'react'
import { useState } from 'react'
import 'chart.js/auto';
import { Bar} from 'react-chartjs-2';
import { useEffect } from 'react';
import {dataGenerators} from '../../Data/data'
function BarChart({data}) {
  const chartRef = useRef();
  const [part,setPart]=useState('startSemester')
  const [customRange,setCustomRange]=useState({
    start:0,
    end:5
  })

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
      data:Object.keys(data).length !==0 ?dataGenerators('totalSales',...data,part,customRange):data,
      parsing: {
                yAxisKey: 'totalSales'
             }
  },
  {
      label: 'Units',
      barThickness:16,
      borderRadius:50,
      backgroundColor :gradient(chart.ctx,'#F699D0','#FEC2A0'), // Put the gradient here as a fill color
     borderColor : "transparent",
     borderWidth: 4,
     data:Object.keys(data).length !==0 ?dataGenerators('totalUnits',...data,part,customRange):data,
     parsing: {
                yAxisKey: 'totalUnits'
             }
  },         
  {
     label: 'likes',
     barThickness:16,
     borderRadius:50,
     backgroundColor : gradient(chart.ctx,'#704FD3','#C5B4F5'), // Put the gradient here as a fill color
     borderColor : "transparent",
     borderWidth: 4,
     data:Object.keys(data).length !==0 ?dataGenerators('totalLikes',...data,part,customRange):data,
     parsing: {
                yAxisKey: 'totalLikes'
            }
  },
  {
    label: 'Subscribing',
    barThickness:16,
    borderRadius:50,
    backgroundColor : gradient(chart.ctx,'#ccff33','#ccff33'), // Put the gradient here as a fill color
    borderColor : "transparent",
    borderWidth: 4,
    data:data.length !==0 ?dataGenerators('totalSubscribing',...data,part,customRange):data,
    parsing: {
               yAxisKey: 'totalSubscribing'
           }
 },
]
      });
     }
  },[part,customRange])
  return (
    <>
    <div className='chart-controll'>
    <select name="" id="" onChange={(e)=>{
      setPart(e.target.value)
    }}>
          <option value="startSemester">
            semester 1
          </option>
          <option value="endSemester">
            semester 2
          </option>
          <option value="full">
            full year
          </option>
          <option value="custom">
            custom
          </option>
        </select>
        {part === 'custom' &&<> <label htmlFor=""> from </label><input defaultValue={1} type="number" onChange={(e)=>{
          setCustomRange(prev =>({
            ...prev,
            start:parseInt(e.target.value)-1
          }))
        }} min={1} max={12} />
        <label htmlFor=""> to </label><input type="number" defaultValue={6} min={1} max={12} onChange={(e)=>{
          setCustomRange(prev =>({
            ...prev,
            end:parseInt(e.target.value)-1
          }))
        }}/></>}
        
    </div>
        {data &&  <Bar ref={chartRef} data={chartData} options={options} />}
       
    </>
     
  )
}

export default BarChart