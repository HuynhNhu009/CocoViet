import ProductSearch from "./ProductSearch";
import ProductItem from "./ProductsItem";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Products = () => {
  
  const [products, setProducts] = useState([]);
  const productStore = useSelector(
    (state) => state.ProductStore.productStore || []
  );

  useEffect(() => {
    if (productStore.length > 0) {
      setProducts(productStore);
    }
  }, [productStore]);

  console.log("detail", products);
  

  return (
    <div className="  flex flex-col justify-center align-middle font-medium px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] my-8">
      <div className=" section-1">
        <ProductSearch />
      </div>

      <div className="section-2 mb-10 w-full flex justify-evenly- flex-row space-x-8 flex-wrap b-10">
        <div className="box-image shadow-md w-[35%] border-3 rounded-2xl border-green-600">
          <img
            src="https://www.sunnzfood.co.nz/wp-content/uploads/2016/11/Coconut-Products-3.jpg"
            className="w-full object-center p-5 rounded-3xl"
          />
        </div>

        <div className="box-content flex flex-col justify-between w-[62%]">
          <h2 className="font-bold text-4xl mb-0">ok</h2>
          <p className="text-2xl">
            Cửa hàng: <b>Bà Năm</b>
          </p>

          <p className="text-green-600 font-bold text-4xl ">150.000 VND</p>
          <p className="text-lg font-extralight">Còn lại: 10 Sản phẩm</p>
          <div className="border-2 border-green-600 rounded-2xl">
            <div className=" text-lg inner-content p-5">
              <p className="mb-1">Thông tin sản phẩm</p>
              <hr className="mb-5 text-green-600"></hr>
              <p className="font-extralight">Thể tích: 500ml</p>
              <p className="font-extralight">Xuất xứ: Bến Tre</p>
            </div>
          </div>
          <button className=" cursor-pointer bg-green-600 shadow-sm shadow-gray-400 p-3 rounded-2xl text-white text-base">
            MUA NGAY
          </button>
        </div>
      </div>
      <div className="section-3flex justify-center space-x-8 flex-wrap mb-8 ">
        <h2>GIỚI THIỆU</h2>
        <hr className=""></hr>
        <text className="font-light mx-auto text-center">
          1. Giới Thiệu Về Dầu Dừa Dầu dừa là một loại dầu thực vật được chiết
          xuất từ cơm dừa, có màu trắng hoặc vàng nhạt, mùi thơm dễ chịu. Đây là
          sản phẩm thiên nhiên giàu dưỡng chất, có nhiều công dụng trong làm
          đẹp, chăm sóc sức khỏe và nấu ăn. 2. Thành Phần Dinh Dưỡng Dầu dừa
          chứa hàm lượng cao axit béo bão hòa (khoảng 90%), chủ yếu là axit
          lauric – một hợp chất có khả năng kháng khuẩn và chống viêm mạnh mẽ.
          Ngoài ra, dầu dừa còn chứa các loại vitamin như E, K và chất chống oxy
          hóa, giúp bảo vệ tế bào khỏi tác động của gốc tự do. 3. Công Dụng Của
          Dầu Dừa ✅ Chăm Sóc Da và Tóc Dưỡng ẩm sâu: Dầu dừa giúp giữ nước cho
          làn da, làm mềm và cải thiện độ đàn hồi. Trị mụn và chống viêm: Nhờ
          axit lauric, dầu dừa có khả năng kháng khuẩn, giảm viêm hiệu quả.
          Chống lão hóa: Vitamin E và các chất chống oxy hóa trong dầu dừa giúp
          làm chậm quá trình lão hóa da. Dưỡng tóc bóng mượt: Bôi dầu dừa lên
          tóc giúp giảm khô xơ, chẻ ngọn, đồng thời kích thích mọc tóc. ✅ Tốt
          Cho Sức Khỏe Hỗ trợ giảm cân: Dầu dừa giúp tăng cường trao đổi chất,
          đốt cháy mỡ thừa hiệu quả. Cải thiện tiêu hóa: Các axit béo trong dầu
          dừa hỗ trợ hệ tiêu hóa, giúp hấp thụ dinh dưỡng tốt hơn. Tăng cường hệ
          miễn dịch: Nhờ đặc tính kháng khuẩn, dầu dừa giúp bảo vệ cơ thể khỏi
          vi khuẩn, virus. Tốt cho tim mạch: Dù chứa chất béo bão hòa, nhưng dầu
          dừa có thể giúp tăng cholesterol tốt (HDL) và giảm cholesterol xấu
          (LDL). ✅ Ứng Dụng Trong Nấu Ăn Dầu dừa có nhiệt độ nóng chảy thấp
          (~24°C), thích hợp để: Chiên, xào thực phẩm thay thế dầu ăn thông
          thường. Trộn salad hoặc làm nước sốt thơm ngon. Dùng trong các món
          bánh, chè để tăng hương vị béo ngậy. 4. Cách Sử Dụng Dầu Dừa Hiệu Quả
          Dưỡng da: Thoa dầu dừa trực tiếp lên vùng da khô hoặc bị tổn thương.
          Dưỡng tóc: Ủ dầu dừa trong 30 phút rồi gội sạch để có mái tóc bóng
          khỏe. Uống trực tiếp: 1–2 muỗng dầu dừa/ngày giúp hỗ trợ tiêu hóa và
          tăng cường sức khỏe. Dùng trong nấu ăn: Sử dụng dầu dừa thay thế dầu
          thực vật để tăng giá trị dinh dưỡng. 5. Lưu Ý Khi Sử Dụng Dầu Dừa
          Không nên dùng quá nhiều dầu dừa, đặc biệt nếu bạn có hệ tiêu hóa nhạy
          cảm. Lựa chọn dầu dừa nguyên chất, ép lạnh để đảm bảo chất lượng tốt
          nhất. Bảo quản dầu dừa ở nơi khô ráo, tránh ánh nắng trực tiếp để giữ
          được độ tinh khiết.
        </text>
      </div>
      <div className="section-4 ">
        <h2>XEM THÊM</h2>
        <hr className="mb-5"></hr>
        <div className=" productItem flex  align-middle grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 m-0">
          <ProductItem />
        </div>
      </div>
    </div>
  );
};

export default Products;
