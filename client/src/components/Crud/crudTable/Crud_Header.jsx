import React from 'react'

const Crud_Header = ({titles}) => {
  return (
   <div className="crud__table__row crud__table__titles flex">
   <div className="products--box product--image">
     {titles[0]}
   </div>
   {titles.slice(1,titles.length).map(title =>{
    return(
     <div className="products--box ">{title}</div>
    )
   })} 
   {/* <div className="products--box product--price">Price</div>
   <div className="products--box product--count">Count</div>
   <div className="products--box product--copon">Copon</div>
   <div className="products--box product--controls">
   Controls Btns
   </div> */}
   
 </div>
  )
}

export default Crud_Header