import React from 'react'

function DaysBox(props) {
 const {number,data,active,className,...otherprops} = props
  
  return (
    <div className={`${className} ${active && 'active-reminder'} `}  {...otherprops}>
      <span className={`${active && 'active-reminder-day'} `}>{number}</span>
    
    {data?<div className="reminder--color ">
     <div className="triangle"></div>
    </div>:""}
    
    </div>
  )
}

export default DaysBox