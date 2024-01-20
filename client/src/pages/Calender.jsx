import React, { Suspense } from 'react'
import { useState } from 'react';
import CalendarBox from '../components/Boxes/calenderBox/CalendarBox'
import '../styles/calendar.css'
function Calender() {
  const [data,setData] =useState({
    year:new Date().getFullYear(),
    month:new Date().getMonth()
  })
  const months = ["January ", "February", "March", "April", "May", "June", "July", "August", "September ", "October", "November", "December"];
  return (
    <Suspense fallback={<div className="loading_auth"> <span className="loader_auth"></span> </div>}>
    <div className='calendar flex'>
      <div className="calendar__navbar flex">
        <h1>Calendar</h1>
        <h2>{new Date().getFullYear()}</h2>
        <select onChange={(e)=>setData({...data,month:parseInt(e.target.value)})}  defaultValue={new Date().getMonth()} name="" id="">
          {months.map((month,index)=>(
            <option value={index}>{month}</option>
          ))}
        </select>
      </div>
      <div className="calendar__box secondary--bg flex">
        <CalendarBox year={data.year} month={data.month}/>
      </div>
    </div>
    </Suspense>
  )
}

export default Calender