import { handleClick } from "../configs/notificationConfig";
import axiosConfig from '../configs/axiosConfig'
import { uploadDetails } from "./uploadDetails";
export const uploadImg = (data,callbacks) => {
  const {index, count,images,newData,galleryName} = data
  const {setNewData,setShowModel,setUploadingProgress} = callbacks
  console.log(galleryName);
    // console.log(index);
    // console.log(count);
    // the endPoint of recursion
    if (count === 0) {
      console.log(newData);
      console.log("image uploaded");
      handleClick({ type: "success", msg: "img uploaded" });
      uploadDetails(data,callbacks); 
      return 0;
    }

    try {
      console.log(images);
      setShowModel(true);
      axiosConfig
        .post(`/api/products/images`, {...images[index],galleryName})
        .then((res) => {
          console.log(res.data);
          setNewData((prev) => {
            if (res.data.type === "otherImg") {
              // console.log(prev[res.data.type][(res.data.index) -1]);
              prev[res.data.type][res.data.index - 1].url =
                res.data.url.secure_url;
            }
            if (res.data.type === "profileImg") {
              console.log(prev[res.data.type]);
              prev[res.data.type].url = res.data.url.secure_url;
            }

            return prev;
          });

          console.log(`image ${index} uploaded`);
          // console.log(res.data
          //   );
          index++;
          count--;
          // console.log(count);
          setUploadingProgress((prev) => prev + 1);
          uploadImg(index++, count--);
        });
    } catch (error) {
      console.log("tttt");
      handleClick({ type: "error", msg: "some thing wrong" });
      setShowModel(false);
    }
  };