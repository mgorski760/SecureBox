import {Routes, Route} from 'react-router-dom'
import './App.css'
import Login from './pages/login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={<Register/>}/>
    </Routes>
  )
}

export default App
