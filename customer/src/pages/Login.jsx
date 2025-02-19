import LoginNavBar from "../components/LoginNavBar";
import LoginForm from "../components/LoginForm";
import Footer from "../components/Footer";

function Login() {
  return (
    <>
      <LoginNavBar></LoginNavBar>

      <LoginForm></LoginForm>
      <Footer></Footer>
    </>
    // <div className='w-full flex flex-col justify-between'>
    // </div>
  );
}
export default Login;
