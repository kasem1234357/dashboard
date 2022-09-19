import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function ImgBox({imgUrl}) {
 const [imgData,setImgData]=useState('')
 useEffect(()=>{
 setImgData(imgUrl)
 
 },[imgUrl])
 
  return (
   <div className="addImg">
    {(imgData === '')?(
     <>
        <label className='addImg--icon' htmlFor='addImg'><h1>+</h1></label>
     <input className='img--file' type="file" name="" id="addImg" onChange={(e)=>{
       console.warn(e.target.files)
       const files = e.target.files
	    const formData = new FormData()
       formData.append('img', files[0])
       console.log(formData);
      }} />
     </>
    ):<img src={imgData || ''} alt="" srcset="" style={{zIndex:1000}} />}
     
     </div>
  )
}

export default ImgBox