import React from 'react'
import BarChart from '../DashBoard/BarChart/BarChart'
import CirculerChart from '../DashBoard/CirculerCharts/CirculerChart'
import { rateData } from '../Data/rateData'
import LineCharts from '../DashBoard/LineCharts/LineCharts'
import RadarChart from '../DashBoard/RaderCharts/RadarChart'
import RateBox from '../DashBoard/rateBox/RateBox'
import Table from '../DashBoard/Table/table'
function DashBoard() {
  return (
    <>
        <div className='feed'>
   <div className="feed__text">
     <h2>Hello, Kasem Alolo</h2>
     <span> this is your Dashboard</span>
   </div>
   <div className="feed__content">
     <div className="feed__content__Box1 flex wrap ">
       <div className="bar--chart1 secondary--bg flex">
         <BarChart/>
       </div>
       <div className="radear--chart1 secondary--bg flex">
         <RadarChart/>
       </div>
     </div>
     <div className="feed__content__Box2 flex wrap ">
       {rateData.map((data,index)=>(
        <RateBox {...data} key={index}/>
       ))}
       
      
     </div>
     <div className="feed__content__Box3 flex wrap">
     <div className="line--chart3 secondary--bg">
       <LineCharts/>
     </div>
     <CirculerChart color={'#df8c1f'} progress={80}/>
     </div>
    <Table/>
   </div>
 </div>
 
    </>
  
  )
}

export default DashBoard