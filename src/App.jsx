import { useState } from 'react'
import leetcodeLogo from './icons/leetcode.png'
import profileLogo from './icons/profile.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://leetcode.com" target="_blank">
          <img src={leetcodeLogo} className="logo" alt="LeetCode logo" />
        </a>
      <a href="/dashboard" target="_self">
        <img src={profileLogo} className="logo" alt="Profile logo" />
      </a>
      </div>
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