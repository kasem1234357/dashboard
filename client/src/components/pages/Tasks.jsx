import React from 'react'
import { TasksData } from '../Data/mainData'
import { Add, Board } from '../icons/SvgIcons'
import TaskCard from '../Tasks/TaskCard'
import './styles/tasks.css'

function Tasks() {
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
              <li>Filter</li>
              <li>Sort</li>
              
              <li className='colored--btn'>New Template</li>
            </ul>
          </div>
        </div>
        <div className="task__mainBox__Board flex">
            <div className="boardBox  ">
              <div className="boardBox__header flex">
                <h4>To do <span>(3)</span></h4>
                <div className='flex'><Add width='25px' color={'#3a445e'}/> <span>Add new task</span></div>
              </div>
              <div className="boardBox__main">
              <div className="boardBox__box flex">
                {TasksData.map(task=>{
                  const {id,tag,progress,progressColor,tagColor,tasks,...info} = task
                  
                  return(
                    <TaskCard key={id} colorProgress={progressColor} tagColor={tagColor} tag={tag} date={'30 Aug 2022'} progress={progress} tasks={tasks} {...info}/>
                  )
                })}
                
                <TaskCard colorProgress={'#7d00fa'} tagColor={'#e58415'} tag={"Work"} date={'8 Aug 2022'}/>
                <TaskCard colorProgress={'#7d00fa'} tagColor={'#e58415'} tag={"Work"}/>
                <TaskCard colorProgress={'#00d4fa'} tagColor={'#a315e5'} tag={"Sport"} date={'8 Aug 2022'}/>
                <TaskCard colorProgress={'#00fa68'} tagColor={'#d9234b'} tag={"Learn"} date={'29 sep 2022'}/>
              </div>
              <div className="dragArea">
              drag your task here
              </div>
              </div>
              
            </div>
            <div className="boardBox  ">
              <div className="boardBox__header flex">
                <h4>In progresss <span>(4)</span></h4>
                <div className='flex'><Add width='25px' color={'#3a445e'}/> <span>Add new task</span></div>
              </div>
              <div className="boardBox__main">
              <div className="boardBox__box flex">
              <TaskCard colorProgress={'#00d4fa'} tagColor={'#a315e5'} tag={"Sport"}/>
              <TaskCard colorProgress={'#00d4fa'} tagColor={'#a315e5'} tag={"Sport"}/>
              <TaskCard colorProgress={'#7d00fa'} tagColor={'#e58415'} tag={"Work"}/>
                <TaskCard colorProgress={'#00fa68'} tagColor={'#d9234b'} tag={"Learn"}/>
              </div>
              <div className="dragArea">
                drag your task here
              </div>
              </div>
              
            </div>
            <div className="boardBox  ">
              <div className="boardBox__header flex">
                <h4>Done <span>(3)</span></h4>
                <div className='flex'><Add width='25px' color={'#3a445e'}/> <span>Add new task</span></div>
              </div>
              <div className="boardBox__main">
              <div className="boardBox__box flex">
              <TaskCard colorProgress={'#00fa68'} tagColor={'#d9234b'} tag={"Learn"}/>
              <TaskCard colorProgress={'#00fa68'} tagColor={'#d9234b'} tag={"Learn"}/>
              <TaskCard colorProgress={'#00fa68'} tagColor={'#d9234b'} tag={"Learn"}/>
                
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