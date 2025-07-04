import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import '../App.css'

function AdminDashboardPage() {
    const navigate = useNavigate()
    const [users , setUsers] = useState([])

    const fetchUsers = async () => {
       try {
         const res = await api.get('/admin/users', { withCredentials: true})
          console.log('✅ Admin users fetched:', res.data.data.users);
         setUsers(res.data.data.users)
     }
       catch (error) {
         toast.error('failed to fetch the users')
       }
    }

    const handleLogout = async () => {
        try {
            await api.post('/admin/logout', {} , { withCredentials: true})
            toast.success('Log out success')
            navigate('/')
        } catch (error) {
            console.error(error);
            toast.error('logout failed')
        }
    }

    useEffect(() => {
        fetchUsers()
    } , [])


  return (
    <div className='container mt-5'>
        <h2 className='mb-4'> Admin Dashboard </h2>
    <table className='table table-striped table-bordered'>
        <thead className='table-dark'>
            <tr>
                <th>Username</th>
                <th>Email</th>
                <th>total</th>
            </tr>
        </thead>
        <tbody>
            {users.length > 0 ? (
                users.map(user => (
                    <tr key={user._id}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.taskCount}</td>
                    </tr>
                ))
            ): (
                <tr>
                    <td colSpan="3" className='text-center'>No Users Found</td>
                </tr>
            )}
        </tbody>
    </table>
    <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default AdminDashboardPage