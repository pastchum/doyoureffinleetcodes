import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import leetcodeLogo from './icons/leetcode.png'
import profileLogo from './icons/profile.png'
import './App.css'
import Dashboard from './dashboard/App' // Import the Dashboard component

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div>
        <Link to="https://leetcode.com" target="_blank">
          <img src={leetcodeLogo} className="logo leetcode-logo" alt="LeetCode logo" />
        </Link>
        <Link to="/dashboard">
          <img src={profileLogo} className="logo profile-logo" alt="Profile logo" />
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<Home count={count} setCount={setCount} />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

function Home({ count, setCount }) {
  return (
    <>
      <h1>Leetcode NOW</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Click on the LeetCode logo to learn more
      </p>
    </>
  )
}

export default App