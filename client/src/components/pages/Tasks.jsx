import React from 'react'
import { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { TasksData } from '../Data/mainData'
import { Add, Board } from '../icons/SvgIcons'
import TaskCard from '../Tasks/TaskCard'
import './styles/tasks.css'
import { useFetsh } from '../hooks/useFetsh'
import { useEffect } from 'react'
import FilterBox from '../utils/FilterBox'
import SortBox from '../utils/SortBox'


function Tasks() {
  const navigate = useNavigate()
  const [tasksData,setTasks] = useState([])
  const [filterData,setFilterData]=useState([])
  const [filterModel,setFilterModel]=useState(false)
  const [sortModel,setSortModel]=useState(false)
    const filter =(method,filterText)=>{
      const data = tasksData.filter(task => task[method].includes(filterText))
      setFilterData(data)
    }
  const {isLoading,error} = useFetsh('get','api/tasks',setTasks);
  useEffect(()=>{
     setFilterData(tasksData)
  },[tasksData])
  if (isLoading) return <h1>Loading ....</h1>
  if (error) return <h2>some thing wrong</h2>
  return (
    <div className='Task'>
      <div className="task__navbar flex">
        <h3> welcome Back 🖐</h3>
        <div className="task__navbar__content">
          <span>23 May 2022</span>
        </div>
      </div>
      <div className="task__mainBox">
        <div className="task__mainBox__controls flex">
          <div className="view--controls primary--dark--text">
            <ul>
              <li className='active'> <Board width='25px'/> Board View</li>
              <li > <Add width='25px'  /> <span>Add view</span></li>
            </ul>
          </div>
          <div className="view--settings primary--dark--text">
            <ul>
              
              <li > 
                {filterModel && <FilterBox filter={filter} methods={['title','tag']}/>}
              
              <span onClick={()=>{
                setSortModel(false)
                setFilterModel(!filterModel)
              }}>Filter</span> 
              </li>
              <li onClick={()=>{
                setFilterModel(false)
                setSortModel(!sortModel)
              }}>
                {sortModel && <SortBox/>}
                Sort</li>
              
              <li className='colored--btn'>New Template</li>
            </ul>
          </div>
        </div>
        <div className="task__mainBox__Board flex">
            <div className="boardBox  ">
              <div className="boardBox__header flex">
                <h4>To do <span>(3)</span></h4>
                <div className='flex' onClick={()=>navigate(`task/${tasksData.length +1}`,{ state: { dataInfo:null, type:"New",state:'To do'} })}><Add width='25px' color={'#3a445e'}/> <span>Add new task</span></div>
              </div>
              <div className="boardBox__main">
              <div className="boardBox__box flex">
                {filterData?.map((task,index)=>{
                  if (task.state === 'To do'){
                    const {id,tag,progress,progressColor,tagColor,tasks,...info} = task
                  
                    return(
                      <TaskCard key={id} progressColor={progressColor} tagColor={tagColor} tag={tag} date={'30 Aug 2022'} progress={progress} tasks={tasks} {...info} taskId={id} number={index +1}/>
                    )
                  }
                  return null
                })}
                
              </div>
              <div className="dragArea">
              drag your task here
              </div>
              </div>
              
            </div>
            <div className="boardBox  ">
              <div className="boardBox__header flex">
                <h4>In progresss <span>(4)</span></h4>
                <div className='flex'  onClick={()=>navigate(`task/${tasksData.length +1}`,{ state: { dataInfo:null, type:"New",state:'in progress'} })}><Add width='25px' color={'#3a445e'}/> <span>Add new task</span></div>
              </div>
              <div className="boardBox__main">
              <div className="boardBox__box flex">
              {filterData?.map((task,index)=>{
                  if (task.state === 'in progress'){
                    const {id,tag,progress,progressColor,tagColor,tasks,...info} = task
                  
                    return(
                      <TaskCard key={id} progressColor={progressColor} tagColor={tagColor} tag={tag} date={'30 Aug 2022'} progress={progress} tasks={tasks} {...info} taskId={id} number={index + 1} />
                    )
                  }
                  return null
                })}
              </div>
              <div className="dragArea">
                drag your task here
              </div>
              </div>
              
            </div>
            <div className="boardBox  ">
              <div className="boardBox__header flex">
                <h4>Done <span>(3)</span></h4>
                <div className='flex'  onClick={()=>navigate(`task/${tasksData.length +1}`,{ state: { dataInfo:null, type:"New",state:'done'} })}><Add width='25px' color={'#3a445e'}/> <span>Add new task</span></div>
              </div>
              <div className="boardBox__main">
              <div className="boardBox__box flex">
              {filterData?.map((task,index)=>{
                  if (task.state === 'done'){
                    const {id,tag,progress,progressColor,tagColor,tasks,...info} = task
                  
                    return(
                      <TaskCard key={id} progressColor={progressColor} tagColor={tagColor} tag={tag} date={'30 Aug 2022'} progress={progress} tasks={tasks} {...info} taskId={id} number={index + 1}  />
                    )
                  }
                 return null
                })}
              </div>
              <div className="dragArea">
              drag your task here
              </div>
              </div>
              
            </div>
        </div>
      </div>
    </div>
  )
}

export default Tasks