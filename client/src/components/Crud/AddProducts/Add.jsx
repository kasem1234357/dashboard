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
    otherImg:[{id:0,url:""},{id:1,url:""},{id:2,url:""}],
    coupon:'',
    couponPersent:0,
    type:'',
    tags:[],
    desc:'',
    colors:[],
  }
  const location = useLocation()
  const data =location?.state.dataInfo 
  const [type,setType]= useState(location?.state.type)
  console.log(type)
  const [newData,setNewData]=useState(defaultProduct)
  const [images,setImages]=useState([])
  useEffect(()=>{
      if(data !== null){
        setNewData(data)
        console.log(data);
      }
  },[])
  const uploadImg = (index,count)=>{
    console.log(index);
    console.log(count);
     if(count === 0){
      console.log(newData);
      console.log("image uploaded")
      uploadDetails();
      return 0;
     }

     try {
      console.log(images);
      axios.post('http://localhost:8800/api/products/images',images[index]).then(res =>{
          setNewData(prev =>{
            if(res.data.type === "otherImg") {
              // console.log(prev[res.data.type][(res.data.index) -1]);
              prev[res.data.type][(res.data.index) -1].url =res.data.url.secure_url
            }
            if(res.data.type === "profileImg"){prev[res.data.type].url =res.data.url.secure_url}
            // console.log(prev);
            return prev
          }) 
          
          console.log(`image ${index} uploaded`)
          // console.log(res.data
          //   );
            index++
            count--
            // console.log(count);
             uploadImg(index++,count--); 
      })
      
     } catch (error) {
        console.log("tttt")
     }
    
  }
  const uploadDetails =()=>{
     try {
       if(type === 'New'){
        console.log(newData);
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
  const save =(e)=>{
    e.preventDefault()
    console.log(images);
    uploadImg(0,images.length) 
  }
  return (
    <div className='flex addProduct'>
      
      <div className="addProduct__images flex">
        <div className="addProduct__images__box flex">
        <div className="addProduct__images__main ">
          <ImgBox imgUrl={images[0]?.url || newData.profileImg || ''} updateFn ={setImages} name={"profileImg-0"}/>
         </div>
         <div className="addProduct__images__others flex">
          <div className='addProduct__images__others__box '>
            <ImgBox imgUrl={images[1]?.url||  newData.otherImg[0]?.url || ""} updateFn ={setImages} name={"otherImg-1"} />
            </div>
          <div  className='addProduct__images__others__box '>
          <ImgBox imgUrl={images[2]?.url ||newData.otherImg[1]?.url || ""} updateFn ={setImages} name={"otherImg-2"} />
            </div>
          <div  className='addProduct__images__others__box '>
         <ImgBox imgUrl={images[3]?.url || newData.otherImg[2]?.url || ""} updateFn ={setImages} name={"otherImg-3"} />
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