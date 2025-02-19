
import LoginNavBar from '../components/LoginNavBar';
import LoginForm from '../components/LoginForm';
import Footer from '../components/Footer';

function Login () {
    return (
        <div className='w-full flex flex-col justify-between'>
            <LoginNavBar></LoginNavBar>
            <LoginForm></LoginForm>
            <Footer></Footer>
        </div>
    );
}
export default Login;