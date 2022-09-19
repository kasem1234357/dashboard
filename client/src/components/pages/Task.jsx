import axios from 'axios';
import React, { useCallback } from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import Calendar from 'react-calendar'
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import {  NavLink, useLocation} from 'react-router-dom'
import { Add, Close } from '../icons/SvgIcons';
function Task() {
  const [value, onChange] = useState('');
  const location = useLocation();
  const defaultData = {
    title:"",
    state:location?.state.state,
    tasks:[],
    progress:0,
    tag:'general',
    progressColor:'#00d4fa',
    tagColor:'#d9234b',
    remainder:false
  }
  const data = location?.state.dataInfo
  const [type,setType]=useState(location?.state.type)
  const [cacheData,setCacheData]=useState( defaultData)
  const [tasks,setTasks] = useState([])
  useEffect(()=>{
    if(data !== null){
      setCacheData(data)
      setTasks(data.tasks)
    }
  },[])
  const toggleTask =(i,state)=>{
    setCacheData(prev =>{
      state?prev.progress--:prev.progress++
      console.log(prev.progress)
      prev.tasks[i].complicated=!state;
      return  prev
    })
  }
  const addTask = useCallback(()=>{
    const updatedTasks = cacheData
    setTasks(current => [...current,{text:'',complicated:false}])
    updatedTasks.tasks = [...updatedTasks.tasks,{text:'',complicated:false}]
    setCacheData(updatedTasks)
  },[cacheData])
  const titleRef =useRef('')
  const descRef = useRef('')
  const descFunc = ()=>{
    let text = ['']
    if(descRef.current.innerText.length !==0 )
    {
      text = descRef.current.innerText.split('\n')
      setCacheData(current => ({...current,desc:text}))
    }   
    else{
      setCacheData(current => ({...current,desc:['']}))
    }

  }  
  const save = ()=>{
    try {
      console.log(Math.floor((cacheData.progress /(tasks.length) )));
      if(Math.floor((cacheData.progress /(tasks.length) )) === 1){
        setCacheData(prev => ({...prev,state:'done'}))
         }   
      if( type ==="New"){
         axios.post(`http://localhost:8800/api/tasks/`,cacheData).then(res =>{
           setCacheData(res.data)
         })
        setType('update')
      }
      else{ axios.put(`http://localhost:8800/api/tasks/update/${cacheData._id}`,cacheData)
      }
       
    } catch (error) {
       console.log(error)
    }
     
  }
useEffect(()=>{
    try {
       if(type !== 'New'){
        axios.put(`http://localhost:8800/api/tasks/update/${cacheData._id}`,cacheData).then(res =>console.log(res.data))
        
       }
    } catch (error) {
      console.log(error)
    }
  
    
},[cacheData,type,tasks])  
    
  return (
    <div className="single--Task">
      <div className="single--Task__navbar flex">
      <select name="" id="" onChange={(e)=>{
        setCacheData(prev =>{
          prev.state =e.target.value
          return prev
        })
      }}>
        <option value="To do">To do</option>
        <option value="in progress">in progress</option>
        <option value="done">done</option>
      </select>
      <div className='flex'>
      <button onClick={save}>save</button>
      <NavLink to='/tasks' className={"task--close"} > <Close  width='25px' color='#d7d7d7' /></NavLink>
      </div>

      </div>
      <input className='titleInput' suppressContentEditableWarning={true} contentEditable="true" ref={titleRef} defaultValue={cacheData.title || ''} onInput={(e)=>
      setCacheData(prev =>({...prev,title:e.target.value}))}/>
        
      <p className='descArea' contentEditable="true" suppressContentEditableWarning={true} ref={descRef} onInput={descFunc}> {cacheData.desc?.join('\n') || 'unkown'}</p>
      <div className="single--task--container ">
      <label  className='single--task--box flex add--task' onClick={addTask} >
             <Add width={'30px'} color={"#d7d7d7"}/> Add new Task
         </label>
      {tasks?.map((task,index) =>{
         return(
                <div  className='single--task--box flex' key={index} style={{borderLeft:`5px solid ${cacheData.progressColor}`}}  >
                   <input type="checkbox" id={index} value={task.text} defaultChecked={task.complicated === true?true:false } onChange={()=>toggleTask(index,task.complicated)} />
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
      <div>
      <Calendar className={'calendar-task-box'} onChange={onChange} value={value} />
      </div>
      
    </div>
  )
}

export default Task