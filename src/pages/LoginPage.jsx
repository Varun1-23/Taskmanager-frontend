import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import { toast } from 'react-toastify'
import '../App.css'

function LoginPage() {
  const [formData , setFormData] = useState({email: '', password: ''})
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/auth/login', formData)
      toast.success('logged in successfully')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error?.response?.data?.message || 'login Failed')
    }
  }
  return (
    <div className="login-container">
      <div className="card login-card">
      <h3 className="text-center mb-4 customtext-color ">User Login</h3>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
        
        <input 
        name="email" 
        type='email' 
        onChange={handleChange} 
        className='form-control' 
        placeholder='Email'
        required
        />
        </div>
        <div className='mb-3'>
        
         <input 
         type="password" 
         name='password' 
         onChange={handleChange} 
         className='form-control my-2' 
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
      <p className='text-center mt-3'>
        Don't have an account?{' '}
        <Link to="/register" className='text-decoration-none text-primary fw-semibold'>
        Register
        </Link>
      </p>
      </div>
    </div>
  )
}

export default LoginPage