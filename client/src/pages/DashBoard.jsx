import React, { Suspense } from 'react'
import BarChart from '../components/DashBoard/BarChart/BarChart'
import CirculerChart from '../components/DashBoard/CirculerCharts/CirculerChart'
import { rateData } from '../components/Data/rateData'
import LineCharts from '../components/DashBoard/LineCharts/LineCharts'
import RadarChart from '../components/DashBoard/RaderCharts/RadarChart'
import RateBox from '../components/Boxes/rateBox/RateBox'
import Table from '../components/DashBoard/Table/table'
function DashBoard() {
  return (
    <>
    <Suspense fallback={<div className="loading_auth"> <span className="loader_auth"></span> </div>}>
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
 </Suspense>
    </>
  
  )
}

export default DashBoard