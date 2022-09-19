import React from 'react'
import ProductInfo from '../ProductInfo'
import './add.css'
import axios from 'axios'
import ImgBox from '../ImgBox/ImgBox'
import { useLocation, } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
function Add() {
  const defaultProduct = {
    title:'',
    count:0,
    price:0,
    barCode:'',
    profileImg:'',
    otherImg:[],
    coupon:'',
    couponPersent:0,
    type:'',
    tags:[],
    desc:'',
    colors:[]
  }
  const location = useLocation()
  const data =location?.state.dataInfo 
  const [type,setType]= useState(location?.state.type)
  console.log(type)
  const [newData,setNewData]=useState(defaultProduct)
  useEffect(()=>{
      if(data !== null){
        setNewData(data)
      }
  },[])
  const save =(e)=>{
    e.preventDefault()
    try {
       if(type === 'New'){
       axios.post('http://localhost:8800/api/products/',newData).then((res)=>{
         setNewData(data =>({...data,...res.data}))
        setType('update')
        
       })
       return
      }
      axios.put(`http://localhost:8800/api/products/update/${newData._id}`,newData).then((res)=>{
         setNewData(data =>({...data,...res.data}))})
    } catch (error) {
       console.log(error)
    }
  }
  return (
    <div className='flex addProduct'>
      
      <div className="addProduct__images flex">
        <div className="addProduct__images__box flex">
        <div className="addProduct__images__main ">
          <ImgBox imgUrl={newData?.profileImg}/>
         </div>
         <div className="addProduct__images__others flex">
          <div className='addProduct__images__others__box '>
            <ImgBox imgUrl={newData?.profileImg}/>
            </div>
          <div  className='addProduct__images__others__box '>
          <ImgBox imgUrl={newData?.profileImg}/>
            </div>
          <div  className='addProduct__images__others__box '>
         <ImgBox imgUrl={newData?.profileImg}/>
          </div>
         </div>
        </div>
        
       </div>
       <div className="addProduct__info">
         <ProductInfo data={newData} setNewData={setNewData} save={save}/>
       </div>
       
    </div>
  )
}

export default Add