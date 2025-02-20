import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout() {

    const location = useLocation();
    const isAuth =( location.pathname === "/login") || (location.pathname === "/register") ||(location.pathname === "/") ;

    return (
        <>
            <div className="flex flex-col min-h-screen">
            {!isAuth && <Navbar />} 
            
            <div className="flex-grow">
                <Outlet />
            </div>

            <Footer />
        </div>
        </>
    )
}

export default Layout;