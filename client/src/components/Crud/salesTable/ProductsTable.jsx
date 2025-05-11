import React, { useEffect, useLayoutEffect, useState } from 'react'
import Crud_Table_products from '../crudTable/Crud_Table_products';
import Crud_Header from '../crudTable/Crud_Header';
import axiosConfig from '../../../configs/axiosConfig'
import EmptyBox from '../../Boxes/emptyBox/EmptyBox';
 const titles = [
      "poster",
      "Tilte",
      "Price",
      "Count",
      "type",
      "Copon",
      "Controls Btns",
    ]
function ProductsTable({setItemsData,setTotal,setFilterProducts,itemsData,total,filterProducts}) {
 
  const [loading,setLoading] = useState(false);

useLayoutEffect(() => {
  const fetchSales = async () => {
    try {
        setLoading(true)
      const res = await axiosConfig.get(`/api/products`);
      const { data } = res.data;
      setTotal(data.total)
        setItemsData(data.productsWithStats);
        setFilterProducts(data.productsWithStats)
        setLoading(false)
    } catch (error) {
      console.error("Error fetching products:", error);
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
            <Crud_Table_products data={item} />
        )
    }):<EmptyBox/>
          }
           
         
        </div>
   
    </div>
    
    </>
  )
}

export default ProductsTable