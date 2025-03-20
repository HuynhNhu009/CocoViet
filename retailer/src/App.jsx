import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { retailerAPI } from "../../customer/src/services/retailerService";
import AllRoute from "./components/AllRoute";
import { setAllRetailer } from "./redux/retailerSlice";

function App() {
  const dispatch = useDispatch();

  const getAllRetailer = async () => {
    try {
      const responseData = await retailerAPI.getAllRetailer();
      dispatch(setAllRetailer(responseData.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllRetailer();
  }, []);

  return <AllRoute />;
}

export default App;
