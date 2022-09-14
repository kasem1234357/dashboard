import React from 'react'
import ProductInfo from '../ProductInfo'
import './add.css'
import logo from './1.png'
import ImgBox from '../ImgBox/ImgBox'
import { useLocation, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
function Add() {
  const location = useLocation()
  const data = location?.state.dataInfo
  const [newData,setNewData]=useState({})
  let {userId}=useParams()
  useEffect(()=>{
   setNewData(data)
  },[userId,location,data])
  return (
    <div className='flex addProduct'>
      
      <div className="addProduct__images flex">
        <div className="addProduct__images__box flex">
        <div className="addProduct__images__main ">
          <ImgBox imgUrl={data.profileImg}/>
         </div>
         <div className="addProduct__images__others flex">
          <div className='addProduct__images__others__box '>
            <ImgBox data={data}/>
            </div>
          <div  className='addProduct__images__others__box '>
          <ImgBox data={data}/>
            </div>
          <div  className='addProduct__images__others__box '>
         <ImgBox data={data}/>
          </div>
         </div>
        </div>
        
       </div>
       <div className="addProduct__info">
         <ProductInfo data={newData} setNewData={setNewData}/>
       </div>
       
    </div>
  )
}

export default Add