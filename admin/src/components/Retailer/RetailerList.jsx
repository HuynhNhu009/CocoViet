import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActive, setRetailerSearch } from "../../redux/adminSlice";
import SearchBar from "../SearchBar";
import Retailer from "./Retailer";
const RetailerList = () => {
  const retailerStore = useSelector((state) => state.AdminStore.retailerStore);
  const retailerSearch = useSelector((state) => state.AdminStore.retailerSearch);

  const [retailers, setRetailers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (retailerStore.length > 0) {
      setRetailers(retailerStore);
    }
  }, [retailerStore]);

  useEffect(() => {
    if (retailerSearch.length > 0) {
      setRetailers(retailerSearch);
    }
  }, [retailerSearch]);

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 mx-3">
          <SearchBar
            placeholder="Search for retailer..."
            dataList={retailerStore}
            parameter1={"retailerName"}
            parameter2={"retailerAddress"}
            dispatchFunction={(data) => dispatch(setRetailerSearch(data))}
            setActive={(value) => dispatch(setActive(value))}
            navigateTo="/retailers"
          />
        </div>
      </div>
      <div className="mt-5">
        <Retailer retailers={retailers} />
      </div>
    </>
  );
};

export default RetailerList;
