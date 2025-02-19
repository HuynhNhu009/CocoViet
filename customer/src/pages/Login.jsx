import LoginNavBar from "../components/LoginNavBar";
import LoginForm from "../components/LoginForm";
import Footer from "../components/Footer";

function Login() {
  return (
    <div className="min-h-screen flex flex-col">
      <LoginNavBar />
      <LoginForm />
      <Footer />
    </div>
  );
}
export default Login;
