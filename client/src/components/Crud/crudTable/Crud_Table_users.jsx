import React from 'react'

const Crud_Table_users = ({data}) => {
  return (
   <div className="crud__table__row  flex" 
   >
<div className="products--box product--image">
 <img src={data.url} alt="" srcset="" />
</div>
<div className="products--box product--Name">user1</div>
<div className="products--box product--price">20,000$</div>
<div className="products--box product--count">20</div>
<div className="products--box product--copon">2 </div>
<div className="products--box product--controls">
<button >contact</button>
</div>
</div>
  )
}

export default Crud_Table_users