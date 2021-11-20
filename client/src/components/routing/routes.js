import { Login, Register, ResetPassword, ForgotPassword } from '../screens/auth';
import Home from '../screens/home/Home';


const routes = [{
    path: "login",
    element: <Login />
},
{
    path: "register",
    element: <Register />
},
{
    path: "resetPassword",
    element: <ResetPassword />
},
{
    path: "forgotPassword",
    element: <ForgotPassword />
},
{
    path: "/",
    element: <Home />
}];

export default routes;