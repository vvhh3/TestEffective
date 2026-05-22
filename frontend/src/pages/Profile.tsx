import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

interface User {
  id: string
  email: string
  name: string
  lastName: string
  role: string
}

export default function Profile() {
  const [user, setUser] = useState<User | null>()
  const navigate = useNavigate()

  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/auth/logout", {}, {
        withCredentials: true
      })

      localStorage.removeItem("isAuth")
      navigate("/")
    } catch (e) {
      console.log(e)
      localStorage.removeItem("isAuth")
      navigate("/")
    }
  }

  const deleteAccount = async () => {
    try {
      await axios.delete("http://localhost:5000/profile", {
        withCredentials: true
      })

      localStorage.removeItem("isAuth")
      navigate("/")
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const init = async () => {
      const res = await axios.get("http://localhost:5000/auth/me", {
        withCredentials: true
      })
      setUser(res.data.user)
    }
    init()
  }, [])

  return (
    <div className="profile-card">
      {!user ? (
        <p className="profile-loading">Loading...</p>
      ) : (
        <>
          <p className="profile-role">{user.role}</p>

          <div className="profile-info">
            <div className="profile-info-item">
              <span>role</span>
              <span>{user.role}</span>
            </div>
            <div className="profile-info-item">
              <span>First name</span>
              <span>{user.name}</span>
            </div>
            <div className="profile-info-item">
              <span>Last name</span>
              <span>{user.lastName}</span>
            </div>
            <div className="profile-info-item">
              <span>Email</span>
              <span>{user.email}</span>
            </div>
          </div>

          <button onClick={logout}>
            Logout
          </button>

          <button onClick={deleteAccount}>
            Delete account
          </button>

          <div className="home-links" style={{ marginTop: "20px" }}>
            <Link to="/profile/update">Update profile</Link>
          </div>
        </>
      )}
    </div>
  )
}
