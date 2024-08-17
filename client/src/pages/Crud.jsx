
import React, { Suspense } from "react";
import { AddProductIcon, Sheets, Sort } from "../components/icons/SvgIcons";
import { useNavigate } from "react-router-dom";
import "../styles/crud.css";
import FilterBox from "../components/Boxes/filtrerBox/FilterBox";
import { useEffect,useState } from "react";
import Crud_Table_products from "../components/Crud/crudTable/Crud_Table_products";
import Crud_Header from "../components/Crud/crudTable/Crud_Header";
import Crud_Table_sales from "../components/Crud/crudTable/Crud_Table_sales";
import Crud_Table_users from "../components/Crud/crudTable/Crud_Table_users";
import axiosConfig from '../configs/axiosConfig'
import useExport from "../hooks/useExport";
import useTable from "../hooks/useTable";
import PaginationBox from "../components/Boxes/paginationBox/PaginationBox";
import { motion } from "framer-motion"
import { useSelector } from "react-redux";
import { FAKE_USER_DATA } from "../configs/FAKE_USER_DATA";
import { config_animateY } from "../configs/motionConfig";
const titles = (type = "products") => {
 
  const titles = {
    users: ["profile", "username", "budget", "amount", "waiting", "contact"],
    sales: ["poster", "username", "amount", "price", "state"],
    products: [
      "poster",
      "Tilte",
      "Price",
      "Count",
      "barCode",
      "Copon",
      "Controls Btns",
    ],
  };
  return titles[type];
};

function Crud() {

  const productNumbers = useSelector(state =>state.user.productNumber)
  const [itemsData, setItemsData] = useState([]);
  const [total,setTotal]=useState(20)
  const [loading,setLoading] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [currentTitle, setCurrentTitle] = useState({
    type: "products",
    data: titles(),
  });
 
  const {
    currentStep,
    recordsLength, // number of element in single view
    setRecordsLength,
    toBack,
    skipsLength, // number of steps * records length
    toNext, 
    steps /** number of steps */
  } = useTable(Math.ceil(total/20) || 20)
  
  const {generateExcelFile} = useExport()
  const filter = (method, filterText) => {
    const data = itemsData.filter((task) => task[method].includes(filterText));
    setFilterProducts(data);
  };
  const renderEl = () => {
    const Els = []; 
    switch (currentTitle.type) {
      case "products":
        {
          if(filterProducts.length){
            filterProducts?.slice(skipsLength(),skipsLength()+recordsLength).forEach((product) => {
              Els.push(<Crud_Table_products key={product._id} data={product}/>)
          })
          }
      }
        break;
      case "sales":
        for (let i = 0; i < 13; i++) {
          Els.push(<Crud_Table_sales data={null} />);
        }
        break;
      case "users":
        {
          if(FAKE_USER_DATA.length){
            FAKE_USER_DATA?.slice(skipsLength(),skipsLength()+recordsLength).forEach((user,index) =>{
              Els.push(
                <Crud_Table_users
                  key={index}
                  data={user}
                />
              );
            })
          }
        }
        break;
      default:
        return <h1>hi</h1>;
    }
    return Els;
  };
  useEffect(() => {
    setLoading(true)
    try {
      axiosConfig.get(`/api/products/`).then((res) => {
        const {data } = res.data
        setTotal(data.total)
        setItemsData(data.productsWithStats);
        setFilterProducts(data.productsWithStats)
        setLoading(false)
      });
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }, []);
  const navigate = useNavigate();

  return (
    <Suspense fallback={<div className="loading_auth"> <span className="loader_auth"></span> </div>}>
    <motion.div {...config_animateY} className="Crud">
      <div className="Crud__header">
        <h2 >my products data</h2>
        <span>show your data and customize them</span>
      </div>
      <div className="crud__table">
        <div className="table__header">
          <div className="crud__table__header flex">
            <select
              name=""
              id=""
              onChange={(e) =>
                setCurrentTitle({
                  type: e.target.value,
                  data: titles(e.target.value),
                })
              }
            >
              <option value="products">Products Data</option>
              <option value="sales">Sales Data</option>
              <option value="users">user Data</option>
            </select>
            <div className="crud__table__header--controls flex">
              <button>
                <Sheets width={"20px"} color={"#d7d7d7"} onClick={()=>{
                
                  generateExcelFile(itemsData,`${currentTitle.type}-sheet-1`,{limitFields:['_id','galleryName','stat',"otherImg",'colors']})
                }}/>
              </button>
              <button>
                {showModel && (
                  <FilterBox filter={filter} methods={["title", " tags"]} />
                )}
                <span onClick={() => setShowModel(!showModel)}>Filters</span>
              </button>
              <button>
                <Sort width={"20px"} color={"#fff"} />
              </button>
              <button>
                <AddProductIcon
                  width={"15px"}
                  color={"#fff"}
                  onClick={() =>
                    navigate(`product/${productNumbers + 1}`, {
                      state: { dataInfo: null, type: "New" },
                    })
                  }
                />
              </button>
            </div>
          </div>
          <Crud_Header titles={currentTitle.data} />
        </div>
        <div className="crud__rows">
          {loading?<div className="loading_auth" style={{height:'auto'}}> <span className="loader_auth"></span> </div>:
          renderEl()
          }
           
         
        </div>
        <PaginationBox toBack={toBack} toNext={toNext} steps={steps} currentStep={currentStep}/>
      </div>
    </motion.div >
    </Suspense>
  );
}

export default Crud;
