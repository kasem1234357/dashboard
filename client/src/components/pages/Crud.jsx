/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { AddProductIcon, Sheets, Sort } from "../icons/SvgIcons";
import {utils,writeFile} from "xlsx";
import { useNavigate } from "react-router-dom";
import "./styles/crud.css";
import FilterBox from "../utils/FilterBox";
import axios from "axios";
import { useEffect,useState } from "react";
import Crud_Table_products from "../Crud/crudTable/Crud_Table_products";
import Crud_Header from "../Crud/crudTable/Crud_Header";
import Crud_Table_sales from "../Crud/crudTable/Crud_Table_sales";
import Crud_Table_users from "../Crud/crudTable/Crud_Table_users";
import {dataProduct} from '../Data/dt'
const titles = (type = "products") => {
  const titles = {
    users: ["profile", "username", "budget", "amount", "waiting", "contact"],
    sales: ["poster", "username", "product", "amount", "price", "state"],
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
  const [itemsData, setItemsData] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [currentTitle, setCurrentTitle] = useState({
    type: "products",
    data: titles(),
  });
  const  generateExcelFile=(data)=>{
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Sheet1");
    writeFile(workbook, "DataSheet.xlsx");
  }
  const filter = (method, filterText) => {
    const data = itemsData.filter((task) => task[method].includes(filterText));
    setFilterProducts(data);
  };
  const renderEl = () => {
    const Els = [];
    switch (currentTitle.type) {
      case "products":
        // eslint-disable-next-line
        {filterProducts?.forEach((product) => {
            Els.push(<Crud_Table_products key={product._id} data={product}/>)
        })}
        break;
      case "sales":
        for (let i = 0; i < 13; i++) {
          Els.push(<Crud_Table_sales data={null} />);
        }
        break;
      case "users":
        for (let i = 0; i < 13; i++) {
          Els.push(
            <Crud_Table_users
              data={{
                url: "https://source.unsplash.com/random/200x200?person",
              }}
            />
          );
        }
        break;
      default:
        return <h1>hi</h1>;
    }
    return Els;
  };
  useEffect(() => {
    //setFilterProducts(itemsData);
    setFilterProducts(dataProduct)
  }, [itemsData]);
  useEffect(() => {
    try {
      axios.get("http://localhost:8800/api/products/").then((res) => {
        setItemsData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  const navigate = useNavigate();

  return (
    <div className="Crud">
      <div className="Crud__header">
        <h2>my products data</h2>
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
                  generateExcelFile(dataProduct)
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
                    navigate(`product/${itemsData.length + 1}`, {
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
          {console.log(renderEl())}
          {renderEl()}

         
        </div>
      </div>
    </div>
  );
}

export default Crud;
