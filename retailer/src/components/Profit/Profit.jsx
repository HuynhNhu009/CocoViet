import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { useSelector } from "react-redux";
import moment from "moment";
import {
  ShoppingCartIcon,
  CubeIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
const orderStats = [
  { name: "Hoàn tất", value: 400, color: "#4CAF50" },
  { name: "Đang vận chuyển", value: 300, color: "#000" },
  { name: "Hủy bỏ", value: 200, color: "#FF9800" },
  { name: "Tiếp nhận", value: 500, color: "#8BC34A" },
];

const Profit = () => {
  const products = useSelector((state) => state.RetailerStore.products);
  const orderStore = useSelector((state) => state.RetailerStore.orderStore);
  const statusStore = useSelector((state) => state.RetailerStore.statusStore);
  const revenueStore = useSelector((state) => state.RetailerStore.revenueStore);
  const [countProduct, setcountProduct] = useState();
  const [productName, setProductName] = useState();
  const [orders, setOrders] = useState();
  const [revenue, setRevenue] = useState();

  const ordersChart = [{ orderDate: "", totalQuantity: null }];

  useEffect(() => {
    if (products != []) {
      setcountProduct(products.length);
    }
  }, [products]);

  useEffect(() => {
    if (revenueStore && revenueStore.bestSellingProduct?.length > 0) {
      setRevenue(revenueStore);
      revenueStore.bestSellingProduct.map((item) => {
        const variantId = item.productVariant?.variantId;

        const matchingProduct = products.find((product) =>
          product.variants.some((variant) => variant.variantId === variantId)
        );

        setProductName(
          matchingProduct ? matchingProduct.productName : "Không có"
        );
      });
    } else {
      console.log("Không có sản phẩm bán chạy.");
    }
  }, [revenueStore, products]);

  useEffect(() => {
    if (orderStore && statusStore) {
      const getStatus = statusStore.find(
        (item) => item.statusCode === "DELIVERED"
      );
      const filteredResults = orderStore.filter((item) =>
        item.receiptDetails.some(
          (detail) => detail.statusName === getStatus.statusName
        )
      );

      const ordersChart = filteredResults.map((order) => ({
        orderDate: order.orderDate,
        totalQuantity: order.receiptDetails.reduce(
          (sum, detail) => sum + (detail.totalQuantity || 0),
          0
        ),
      }));

      setOrders(ordersChart);
    }
  }, [orderStore, statusStore]);

  const processData = (orders) => {
    const today = moment().format("YYYY-MM-DD");
    const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");

    const todayOrders = {};
    const yesterdayOrders = {};

    for (let i = 0; i < 24; i++) {
      todayOrders[i] = 0;
      yesterdayOrders[i] = 0;
    }

    orders?.forEach((order) => {
      const orderDate = moment(order.orderDate);
      const hour = orderDate.hour();

      if (orderDate.format("YYYY-MM-DD") === today) {
        todayOrders[hour] += order.totalQuantity;
      } else if (orderDate.format("YYYY-MM-DD") === yesterday) {
        yesterdayOrders[hour] += order.totalQuantity;
      }
    });

    return Array.from({ length: 24 }, (_, i) => ({
      hour: `${i}h`,
      todayOrders: todayOrders[i],
      yesterdayOrders: yesterdayOrders[i],
    }));
  };

  const orderData = processData(orders);

  return (
    <div className="px-6 grid grid-cols-4 gap-4">
      <div className="col-span-1 flex items-center items-center p-4 border-gray-400 rounded-lg shadow-md  ">
        <ShoppingCartIcon className="text-blue-600 size-12" />
        <div className="ml-8">
          <p className="text-lg font-bold">Tổng đơn hàng</p>
          <p className="text-xl font-semibold text-blue-600">
            {revenue?.countOrder}
          </p>
        </div>
      </div>
      <div className="col-span-1 flex items-center p-4 border-gray-400 rounded-lg shadow-md">
        <CurrencyDollarIcon className="text-yellow-500 size-12" />
        <div className="ml-8">
          <p className="text-lg font-bold ">Tổng lợi nhuận</p>
          <p className="text-xl font-semibold  text-yellow-500">
            {revenue?.totalRevenue} VND
          </p>
        </div>
      </div>
      <div className="col-span-1 flex items-center p-4 border-gray-400 rounded-lg shadow-md">
        <ChartBarIcon className=" text-red-500 size-12" />
        <div className="ml-8">
          <p className="text-lg font-bold ">Bán chạy nhất</p>
          <p className="font-semibold text-xl text-red-500 font-bold">
            {productName}
          </p>
        </div>
      </div>
      <div className="col-span-1 flex items-center p-4 border-gray-400 rounded-lg shadow-md">
        <CubeIcon className="text-green-600 size-12" />
        <div className="ml-8">
          <p className="text-lg font-bold ">Tổng sản phẩm</p>
          <p className="text-xl font-semibold text-green-600">{countProduct}</p>
        </div>
      </div>

      <div className="col-span-2 p-4 border-gray-400 rounded-lg shadow-md">
        <p className="text-lg font-bold">Số lượng đơn hàng theo giờ</p>
        {orders ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={orderData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="todayOrders"
                stroke="#2196F3"
                name="Hôm nay"
              />
              <Line
                type="monotone"
                dataKey="yesterdayOrders"
                stroke="#000"
                name="Hôm qua"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="todayOrders"
                stroke="#2196F3"
                name="Hôm nay"
              />
              <Line
                type="monotone"
                dataKey="yesterdayOrders"
                stroke="#000"
                name="Hôm qua"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className=" border-gray-400 rounded-lg shadow-md col-span-2 p-4">
        <p className="text-lg font-bold uppercase text-green-600">
          Thống kê trạng thái đơn hàng
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={orderStats}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
            >
              {orderStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Profit;
