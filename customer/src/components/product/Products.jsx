import ProductSearch from "./ProductSearch";
import ProductCategory from "./ProductCategory";
import ProductItem from "./ProductsItem";

const Products = () => {
  return (
    <div className="flex flex-col justify-center align-middle font-medium px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mb-8">
      <div className="search">
        <ProductSearch />
      </div>

      <div className="category flex justify-center space-x-8 flex-wrap mb-10">
        <ProductCategory />
      </div>

      <div className=" productItem flex  align-middle grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 m-0">
        <ProductItem />
      </div>
    </div>
  );
};

export default Products;
