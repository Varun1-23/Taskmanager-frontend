import { Routes , Route, } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/dashboardPage';
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import HomePage from './pages/HomePage';

function App() {


  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
 
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path='/admin-login' element={<AdminLoginPage/>} />
      <Route path='/admin' element={<AdminDashboardPage/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/register' element={<RegisterPage/>} />
      <Route path='/dashboard' element={<DashboardPage/>} />
    </Routes>

    </>
  )
}

export default App
