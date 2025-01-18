import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate
} from 'react-router-dom'
import leetcodeLogo from './icons/leetcode.png'
import profileLogo from './icons/profile.png'
import './App.css'
import Dashboard from './dashboard/App'

function App() {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false)
  const navigate = useNavigate()


  const handleProfileClick = () => {
    if (isDashboardOpen) {
      navigate('/') 
    } else {
      navigate('/dashboard') 
    }
    setIsDashboardOpen(prev => !prev)
  }

  return (
    <div>
      {/* External link to LeetCode */}
      <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer">
        <img src={leetcodeLogo} className="logo leetcode-logo" alt="LeetCode logo" />
      </a>

      {/* Profile icon to toggle dashboard */}
      <img
        src={profileLogo}
        className="logo profile-logo"
        alt="Profile logo"
        onClick={handleProfileClick}
        style={{ cursor: 'pointer' }}
      />

      {/* Render routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}


function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Leetcode NOW</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Click on the LeetCode logo to learn more
      </p>
    </>
  )
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  )
}