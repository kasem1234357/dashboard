import React from 'react'
import './massage.css'
function Massage({active,sender,img,title,desc,color}) {
  return (
    <div className={`massage--box ${active && 'massage--active'} flex`}>
    <div className="Massage__image" >
      <img src={`./images/${img}`} alt="" srcSet="" style={{
        filter: `drop-shadow(0px 0px 5px ${color} )`
      }}/>
    </div>
    <div className="Massage__content">
      <span className="Massage__content__sender">
        {sender}
      </span>
      <h3 className="Massage__content__title">
        {title}
      </h3>
      <p className='Massage__content__desc'>
        {desc} </p>
    </div>
    </div>
  )
}

export default Massage