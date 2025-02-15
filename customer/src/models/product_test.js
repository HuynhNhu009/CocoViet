class Product {
  constructor(productId, productName, variants = []) {
    this.productId = productId;
    this.productName = productName;
    this.variants = variants; // Mảng chứa các biến thể sản phẩm
  }
}

export default Product;
