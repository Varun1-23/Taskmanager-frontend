import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../services/api'

function DashboardPage() {

  const [tasks , setTasks] = useState([])
  const [filterStatus , setFilterStatus] = useState('all')
  const [form , setForm] = useState({ title: "", description: "", status: "pending" })
  const [editId , seteditId] = useState(null)
  const navigate = useNavigate()

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks/mytasks' , { withCredentials: true })
      console.log("Fetched tasks from backend:", res.data.tasks); 
      setTasks(res.data.data.tasks)
    } catch (error) {
      console.error(error);
      toast.error('session expired, please login again')
      navigate('/')
    }
  }

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Submitting form:", form);
    try {
      if(editId){
        await api.put(`/tasks/${editId}`, form , { withCredentials: true})
        toast.success('Task Updated')
      }else{
        await api.post('/tasks/create' , form , { withCredentials: true})
        toast.success('Task Created')
      }
      setForm({ title: "" , description: "" , status: "pending"})
      seteditId(null)
      fetchTasks()
    } catch (error) {
      toast.error("error saving task")
    }
  }

  const handleEdit = (task) => {
    console.log("Editing task:", task); 
    setForm(
      { 
        title: task.title ,
        description: task.description || "" ,
        status: task.status
      }
    )
    seteditId(task._id)
  }

  const handleDelete = async (id) => {
    // console.log("Deleting task with ID:", id); 
    try {
      await api.delete(`/tasks/${id}`, { withCredentials: true })
      toast.success('Task Deleted')
      fetchTasks()
    } catch (error) {
      toast.error("failed to delete")
    }
  }

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout', {} , { withCredentials: true} )
      toast.success("Logged out successfully")
      navigate('/')
    } catch (error) {
      console.error(error);
      toast.error("Logout Failed")
    }
  }

  useEffect(() => {
    fetchTasks()
  } , [])

  return (
    <div className='container mt-5'>
      <div className="text-end mb-3">
          <button onClick={handleLogout} className='btn btn-danger'>Logout</button>
        </div>
      <div className='custom-top'>
      <h2 className="text-start mb-4 customtext-color">Your Tasks</h2>
        </div>
    <div className="row">
    { /*Left side - task form */}
    <div className='col-md-5 mb-4'>
    <form onSubmit={handleSubmit}  className="task-form">
     
        <input 
        type="text"
        name='title'
        value={form.title}
        onChange={handleChange}
        placeholder='Task Title'
        className='form-control mb-3'
        required
        />
       
        <input 
        type="text"
        name='description'
        value={form.description}
        onChange={handleChange}
        placeholder='Task Description'
        className='form-control mb-3'
        />
    
        <select name="status" value={form.status} onChange={handleChange} className='form-select mb-3'>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      
      <button type='submit' className='btn btn-success w-100'>
        {editId ? "Update Task" : "Add Task"}
      </button>
    </form>
    </div>

   { /* Right Column - task list */}
      <div className='col-md-7 task-list-section'>
      {Array.isArray(tasks) && tasks.length > 0 ? 
       (
        <ul className='list-group'>
          <div className='d-flex justify-content-end mb-3'>
          <select 
          className='form-select w-auto'
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          </div>
          {tasks
          .filter(task => filterStatus === "all" || task.status === filterStatus)
          .map((task) => (
              <li key={task._id} className='card shadow-sm mb-3 p-3 d-flex flex-row justify-content-between align-items-center'>
                <div>
                <h5>{task.title}</h5>
                 {task.description && <p className="mb-1 text-muted">{task.description}</p>}
                <span className={`badge ${task.status === "completed" ? 'bg-success' : 'bg-warning'}`}>{task.status}</span>
                </div>
                <div>
                  <button onClick={() => handleEdit(task)} className="btn btn-sm btn-secondary me-2">Edit</button>
                  <button onClick={() => handleDelete(task._id)} className='btn btn-sm btn-danger'>Delete</button>
                </div>
              </li>
          ))}
        </ul>
      ) : (
        <p>No Tasks yet</p>
      )}
       </div>
      </div>
      </div>
  )
}

export default DashboardPage