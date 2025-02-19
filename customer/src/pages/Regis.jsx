import RegisForm from "../components/RegisForm";
import LoginNaBar from "../components/LoginNavBar";
import Footer from "../components/Footer";

function Regis() {
    return (
        <div>
            <LoginNaBar type='Đăng ký'></LoginNaBar>
            <RegisForm></RegisForm>
            <Footer></Footer>
        </div>
    );
    
}
export default Regis;