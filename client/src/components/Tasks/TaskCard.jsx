import React from 'react'
import {useNavigate} from 'react-router-dom'
import { data } from '../Data/data'
function TaskCard(props) {
  const {colorProgress,tagColor,tag ,date,progress,tasks,title,...otherProps} = props
  const navigate = useNavigate()
  
  return (
    <div className='TaskCard' onClick={()=>navigate('task/1',{ state: { dataInfo:props} })}>
      <div className="TaskCard__header flex">
        <div className="TaskCard__header__title">
          <h4>softwere development</h4>
          <span>design pattren</span>
        </div>
      </div>
      <div className="TaskCard__progress">
         <div className='TaskCard__progress__text flex'>
           <span> Progress</span>
           <span> 7/10</span>
         </div>
         <div className="TaskCard__progress__progressArea">
             <div className="TaskCard__progress__progressBar" style={{background:`${colorProgress}`,width:`${Math.floor((progress /(tasks?.length ) )*100)}%`}}></div>
         </div> 
      </div>
      <div className="TaskCard__footer flex">
        <div className="TaskCard__footer__date">{date ||"22 May 2022"}</div>
        <div className="TaskCard__footer__tag" style={{background:`${tagColor}`}}> <span> {tag}</span></div>
      </div>
    </div>
  )
}

export default TaskCard