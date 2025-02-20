import React from "react";
import { useLocation } from "react-router-dom";
import AllRoute from "./components/AllRoute";

function App() {
  const location = useLocation();
  return (
    <>
      <AllRoute />
    </>
  );
}

export default App;
