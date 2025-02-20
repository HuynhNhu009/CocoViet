import  { useEffect, useState } from "react";
// import { Link, NavLink } from "react-router-dom";
import Search from "../Search";
import { productApi } from "../../services/api/productApi";
const Products = () => {
  const category = ["Thực Phẩm", "Nông nghiệp", "Nội thất", "Dụng cụ nhà bếp"];

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await productApi.getAll();
      if (data) {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  console.log(products.data);
  
   
  return (
    <div className="items-center py-5 font-medium px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div className="search">
        <Search />
      </div>

      <div className="category flex justify-center space-x-8 flex-wrap mb-10">
        {category.map((item, index) => (
          <div
            key={index}
            className="bg-[#77C27F] text-white rounded-sm shadow-md  "
          >
            <p className="py-2 w-36 text-center ">{item}</p>
          </div>
        ))}
      </div>

      {/* <div className=" flex  align-middle grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 m-0">
        {products.map((item, index) => (
          <ul
            key={index.productId}
            className=" shadow-md bg-[#77C27F] text-white  rounded-2xl rounded-md flex flex-col "
          >
            <li>
              <img
                src={item.productImage}
                alt={`Image ${index + 1}`}
                className="w-auto object-fill"
              />
            </li>
            <div className="py-2 text-center">
              <li className="">{item.productName}</li>
              <li className="font-light ">{item.variants.price} VND</li>
              <li className=" font-extralight">{item.retailerName}</li>
            </div>
          </ul>
        ))}
      </div> */}
    </div>
  );
};

export default Products;
