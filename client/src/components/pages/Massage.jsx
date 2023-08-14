import React, { useState } from 'react'
import { massageData } from '../Data/massageData'
import { BackArrow, Delete, Download, Print, ReturnBack, Send } from '../icons/SvgIcons'
import Massage from '../Massages/Massage/Massage'
import MassegeArea from '../Massages/MassegeArea/MassegeArea'
import MassegeLabel from '../Massages/MassegeArea/MassegeLabel'
//=====================================================//
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//======================================================//

import "./styles/massage.css"
import { convertToPDF } from '../utils/PDF_function'
function MassagePage() {
  const [showList,setShowList] = useState(true)
  const [senderMassageData,setSenderMassageData] = useState('')
  const [printContent,setPrintContent]=useState('')
  return (
    <div className='massage flex'>
     <div className="massage__navbar flex">
      <div className="massage__navbar__search">
        <input type="text" placeholder='search...'/>
      </div>
     </div>
     <div className="massage__content flex">
     <div className={`massage__list ${showList?"active":""} secondary--bg`}>
      <div className="massage__list__searchBox flex">
        <div className="massage__list__selectBox flex">
        <select name="" id="">
           <option value="1">Newest First</option>
           <option value="1">Oldest First</option>
           <option value="1">Unreaded First</option>
         </select>
           <svg className='svg--arrow' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill='#0DB8D3'><path d="M18.2 7.6c-.4 0-.7.1-.9.4L13 12.6c-.5.5-1.4.5-1.9 0L6.8 8c-.3-.2-.6-.4-1-.4-1.1 0-1.7 1.3-.9 2.1l6.2 6.8c.5.6 1.4.6 1.9 0l6.2-6.8c.6-.8 0-2.1-1-2.1z"></path></g></svg>
        </div>
         
<svg className='svg--icon svg--close--arrow' onClick={()=>setShowList(!showList)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill='#0DB8D3'><path d="M12.4 18.2c0-.4-.1-.7-.4-.9L7.4 13c-.5-.5-.5-1.4 0-1.9L12 6.8c.3-.2.4-.6.4-.9 0-1.1-1.3-1.7-2.1-.9l-6.8 6.2c-.6.5-.6 1.4 0 1.9l6.8 6.2c.8.5 2.1-.1 2.1-1.1zM20.4 18.2c0-.4-.1-.7-.4-.9L15.4 13c-.5-.5-.5-1.4 0-1.9L20 6.8c.3-.2.4-.6.4-.9 0-1.1-1.3-1.7-2.1-.9l-6.8 6.2c-.6.5-.6 1.4 0 1.9l6.8 6.2c.8.5 2.1-.1 2.1-1.1z"></path></g></svg>

      </div>
      <div className="massage__box flex">
      {massageData.map((massage,index)=>
       (
         <Massage key={index} {...massage}/>
       )
      )}
      
      </div>
      
     </div>
     <div className="massage__viewBox secondary--bg flex">
      <div className="massage__viewBox__editBox">
        <ReturnBack className = 'svg--icon massege-arrow' color='#0DB8D3' onClick={()=>setShowList(!showList)}/>
        <div className="tools flex">
        <BackArrow className = 'svg--icon' color='#0DB8D3'/>
       <Download className = 'svg--icon' color='#0DB8D3'/>
       <Print className = 'svg--icon' color='#0DB8D3'  onClick={()=>{
      convertToPDF(printContent)
    }}/>
       <Delete className = 'svg--icon' color='#0DB8D3'/>
        </div>
       
      </div>
      <div className="massage__viewBox__massegeBox ">
        <MassegeLabel {...massageData[0]}/>
        <MassegeArea setPrintContent={setPrintContent}/>
        <CKEditor editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 100!</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                        setSenderMassageData(data)
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }/>
                    {senderMassageData}
        <button className='send-massage-btn'> <Send color={"#0db8d3"} /> </button>
      </div>
     </div>
     </div>
    </div>
  )
}

export default MassagePage