import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../services/api'

function RegisterPage() {

const [formData , setFormData] = useState({username: "", email: "", password: ""})
const navigate = useNavigate()

const handleChange = (e) => {
  setFormData({...formData, [e.target.name]: e.target.value})
}

const handleSubmit = async (e) =>{
  e.preventDefault()
  try {
    const res = await api.post('/auth/register', formData)
    console.log(res);
    toast.success("Registered successfully")
    navigate('/login')
  } catch (error) {
    toast.error(error?.response?.data?.message || "Registration failed")
    console.error(error);
    
  }
}

  return (
    <div className='login-container'>
      <div className="card custom-card">
      <h2 className="text-center mb-4 customtext-color ">Register Page</h2>
      <form 
      onSubmit={handleSubmit}
      >
      <div className='mb-3'>  
      <input 
      type="text" 
      name='username' 
      onChange={handleChange} 
      className='form-control ' 
      placeholder='Username'
      />
      </div>
      <div className='mb-3'>  
      <input 
      type="email" 
      name='email' 
      onChange={handleChange} 
      className='form-control ' 
      placeholder='Email'
      />
      </div>
      
      <div className='mb-3'>  
      <input 
      type="password" 
      name='password' 
      onChange={handleChange} 
      className='form-control mb-4' 
      placeholder='Password'
      />
      </div>
      <div className='text-center d-grid  '>
          <button 
         className='btn btn-success '>
          Register
        </button>
      </div>
         
      </form>
      </div>
    </div>
  )
}

export default RegisterPage