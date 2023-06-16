import React from 'react'

const Crud_Table_products = ({data}) => {
  return (
   <div className="crud__table__row  flex" 
   >
<div className="products--box product--image">
 <img src="https://source.unsplash.com/random/200x200?amazon" alt="" srcset="" />
</div>
<div className="products--box product--Name">title</div>
<div className="products--box product--price">price$</div>
<div className="products--box product--count">count</div>
<div className="products--box product--copon">barCode </div>
<div className="products--box product--copon">coupon </div>
<div className="products--box product--controls">
<button >Update</button>
<button className='delete--product--btn'>Delete</button>
</div>
</div>
  )
}

export default Crud_Table_products