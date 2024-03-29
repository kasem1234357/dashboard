import React from "react";
import ProductInfo from "../ProductInfo";
import "./add.css";
import ImgBox from "../../Boxes/imgBox/ImgBox";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import UploadingBox from "../../Boxes/uploadBox/UploadingBox";
import { handleClick } from "../../../configs/notificationConfig";
import { useDispatch, useSelector } from "react-redux";
import { updateProductNumber } from "../../../redux/slices/userSlice";
import axiosConfig from '../../../configs/axiosConfig'
import { uploadImg } from "../../../utils/uploadImg";
import useCalender from "../../../hooks/useCalender";
import useTime from "../../../hooks/useTime";
//======================================================================//
//*************************default product data**********************  *//
const defaultProduct = {
  title: "",
  count: 0,
  price: 0,
  barCode: "",
  profileImg: { url: "" },
  otherImg: [
    { id: 0, url: "" },
    { id: 1, url: "" },
    { id: 2, url: "" },
  ],
  coupon: "",
  couponPersent: 0,
  type: "",
  tags: [],
  desc: "",
  colors: [],
};
//=============================================================================//
function Add() {
  const dispatch = useDispatch()
  const productNumber = useSelector(state =>state.user.productNumber)
  const location = useLocation();
  const data = location?.state.dataInfo;
  const [type, setType] = useState(location?.state.type);
  // console.log(type);
  const [newData, setNewData] = useState(defaultProduct);
  const [images, setImages] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const {currentDay,currentMonth,currentYear} = useCalender()
  const {getTime} = useTime()
  
  const createGalleryName = ()=>{
      return `${currentYear}${currentMonth.index+1}${currentDay.index}${getTime().hour}${getTime().minute}${getTime().seconds}`
  }
  //====================================================================//
  /* 
   update data 
  */
  useEffect(() => {
    if (data !== null) {
      setNewData(data);
      console.log(data);
    }
  }, []);
  //====================================================================//
  //====================================================================//
  // upload img function ==> recursion function thats upload img in sequence
  // const uploadImg = (index, count) => {
  //   console.log(index);
  //   console.log(count);
  //   if (count === 0) {
  //     console.log(newData);
  //     console.log("image uploaded");
  //     handleClick({ type: "success", msg: "img uploaded" });
  //     uploadDetails(); 
  //     return 0;
  //   }

  //   try {
  //     console.log(images);
  //     setShowModel(true);
  //     axiosConfig
  //       .post(`/api/products/images`, images[index])
  //       .then((res) => {
  //         console.log(res.data);
  //         setNewData((prev) => {
  //           if (res.data.type === "otherImg") {
  //             // console.log(prev[res.data.type][(res.data.index) -1]);
  //             prev[res.data.type][res.data.index - 1].url =
  //               res.data.url.secure_url;
  //           }
  //           if (res.data.type === "profileImg") {
  //             console.log(prev[res.data.type]);
  //             prev[res.data.type].url = res.data.url.secure_url;
  //           }

  //           return prev;
  //         });

  //         console.log(`image ${index} uploaded`);
  //         // console.log(res.data
  //         //   );
  //         index++;
  //         count--;
  //         // console.log(count);
  //         setUploadingProgress((prev) => prev + 1);
  //         uploadImg(index++, count--);
  //       });
  //   } catch (error) {
  //     console.log("tttt");
  //     handleClick({ type: "error", msg: "some thing wrong" });
  //     setShowModel(false);
  //   }
  // };
  // const uploadDetails = () => {
  //   try {
  //     if (type === "New") {
  //       console.log(newData);
  //       axiosConfig
  //         .post(`/api/products/`, newData)
  //         .then((res) => {
  //           setNewData((data) => ({ ...data, ...res.data }));
  //           setType("update");
  //           setUploadingProgress((prev) => prev + 1);
  //           handleClick({ type: "success", msg: "deatails uploaded" });
  //           dispatch(updateProductNumber(productNumber+1))
  //           setShowModel(false);
  //         }).catch(err =>{
  //           setShowModel(false);
  //     handleClick({ type: "error", msg: "some thing wrong" });
  //         });
  //       return;
  //     }
  //     axiosConfig
  //       .put(
  //         `/api/products/update/${newData._id}`,
  //         newData
  //       )
  //       .then((res) => {
  //         setNewData((data) => ({ ...data, ...res.data }));
  //       }).catch(err =>{
  //         setShowModel(false);
  //   handleClick({ type: "error", msg: "some thing wrong" });
  //       });;
  //     setUploadingProgress((prev) => prev + 1);
  //     handleClick({ type: "success", msg: "deatails updated" });
  //     setShowModel(false);
  //   } catch (error) {
  //     console.log(error);
  //     setShowModel(false);
  //     handleClick({ type: "error", msg: "some thing wrong" });
  //   }
  // };
  const save = (e) => {
    e.preventDefault();
    console.log(images);
    uploadImg(
      {index:0,count:images.length,images,productNumber,type,newData,galleryName:createGalleryName()},
      {setNewData,setShowModel,setUploadingProgress,dispatch,setType}
      );
  };
  return (
    <div className="flex addProduct">
      {showModel ? (
        <UploadingBox uploadingProgress={uploadingProgress} setShowModel={setShowModel}/>
      ) : null}
      <div className="addProduct__images flex">
        <div className="addProduct__images__box flex">
          <div className="addProduct__images__main ">
            <ImgBox
              imgUrl={images[0]?.url || newData.profileImg.url || ""}
              updateFn={setImages}
              name={"profileImg-0"}
            />
          </div>
          <div className="addProduct__images__others flex">
            <div className="addProduct__images__others__box ">
              <ImgBox
                imgUrl={images[1]?.url || newData.otherImg[0]?.url || ""}
                updateFn={setImages}
                name={"otherImg-1"}
              />
            </div>
            <div className="addProduct__images__others__box ">
              <ImgBox
                imgUrl={images[2]?.url || newData.otherImg[1]?.url || ""}
                updateFn={setImages}
                name={"otherImg-2"}
              />
            </div>
            <div className="addProduct__images__others__box ">
              <ImgBox
                imgUrl={images[3]?.url || newData.otherImg[2]?.url || ""}
                updateFn={setImages}
                name={"otherImg-3"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="addProduct__info">
        <ProductInfo data={newData} setNewData={setNewData} save={save} />
      </div>
    </div>
  );
}

export default Add;
