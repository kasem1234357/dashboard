import React from "react";
import "./uploadingBox.css";
import { Close } from "../../icons/SvgIcons";
function UploadingBox({setShowModel}) {
  return (
    <>
      <div className="uploading_box flex ">
        <Close width="30px" color="#0db8d3" className="close-icon" onClick={()=>{setShowModel(false)}} />
        <h2>Uploading Data</h2>
        <div className="loader_container">
          <span className="loader" ></span>
        </div>
        <h3 className="uploading--progress">1 0f 6</h3>
        <div className="progress_boxes">
          <div
            className="progress--box"
            style={{ background: "#0db8d3" }}
          ></div>
          <div className="progress--box"></div>
          <div className="progress--box"></div>
          <div className="progress--box"></div>
          <div className="progress--box"></div>
          <div className="progress--box"></div>
        </div>
      </div>
      <div className="blur_area"></div>
    </>
  );
}

export default UploadingBox;
