import React from 'react'

const Crud_Table_sales = ({data}) => {
  return (
   <div className="crud__table__row  flex" 
   >
<div className="products--box product--image">
 <img src="https://source.unsplash.com/random/200x200?product" alt="" srcset="" />
</div>
<div className="products--box product--Name">user1</div>
<div className="products--box product--price">product</div>
<div className="products--box product--count">amount</div>
<div className="products--box product--copon">2000$ </div>
<div className="products--box product--controls">
<div className="state-successed">success</div>
</div>
</div>
  )
}

export default Crud_Table_sales