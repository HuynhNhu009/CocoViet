import useFetchData from "../hooks/useFetchProducts";
import ProductCard from "../components/ProductCard"; // Ensure you have this import

const ProductListPage = () => {
  const { data: products, loading, error } = useFetchData("products");

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Có lỗi xảy ra!</p>;

  return (
    <div>
      <h2>Danh sách sản phẩm</h2>
      {Array.isArray(products) &&
        products.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
    </div>
  );
};

export default ProductListPage;
