import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../services/api'

function AdminLoginPage() {

    const [formData , setFormData] = useState({email: '', password: ""})
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({... formData , [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await api.post('/admin/login' , formData , { withCredentials: true })
            console.log("Admin login response:", res);

            if(res.data.data.role === 'admin'){
                toast.success('Admin Logged in')
                navigate('/admin')
            }
            else{
                toast.error('Not an Admin user')
            }
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
            toast.error('Login failed')
        }
    }
  return (
   <div className="login-container">
      <div className="card custom-card">
      <h3 className="text-center mb-4 customtext-color ">Admin Login</h3>
        <form 
        onSubmit={handleSubmit}
        >
            <div className='mb-3'>
            <input 
            type="email"
            name='email'
            autoComplete="email"  
            onChange={handleChange}
            className='form-control '
            placeholder='Email'
            required
            />
            </div>
            
            <div className='mb-3'>
            <input 
            type="password"
            name='password'
            onChange={handleChange}
            className='form-control '
            placeholder='Password'
            autoComplete='current-password' 
            required
            />
            </div>
         <div className='text-center d-grid'>
          <button 
         className='btn btn-success '>
          Login
        </button>
         </div>
        </form>
    </div>
          </div>
  )
}

export default AdminLoginPage