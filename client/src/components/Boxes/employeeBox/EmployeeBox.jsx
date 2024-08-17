import React from 'react'

function EmployeeBox({data}) {
  return (
    <div className='settings__content__others--row flex empeloyee'>
      <div className='flex center'>
      <div className="employeeBox-imgBox">
        <img src={`./images/${data.profileImg}`} alt="" />
       </div>
       <div className="employeeBox-infoBox">
        <h4>{data.name}</h4>
        <span>{data.role}</span>
       </div>
      </div>
      
       <div className="employeeBox-controllBox">
       <button>{data.isAdmin?'admin':'user'}</button>
        <button className='remove-btn'>remove</button>
        
       </div>
    </div>
  )
}

export default EmployeeBox
