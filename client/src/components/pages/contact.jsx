import React from 'react'
import { Add } from '../icons/SvgIcons'
import ContactImage from './111.svg'
import './styles/contact.css'
function contact() {

  return (
    <div className='contact '>
      <div className="contact__header">
        <h2>Contact with our Team</h2>
        <span>we already 24/7 for your question and ideas</span>
      </div>
      <div className="contact__content flex">
      <div className="contact__form">
       <div className="contact__form__controls flex">
         <div className="form--box form__title">
           <input type="text" placeholder='put your title' />
         </div>
         <div className="form--box form__type flex">
         <div className="massage__list__selectBox flex">
        <select name="" id="">
           <option value="1">Problem</option>
           <option value="2">Issue</option>
           <option value="3">Quesition</option>
           <option value="3">Others</option>
         </select>
           <svg className='svg--arrow' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill='#0DB8D3'><path d="M18.2 7.6c-.4 0-.7.1-.9.4L13 12.6c-.5.5-1.4.5-1.9 0L6.8 8c-.3-.2-.6-.4-1-.4-1.1 0-1.7 1.3-.9 2.1l6.2 6.8c.5.6 1.4.6 1.9 0l6.2-6.8c.6-.8 0-2.1-1-2.1z"></path></g></svg>
        </div>
         </div>
       </div>
       <textarea className='form--textarea' name="" id="" cols="30" rows="10" placeholder='start writing here'></textarea>
     </div>
     <div className="contact__image">
       <img src={ContactImage} alt="" srcset="" />
     </div>
      </div>
      <h3 className='contact__faq__title'>common quesition</h3>
      <div className="contact__faq">
        
        <div className="faq">
          <div className="faq__title flex">
            <h4>quesition 1</h4>
            <Add width='30px' color="none" stroke="#d7d7d7" strokeWidth="2px"/>
            
          </div>
          <div className="faq__answer">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ducimus error aperiam blanditiis sunt fuga odit molestias porro quis similique, ratione pariatur ipsam cupiditate explicabo dolore. Odio molestias molestiae facilis!</p>
            </div>
        </div>
        <div className="faq">
        <div className="faq__title flex">
            <h4>quesition 1</h4>
            <Add width='30px' color="none" stroke="#d7d7d7" strokeWidth="2px"/>
            
          </div>
          {/* <div className="faq__answer">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ducimus error aperiam blanditiis sunt fuga odit molestias porro quis similique, ratione pariatur ipsam cupiditate explicabo dolore. Odio molestias molestiae facilis!</p>
            </div> */}
        </div>
        <div className="faq">
        <div className="faq__title flex">
            <h4>quesition 1</h4>
            <Add width='30px' color="none" stroke="#d7d7d7" strokeWidth="2px"/>
            
          </div>
          {/* <div className="faq__answer">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ducimus error aperiam blanditiis sunt fuga odit molestias porro quis similique, ratione pariatur ipsam cupiditate explicabo dolore. Odio molestias molestiae facilis!</p>
            </div> */}
        </div>
        <div className="faq">
        <div className="faq__title flex">
            <h4>quesition 1</h4>
            <Add width='30px' color="none" stroke="#d7d7d7" strokeWidth="2px"/>
            
          </div>
          {/* <div className="faq__answer">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ducimus error aperiam blanditiis sunt fuga odit molestias porro quis similique, ratione pariatur ipsam cupiditate explicabo dolore. Odio molestias molestiae facilis!</p>
            </div> */}
        </div>
      </div>
    </div>
  )
}

export default contact