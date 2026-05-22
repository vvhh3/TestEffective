import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome</h1>
      <p className="home-subtitle">Sign in or create an account</p>

      <div className="home-links">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  )
}
