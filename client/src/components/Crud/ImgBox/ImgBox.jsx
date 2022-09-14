import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function ImgBox({imgUrl}) {
 const [imgData,setImgData]=useState( '')
 useEffect(()=>{
 setImgData(imgUrl)
 
 },[imgUrl])
 
  return (
   <div className="addImg">
    {imgData === ('' || undefined)?(
     <>
        <label className='addImg--icon' htmlFor='addImg'><h1>+</h1></label>
     <input className='img--file' type="file" name="" id="addImg" onChange={(e)=>{
       console.log(e)
      setImgData(e.target.value)}} />
     </>
    ):<img src={imgData || ''} alt="" srcset="" style={{zIndex:1000}} />}
     
     </div>
  )
}

export default ImgBox