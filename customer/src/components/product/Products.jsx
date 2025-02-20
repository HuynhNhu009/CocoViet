import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Search from "../Search";

const Products = () => {
  const category = ["category-1", "category-2", "category-3", "category-4" ];
  const products = [
    {
      image : "https://th.bing.com/th/id/R.c872c36b9fe7bb9bdd460d7b91630881?rik=cA7Vwzj7lUY6Sw&riu=http%3a%2f%2fcdn.shopify.com%2fs%2ffiles%2f1%2f0358%2f7879%2f7448%2fproducts%2fcoconut_1200x1200.png%3fv%3d1602297120&ehk=j7e6UElZa8jdSPsuDRc7zVvHshex6ChVN9digA%2fB9JE%3d&risl=&pid=ImgRaw&r=0",
      title: "Dừa khô",
      price:"200.000",
      retailer: "Retailer 1"
    },
    {
      image : "https://th.bing.com/th/id/R.c872c36b9fe7bb9bdd460d7b91630881?rik=cA7Vwzj7lUY6Sw&riu=http%3a%2f%2fcdn.shopify.com%2fs%2ffiles%2f1%2f0358%2f7879%2f7448%2fproducts%2fcoconut_1200x1200.png%3fv%3d1602297120&ehk=j7e6UElZa8jdSPsuDRc7zVvHshex6ChVN9digA%2fB9JE%3d&risl=&pid=ImgRaw&r=0",
      title: "Dừa khô",
      price:"200.000",
      retailer: "Retailer 1"
    },
    {
      image : "https://th.bing.com/th/id/R.c872c36b9fe7bb9bdd460d7b91630881?rik=cA7Vwzj7lUY6Sw&riu=http%3a%2f%2fcdn.shopify.com%2fs%2ffiles%2f1%2f0358%2f7879%2f7448%2fproducts%2fcoconut_1200x1200.png%3fv%3d1602297120&ehk=j7e6UElZa8jdSPsuDRc7zVvHshex6ChVN9digA%2fB9JE%3d&risl=&pid=ImgRaw&r=0",
      title: "Dừa khô",
      price:"200.000",
      retailer: "Retailer 1"
    },
    {
      image : "https://th.bing.com/th/id/R.c872c36b9fe7bb9bdd460d7b91630881?rik=cA7Vwzj7lUY6Sw&riu=http%3a%2f%2fcdn.shopify.com%2fs%2ffiles%2f1%2f0358%2f7879%2f7448%2fproducts%2fcoconut_1200x1200.png%3fv%3d1602297120&ehk=j7e6UElZa8jdSPsuDRc7zVvHshex6ChVN9digA%2fB9JE%3d&risl=&pid=ImgRaw&r=0",
      title: "Dừa khô",
      price:"200.000",
      retailer: "Retailer 1"
    },
    {
      image : "https://th.bing.com/th/id/R.c872c36b9fe7bb9bdd460d7b91630881?rik=cA7Vwzj7lUY6Sw&riu=http%3a%2f%2fcdn.shopify.com%2fs%2ffiles%2f1%2f0358%2f7879%2f7448%2fproducts%2fcoconut_1200x1200.png%3fv%3d1602297120&ehk=j7e6UElZa8jdSPsuDRc7zVvHshex6ChVN9digA%2fB9JE%3d&risl=&pid=ImgRaw&r=0",
      title: "Dừa khô",
      price:"200.000",
      retailer: "Retailer 1"
    },{
      image : "https://th.bing.com/th/id/R.c872c36b9fe7bb9bdd460d7b91630881?rik=cA7Vwzj7lUY6Sw&riu=http%3a%2f%2fcdn.shopify.com%2fs%2ffiles%2f1%2f0358%2f7879%2f7448%2fproducts%2fcoconut_1200x1200.png%3fv%3d1602297120&ehk=j7e6UElZa8jdSPsuDRc7zVvHshex6ChVN9digA%2fB9JE%3d&risl=&pid=ImgRaw&r=0",
      title: "Dừa khô",
      price:"200.000",
      retailer: "Retailer 1"
    }
  ]
  return (
    <div className=" h-lvh items-center py-5 font-medium px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div className="search">
        <Search />
      </div>

      <div className="category flex justify-center space-x-8 flex-wrap mb-10">
        {category.map((item, index) => (
          <div key={index} className="bg-green-600 text-white rounded-sm ">
            <p className="px-5 py-2">
              {item}
            </p>
          </div>
        ))}
      </div>

      <div className="product bg-amber-300 flex justify-center space-x-8 flex-wrap">
        {products.map((item, index) => (
          <ul key={index} className="bg-green-600 text-white rounded-sm px-7 py-2">
            <li >
              <img src={item.image} alt={`Image ${index + 1}`} className="w-32 h-32"  />
            </li>
            <li>{item.title}</li>
            <li>{item.price}</li>
            <li>{item.retailer}</li>
          </ul>
        ))}
      </div>


    </div>
  );
};

export default Products;
