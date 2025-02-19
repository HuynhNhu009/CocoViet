import { useLocation } from "react-router-dom";
import LoginNavBar from "../components/login/LoginNavBar";
import LoginForm from "../components/login/LoginForm";
import Footer from "../components/Footer";
import RegisForm from "../components/login/RegisForm";

function Auth() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="min-h-screen flex flex-col">
      <LoginNavBar />
      {isLoginPage ? <LoginForm /> : <RegisForm />}
      <Footer />
    </div>
  );
}

export default Auth;
