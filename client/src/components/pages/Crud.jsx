import React from 'react'
import { products } from '../Data/mainData'
import { AddProductIcon, Sort } from '../icons/SvgIcons'
import {useNavigate} from 'react-router-dom'
import './styles/crud.css'
function Crud() {
  const navigate = useNavigate()
  return (
    <div className='Crud'>
      <div className="Crud__header">
        <h2>my products data</h2>
        <span>show your data and customize them</span>
      </div>
      <div className="crud__table">
        <div className="table__header">
        <div className="crud__table__header flex">
          <span>Products Data</span>
          <div className="crud__table__header--controls flex">
            <button>Filters</button>
            <button><Sort width={'20px'} color={'#fff'}/></button>
            <button><AddProductIcon width={'15px'} color={'#fff'} onClick={()=>navigate(`product/${products.length +1}`,{ state: { dataInfo: {},type :'new product'} })}/></button>
          </div>
        </div>
        <div className="crud__table__row crud__table__titles flex">
          <div className="products--box product--image">
            Poster
          </div>
          <div className="products--box product--Name">Title</div>
          <div className="products--box product--price">Price</div>
          <div className="products--box product--count">Count</div>
          <div className="products--box product--copon">Copon</div>
          <div className="products--box product--controls">
          Controls Btns
          </div>
          
        </div>
        </div>
        <div className="crud__rows">
          {products.map(product=>{
             const {title,profileImg,count,price,copon,id} = product
            return(
              <div className="crud__table__row  flex" key={id}
              >
        <div className="products--box product--image">
            <img src={profileImg} alt="" srcset="" />
          </div>
          <div className="products--box product--Name">{title}</div>
          <div className="products--box product--price">{price}$</div>
          <div className="products--box product--count">{count}</div>
          <div className="products--box product--copon">{copon}</div>
          <div className="products--box product--controls">
          <button onClick={()=>navigate(`product/${id}`,{ state: { dataInfo: product,type :'update'} })}>Update</button>
          <button className='delete--product--btn'>Delete</button>
          </div>
        </div>
            )
          })}
        

        </div>
        
        
      </div>
    </div>

  )
}

export default Crud