import ProductSearch from "./ProductSearch";
import ProductCategory from "./ProductCategory";
import ProductList from "./ProductList";

const Products = () => {
  return (
    <div className="flex flex-col justify-center align-middle font-medium px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mb-8">
      <div className="search">
        <ProductSearch />
      </div>

      <div className="category flex justify-center space-x-8 flex-wrap mb-10">
        <ProductCategory />
      </div>

      <div>
        <ProductList />
      </div>
    </div>
  );
};

export default Products;
