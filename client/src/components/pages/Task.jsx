import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { Link, Navigate, NavLink, useLocation, useParams } from 'react-router-dom'
import { Add, Close } from '../icons/SvgIcons';
function Task() {
  const location = useLocation();
  const data = location?.state.dataInfo
  const [cacheData,setCacheData]=useState(data)
  const inputRef = useRef('')
  const toggleTask =(i,state)=>{
    setCacheData(prev =>{
      prev.tasks[i].complicated=!state;
      return  prev
    })
    console.log(cacheData)
  }
  return (
    <div className="single--Task">
      <NavLink to='/tasks' className={"task--close"} > <Close  width='25px' color='#d7d7d7' /></NavLink>
      
      <h1>{cacheData.title}</h1>
      <p>{cacheData.desc}</p>
      <div className="single--task--container ">
      <label  className='single--task--box flex add--task'  >
             <Add width={'30px'} color={"#d7d7d7"}/> Add new Task
         </label>
      {cacheData?.tasks?.map((task,index) =>{
         return(<div  className='single--task--box flex' key={index} style={{borderLeft:`5px solid ${cacheData.colorProgress}`}} >
           
           <input type="checkbox"   ref={inputRef}   id={index} value={task.text} defaultChecked={task.complicated === true?true:false } onChange={()=>toggleTask(index,task.complicated)} />
           <label htmlFor={index}>
             <i></i>
           </label>
            
            <input defaultValue={task.text} type={'text'} onChange={(e)=>setCacheData(prev =>{
      prev.tasks[index].text=e.target.value;
      return prev
    })} />
            
            <div className="addLine"></div>
            
         </div>)
      })}
      
      </div>

    </div>
  )
}

export default Task