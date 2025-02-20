import  { useEffect, useState } from "react";
import Search from "../Search";
import { productApi } from "../../services/api/productApi";
const Products = () => {
  const category = ["Thực Phẩm", "Nông nghiệp", "Nội thất", "Dụng cụ nhà bếp"];

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await productApi.getAll();
      if (response) {
        setProducts(response.data);
      }
    };

    fetchProducts();
  }, []);

  console.log(products);
  
   
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

      <div className=" flex  align-middle grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 m-0">
        {products.map((item, index) => (
          <ul
            key={index.productId}
            className=" shadow-md bg-[#77C27F] text-white  rounded-2xl rounded-md flex flex-col "
          >
            <li>
              <img
                src={"https://www.sunnzfood.co.nz/wp-content/uploads/2016/11/Coconut-Products-3.jpg"}
                alt={`Image ${index + 1}`}
                className="w-auto object-fill"
              />
            </li>
            <div className="py-2 text-center">
              <li className="">{item.productName}</li>
                {item.variants.map((variant, vIndex) => (
                  <li key={vIndex} className="font-light">{variant.price} VND</li>
                ))}

              <li className=" font-extralight">{item.retailerName}</li>
            </div>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Products;
