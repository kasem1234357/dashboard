import React from 'react'
import {useNavigate} from 'react-router-dom'
function TaskCard(props) {
  const {progressColor,tagColor,tag ,date,desc,progress,tasks,title,number,...otherProps} = props
  console.log(progress,tasks.length,Math.floor((progress /(tasks?.length ) )*100))
  const navigate = useNavigate()
  
  return (
    <div className='TaskCard' onClick={()=>navigate(`task/${number}`,{ state: { dataInfo:props} })}>
      <div className="TaskCard__header flex">
        <div className="TaskCard__header__title">
          <h4>{title}</h4>
          <span>{desc[0].substring(0,30)}</span>
        </div>
      </div>
      <div className="TaskCard__progress">
         <div className='TaskCard__progress__text flex'>
           <span> Progress</span>
           <span> 7/10</span>
         </div>
         <div className="TaskCard__progress__progressArea">
             <div className="TaskCard__progress__progressBar" style={{background:`${progressColor}`,width:`${Math.floor((progress /(tasks?.length ) )*100)}%`}}></div>
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