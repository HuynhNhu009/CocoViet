import React from "react";
import Home from "./pages/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth"; // Gộp chung Login & Register
import Footer from "./components/Footer";
import Products from "./pages/Product/Products";

function App() {
  const location = useLocation();
  return (
    <>
      <div
        className={
          location.pathname !== "/login" && location.pathname !== "/register"
            ? "px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]"
            : ""
        }
      >
        {location.pathname !== "/login" &&
          location.pathname !== "/register" && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />

          <Route path="/products" element={<Products />} />
        </Routes>
      </div>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Footer />
      )}
    </>
  );
}

export default App;
