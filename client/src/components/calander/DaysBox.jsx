import React from 'react'

function DaysBox(props) {
 const {number,data,...otherprops} = props
  
  return (
    <div  {...otherprops}>
    {number}
    {data?<div className="reminder--color">
     <div className="triangle"></div>
    </div>:""}
    
    </div>
  )
}

export default DaysBox