import { handleClick } from "../configs/notificationConfig";
import axiosConfig from '../configs/axiosConfig'
import { updateProductNumber } from "../redux/slices/userSlice";
export const uploadDetails = (data,callbacks) => {
    const {setNewData,dispatch,setType,setShowModel,setUploadingProgress} = callbacks
    const {type,newData,productNumber} = data
    try {
      if (type === "New") {
        console.log(newData);
        axiosConfig
          .post(`/api/products/`, newData)
          .then((res) => {
            setNewData((data) => ({ ...data, ...res.data }));
            setType("update");
            setUploadingProgress((prev) => prev + 1);
            handleClick({ type: "success", msg: "deatails uploaded" });
            dispatch(updateProductNumber(productNumber+1))
            setShowModel(false);
          }).catch(err =>{
            setShowModel(false);
      handleClick({ type: "error", msg: "some thing wrong" });
          });
        return;
      }
      axiosConfig
        .put(
          `/api/products/update/${newData._id}`,
          newData
        )
        .then((res) => {
          setNewData((data) => ({ ...data, ...res.data }));
        }).catch(err =>{
          setShowModel(false);
    handleClick({ type: "error", msg: "some thing wrong" });
        });;
      setUploadingProgress((prev) => prev + 1);
      handleClick({ type: "success", msg: "deatails updated" });
      setShowModel(false);
    } catch (error) {
      console.log(error);
      setShowModel(false);
      handleClick({ type: "error", msg: "some thing wrong" });
    }
  };