import React, { useEffect, useLayoutEffect, useState } from 'react'
import Crud_Table_sales from '../crudTable/Crud_Table_sales';
import Crud_Header from '../crudTable/Crud_Header';
import axiosConfig from '../../../configs/axiosConfig'
import EmptyBox from '../../Boxes/emptyBox/EmptyBox';
const titles =[ "profile","username", "createdAt","DeliveredAt", "amount", "price", "state"]
function SalesTable({setItemsData,setTotal,setFilterProducts,itemsData,total,filterProducts}) {

  const [loading,setLoading] = useState(false);

useLayoutEffect(() => {
  const fetchSales = async () => {
    try {
        setLoading(true)
      const res = await axiosConfig.get(`/api/transaction`);
      const { data } = res.data;
      setItemsData(data);
      setTotal(data.length)
      setFilterProducts(data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching sales:", error);
      setLoading(false)
      
      // Handle error (e.g., show error message)
    }
  };

  fetchSales();
}, []);
  return (
    <>
    <div>
       <Crud_Header titles={titles}  />
     <div className="crud__rows">
          {loading?<div className="loading_auth" style={{height:'auto'}}> <span className="loader_auth"></span> </div>:
          filterProducts.length >0 ?filterProducts?.map(item =>{
        return(
            <Crud_Table_sales data={item} />
        )
    }):<EmptyBox/>
          }
           
         
        </div>
   
    </div>
    
    </>
  )
}

export default SalesTable