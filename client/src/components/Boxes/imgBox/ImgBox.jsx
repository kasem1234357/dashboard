import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Close } from '../../icons/SvgIcons';

function ImgBox({imgUrl,name,updateFn}) {
 const [imgData,setImgData]=useState('')
 const [propertyImage, setPropertyImage] = useState({ name: "", url: "" });
 const handleImageChange = (file) => {
   const reader = (readFile) =>
       new Promise((resolve, reject) => {
           const fileReader = new FileReader();
           fileReader.onload = () => resolve(fileReader.result );
           fileReader.readAsDataURL(readFile);
       });

   reader(file).then((result) =>{
       setPropertyImage({ name: file?.name, url: result })
        setImgData(result) 
        updateFn(prev =>{

         const index = name.split("-")[1]
         const nameRef = name.split("-")[0]
         const data= {}
         data.index= index
         data.type =nameRef
         data.imgData = result
         prev.push(data)
          return prev
        })
      //   updateFn(prev =>{
      //    console.log(prev);
      //    if(!name.includes("otherImg")){
            
      //       prev[name].url = result}
      //    else {
      //       const index = name.split("-")[1]
      //       const nameAttr = name.split("-")[0]
      //       prev[nameAttr][index].url = result}
      //       return prev
      //   }) 
   });
};
 useEffect(()=>{
 setImgData(imgUrl)
 
 },[imgUrl])
 
  return (
   <div className="addImg">
    {(imgData === '')?(
     <>
        <label className='addImg--icon' htmlFor={name}><h1>+</h1></label>
     <input className='img--file' accept="image/*" type="file"  name={name} id={name} onChange={(e)=>{
       console.warn(e.target.files)
      //  const files = e.target.files
	   //  const formData = new FormData()
      //  formData.append('img', files[0])
       handleImageChange(e.target.files[0]);
       
      //  console.log(formData);

      }} />
     </>
    ):<>
    <Close width={"20px"} onClick={()=>{
      setImgData("")
      updateFn(prev =>{
        const index = name.split("-")[1]
         const nameRef = name.split("-")[0]
        return prev.filter(img =>img.type !== nameRef && img.index !== index )
      })
      setPropertyImage({ name: "", url: "" })
    }} className="remove-img-icon" color={"#fff"}/>
       <img src={imgData || ''} alt="" srcset="" style={{zIndex:1000}} />
    </>
    }
     
     </div>
  )
}

export default ImgBox