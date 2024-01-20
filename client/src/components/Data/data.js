
import {dataOverallStat} from './dt'
export const data =(dataType,labels)=>{
 const data = []
 console.log(dataOverallStat.monthlyData
  );
 for(let i=0;i<labels.length;i++){
   data.push(
    {
     x:labels[i],
     y:5000,
     [dataType]:dataOverallStat[0].monthlyData[i][dataType],
    }
   )
 }
 return data
}