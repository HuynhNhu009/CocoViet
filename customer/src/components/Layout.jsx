import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout() {

    const location = useLocation();
    const isAuth =( location.pathname === "/login") || (location.pathname === "/register") ||(location.pathname === "/") ;

    return (
        <>
            <div className="">
            {!isAuth && <Navbar />} 
            
            <div className="">
                <Outlet />
            </div>

            <Footer />
        </div>
        </>
    )
}

export default Layout;