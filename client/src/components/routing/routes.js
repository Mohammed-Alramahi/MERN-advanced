import { Login, Register, ResetPassword, ForgotPassword } from '../screens/auth';
import Home from '../screens/home/Home';


const routes = [
    {
        path: "/register",
        component: Register
    },
    {
        path: "/resetPassword/:resettoken",
        component: ResetPassword
    },
    {
        path: "/forgotPassword",
        component: ForgotPassword
    },
];

export default routes;