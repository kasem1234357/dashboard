import React, { useState } from 'react'
import { useEffect } from 'react'
import { Close } from '../../icons/SvgIcons';
import ImgBox from '../ImgBox/ImgBox'

function ColorBox({data,updateColorData,count,updateData,close}) {
  const [colorData,setColorData]=useState({})
  const [color,setColor]= useState(data.hex );
  const [colorSize,setColorSize]=useState([]);
useEffect(()=>{
  setColorData(data)
  console.log(data)
  setColorSize(data.size)
},[data])
 const saveDetails = ()=>{
  updateColorData(colorData,data.id)
 }
 const updateCount = (type)=>{
   if(type === 'i'){
    setColorData(prev =>{
      return {...prev,totalCount:prev.totalCount +1}
    })
    updateData('count',count+1)}
   if(type === 'd'){
    setColorData(prev =>{
      return {...prev,totalCount:prev.totalCount -1}
    })
    updateData('count',count-1)}
 }
  return (
    <div className='colorBox'>
      <Close fill={'#d7d7d7'} width={'20px'} className='close--svg--btn' onClick={()=>close(false)}/>
      <div className="colorBox__images flex">
          <div className='colorBox__images__box flex '>
            <h3>Front</h3>
            <ImgBox imgUrl={data.frontImg} name="frontImg" updateFn = {setColorData}/>
            </div>
          <div  className='colorBox__images__box flex'>
            <h3>Back</h3>
          <ImgBox imgUrl={data.backImg} name="backImg"  updateFn = {setColorData}/>
            </div>
         </div>
         <div className="colorBox__controlls flex">
            <div className="colorBox__controlls__box flex">
              <div className="colorBox__controlls__items flex">
              <label htmlFor="">hex</label>
              <input type="text" defaultValue={data.hex || ''} onChange={(e)=>{
                setColorData(prev =>{
                  return {...prev,hex:e.target.value}
                })
                setColor(e.target.value)}} />
              <span className='color--circle' style={{background:color}}></span>
              </div>
              <div className="colorBox__controlls__items flex">
              <label htmlFor="">title</label>
              <input type="text" />
              </div>
            </div>
            <h3>Size</h3>
            <div className="colorBox__controlls__box flex">
            {colorSize.map((size,index)=>{

              return(
                <div key={index} className="colorBox__controlls__items flex">
            <p htmlFor="">{size.name}</p>
               
              <div className='counter flex'>
                <span onClick={()=>{
                   let newSizes = colorSize
                   newSizes[index].count++;
                   setColorSize(newSizes) 
                  updateCount('i')}}>+</span>
              {size.count}
              <span onClick={()=>{
                  let newSizes = colorSize
                  newSizes[index].count--;
                  setColorSize(newSizes) 
                updateCount('d')}}>-</span>
              </div>
              
            </div>
              )
            })}
            </div>
            <div className="colorBox__controlls__box flex">
              <div className="colorBox--count ">
                <strong>total count: <span>{colorData.totalCount}</span></strong>
              </div>
            <button className="controlls--save" onClick={()=>{
              saveDetails()
              close(false)
            }}>
              <p>save</p>
            </button>
            </div>
         </div>
         
    </div>
  )
}

export default ColorBox