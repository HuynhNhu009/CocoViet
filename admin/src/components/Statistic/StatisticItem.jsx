import {
  ChartBarIcon,
  CubeIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const StatisticItem = () => {
  const productStore = useSelector((state) => state.AdminStore.productStore);
  const retailerStore = useSelector((state) => state.AdminStore.retailerStore);
  const orderStore = useSelector((state) => state.AdminStore.orderStore);
  const retailerProductStore = useSelector((state) => state.AdminStore.retailerProduct);
  const revenueListStore = useSelector((state) => state.AdminStore.revenueList);
  const statusStore = useSelector((state) => state.AdminStore.statusStore);
  const [productName, setProductName] = useState("");
  const [orderStats, setOrderStats] = useState([]);
  const [orders, setOrders] = useState();

  const [revenue, setRevenue] = useState([]);


  useEffect(() => {
    if (revenueListStore && revenueListStore.bestSellingProduct?.length > 0) {
      setRevenue(revenueListStore);
      const matchingProducts = revenueListStore.bestSellingProduct
        .map((item) => {
          const variantId = item.productVariant?.variantId;
          return productStore.find((product) =>
            product.variants.some((variant) => variant.variantId === variantId)
          );
        })
        .filter(Boolean);

      const top3 = matchingProducts.slice(0, 3);

      const orderTop = top3.map((order, index) => ({
        productName: order?.productName || "Chưa có",
        totalSold: revenueListStore.bestSellingProduct[index]?.totalSold || 0,
      }));

      if (matchingProducts.length > 1) {
        const top1 = matchingProducts.slice(1);
        if (top1 && top1.length > 0) {
          setProductName(top1[0].productName);
        }
      } else {
        setProductName(matchingProducts[0].productName);
      }

      setOrderStats(orderTop);
    } else {
      console.log("Không có sản phẩm bán chạy.");
    }
  }, [revenueListStore, productStore]);

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
            {revenueListStore?.countOrder}
          </p>
        </div>
      </div>
      <div className="col-span-1 flex items-center p-4 border-gray-400 rounded-lg shadow-md">
        <CurrencyDollarIcon className="text-yellow-500 size-12" />
        <div className="ml-8">
          <p className="text-lg font-bold ">Tổng lợi nhuận</p>
          <p className="text-xl font-semibold  text-yellow-500">
          {revenueListStore?.totalRevenue}
          VND
          </p>
        </div>
      </div>
      
      <div className="col-span-1 flex items-center p-4 border-gray-400 rounded-lg shadow-md">
        <CubeIcon className="text-green-600 size-12" />
        <div className="ml-8">
          <p className="text-lg font-bold ">Tổng sản phẩm</p>
          <p className="text-xl font-semibold text-green-600">{productStore.length}</p>
        </div>
      </div>
      <div className="col-span-1 flex items-center p-4 border-gray-400 rounded-lg shadow-md">
        <ChartBarIcon className=" text-red-500 size-12" />
        <div className="ml-8">
          <p className="text-lg font-bold ">Bán chạy nhất</p>
          <p className="font-semibold text-xl text-red-500 font-bold">
          </p>
        </div>
      </div>

      <div className="col-span-2 p-4 border-gray-400 mb-5 rounded-lg shadow-md">
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

      <div className=" border-gray-400 rounded-lg shadow-md mb-5 col-span-2 p-4">
        <p className="text-lg text-center font-bold uppercase">
          Top 3 sản phẩm bán chạy
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={orderStats}
              dataKey="totalSold"
              nameKey="productName"
              outerRadius={100}
              label
            >
              {orderStats.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={["#E79833", "#4C300A", "#00A63E"][index]}
                />
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

export default StatisticItem;
