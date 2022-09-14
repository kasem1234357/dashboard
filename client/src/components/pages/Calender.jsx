import React from 'react'
import CalendarBox from '../calander/CalendarBox'
import './styles/calendar.css'
function Calender() {
  return (
    <div className='calendar flex'>
      <div className="calendar__navbar flex">
        <h1>Calendar</h1>
        
      </div>
      <div className="calendar__box secondary--bg flex">
        <CalendarBox/>
      </div>
    </div>
  )
}

export default Calender