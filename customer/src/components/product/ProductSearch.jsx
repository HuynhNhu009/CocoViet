import { useDispatch, useSelector } from "react-redux";
import { setProductSearch, setActive } from "../../redux/productSlice";
import SearchBar from "../SearchBar";

const ProductSearch = () => {
  const dispatch = useDispatch();
  const productStore = useSelector((state) => state.ProductStore.productStore);

  return (
    <SearchBar
      placeholder="Search for products..."
      dataList={productStore}
      parameter1={"productDesc"}
      parameter2={"productName"}
      dispatchFunction={(data) => dispatch(setProductSearch(data))}
      setActive={(value) => dispatch(setActive(value))}
      navigateTo="/products"
    />
  );
};

export default ProductSearch;
