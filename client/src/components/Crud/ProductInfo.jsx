import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import ColorBox from './ColorBox/ColorBox'
import './productInfo.css'
function ProductInfo({data,setNewData}) {
  const [showModel,setShowModel] = useState(false)
  const [currentColorData,setCurrentColorData]=useState()
  const updateColor = (colorData,i)=>{
    if(i === data.colors.length){
      const newData = data.colors
      newData.push(colorData)
      setNewData({...data,colors:newData})
    }
    const newData =data.colors.map(color=>{
      if(color.id === i)return{...colorData}
      return color
    })
    setNewData({...data,colors:newData})
  }
  const defaultColor =  {
    id:data.colors?.length,
    hex:'',
    title:'',
    frontImg:'',
    backImg:'',
    size: [{
     name:'sm',
      count:0,
    },
    {
      name:'md',
       count:0,
     },
     {
      name:'L',
       count:0,
     },
     {
      name:'XL',
       count:0,
     },],
     totalCount:0
  }

  
  const updateData = (subData,value)=>{
    setNewData({...data,[subData]:value})
  }
  return (
    <form className='ProductInfo flex' action="">
      {showModel?<ColorBox data={currentColorData} count={data.count} updateColorData={updateColor} updateData={updateData} close={setShowModel}/>:null}
      
      <div className="ProductInfo--box ProductInfo__title flex">
       <div className="ProductInfo--label"><h3>Title</h3></div>
       <div className="ProductInfo--input">
        <input type="text" defaultValue={data.title || ''} onInput={(e)=>{updateData('title',e.target.value)}} />
       </div>
      </div>
      <div className="ProductInfo--box ProductInfo__price flex">
      <div className="ProductInfo--label"><h3>Price</h3></div>
       <div className="ProductInfo--input flex">
       <input type="number" min={5} max={200} defaultValue={data.price || ''} onInput={(e)=>updateData('price',parseInt(e.target.value))} />
       <span>USD</span>
       </div>
      </div>
      <div className="ProductInfo--box ProductInfo__size flex">
      <div className="ProductInfo--label"><h3>Size</h3></div>
       <div className="ProductInfo--input flex">
        <input type="text" name="" id="" />
       </div>
      </div>
      <div className="ProductInfo--box ProductInfo__color flex">
      <div className="ProductInfo--label"><h3>Colors</h3></div>
       <div className="ProductInfo--input flex">
       {data.colors?.map(color =>{
            return (
                  <div key={color.id} className='addColor' htmlFor="color" style={{background:color.hex}} onClick={()=>{
                    setShowModel(true)
                    setCurrentColorData(color)
                  }}></div>
            )
       })}
      <div className='addColor' htmlFor="color" onClick={()=>{
                    setShowModel(true)
                    setCurrentColorData(defaultColor)
                  }}>+</div>
    </div>
  </div>
      <div className="ProductInfo--box ProductInfo__copon flex">
        <div className="ProductInfo--label"><h3>Copon</h3></div>
        <div className="ProductInfo--input flex">
          <input type="text" placeholder='put your copon code' defaultValue={data.copon || ''} onInput={(e)=>updateData('copon',e.target.value)}/>
          <div className='copon-percent flex'>
            <input  type="number" min={10} max={90} defaultValue={data.coponPersent } onInput={(e)=>updateData('coponPersent',parseInt(e.target.value))} />
        <span>%</span>
          </div>
        
       </div>
      </div>
      <div className="ProductInfo--box ProductInfo__type flex">
      <div className="ProductInfo--label"><h3>Type</h3></div>
      <div className="ProductInfo--input">
        <input type="text" defaultValue={data.type || ''} />
       </div>
      </div>
      <div className="ProductInfo--box ProductInfo__tags flex">
      <div className="ProductInfo--label"><h3>Tags</h3></div>
       <div className="ProductInfo--input">
        <textarea name="" id="" cols="30" rows="10" defaultValue={data?.tags?.join(',')} onInput={(e)=>updateData('tags',e.target.value.split(','))}></textarea>
       </div>
      </div>
      <div className="ProductInfo--box ProductInfo__desc flex">
      <div className="ProductInfo--label"><h3>Desc</h3></div>
       <div className="ProductInfo--input">
        <textarea name="" id="" cols="30" rows="10" defaultValue={data.desc || ''}onInput={(e)=>updateData('desc',e.target.value)}></textarea>
       </div>
      </div>
      <button className='controlls--save'><p>Add</p></button>
    </form>
  )
}

export default ProductInfo