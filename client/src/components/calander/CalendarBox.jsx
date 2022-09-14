import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import DaysBox from './DaysBox';

function CalendarBox() {
 const days = ['San','Mon','Tus','Wed','Thu','Fri','Sat'];
 const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
 const [boxs,setBoxs] = useState([])
 const [data,setData]=useState({
   year: new Date().getFullYear(),
   month: new Date().getMonth(),
 })
 const [startDays,setStartDays]= useState(1)
 const [length,setLength]= useState(31);
 const [previosLength,setPrevios]=useState(30)
 const daysNumber=()=>{ 
   const d = []
   for(let i=0;i<35;i++){
    d.push(i)
   }
   setBoxs(d)
 }
 useEffect(()=>{
  daysNumber()
  setPrevios(numberDaysInMonth(data.year,data.month-1))
    setLength(numberDaysInMonth(data.year,data.month))
    setStartDays(dayOfTheMonth(data.year,data.month))
 },[data])
 function numberDaysInMonth(year,month){
  let numberDaysInMonth= new Date(year, month+1, 0).getDate();
  return numberDaysInMonth
 }
 function dayOfTheMonth(year,month){
  let dayOfTheMonth = new Date(year,month).getDay()+1;
  return dayOfTheMonth
 }

  return (
    <>
        <div className='days--name flex'>
     {days.map((day,index)=>(
       
         <div key={index}>{day}</div>)
     )} 
    </div>
    <div className="days--box flex ">
      {boxs?.map((box,index) =>{
          if(index+1<startDays)return ( <DaysBox className={'prev--days days'} key={index} number={previosLength-(startDays-2) + index}/>)

          if((index-startDays)+2>length)return(<DaysBox key={index} className='next--days days'  number={(index)-length}/>)
          
          return  <DaysBox  key={index} className='days' number={(index+1-startDays)+1}/>
          
      })}
     </div>
    </>
  )
}

export default CalendarBox