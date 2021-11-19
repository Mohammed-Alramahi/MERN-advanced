import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login, Register, ResetPassword, ForgotPassword } from './components/screens/auth';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="resetpassword" element={<ResetPassword />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
