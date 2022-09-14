
export const data =(dataType,labels)=>{
 const data = []
 for(let i=0;i<labels.length;i++){
   data.push(
    {
     x:labels[i],
     y:Math.floor(Math.random()*100),
     [dataType]:Math.floor(Math.random()*100),
    }
   )
 }
 return data
}