import React from 'react'
import { AddProductIcon, Sort } from '../icons/SvgIcons'
import {useNavigate} from 'react-router-dom'
import './styles/crud.css'
import FilterBox from '../utils/FilterBox'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
function Crud() {
  const [productsData,setProductsData]=useState([])
  const [filterProducts,setFilterProducts]=useState([])
  const [showModel,setShowModel] = useState(false)
  const filter =(method,filterText)=>{
    const data = productsData.filter(task => task[method].includes(filterText))
    setFilterProducts(data)
  }
  useEffect(()=>{
    setFilterProducts(productsData)
 },[productsData])
 useEffect(()=>{
    try {
      axios.get('http://localhost:8800/api/products/').then(res =>{
        setProductsData(res.data)
      })
    } catch (error) {
      console.log(error);
    }
 },[])
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
            <button>{showModel && <FilterBox filter={filter} methods={['title',' tags']}/>}<span onClick={()=> setShowModel(!showModel)}>Filters</span></button>
            <button><Sort width={'20px'} color={'#fff'}/></button>
            <button><AddProductIcon width={'15px'} color={'#fff'} onClick={()=>navigate(`product/${productsData.length +1}`,{ state: { dataInfo: null,type :'New'} })}/></button>
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
          {filterProducts?.map(product=>{
             const {title,profileImg,count,price,coupon,_id} = product
            return(
              <div className="crud__table__row  flex" key={_id}
              >
        <div className="products--box product--image">
            <img src={profileImg} alt="" srcset="" />
          </div>
          <div className="products--box product--Name">{title}</div>
          <div className="products--box product--price">{price}$</div>
          <div className="products--box product--count">{count}</div>
          <div className="products--box product--copon">{coupon }</div>
          <div className="products--box product--controls">
          <button onClick={()=>navigate(`product/${_id}`,{ state: { dataInfo: product,type :'update'} })}>Update</button>
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