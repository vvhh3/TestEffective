
import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";

interface User {
  id: string;
  login: string;
  name: string;
  lastName: string;
  role: string;
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
              <span>Name</span>
              <span>{user.name}</span>
            </div>
            <div className="profile-info-item">
              <span>Last name</span>
              <span>{user.lastName}</span>
            </div>
            <div className="profile-info-item">
              <span>Login</span>
              <span>{user.login}</span>
            </div>
          </div>

          <button onClick={logout}>
            Logout
          </button>

          <div className="home-links" style={{marginTop:"20px"}}>
            <Link to="/profile/update">обновить свои данные</Link>
          </div>
        </>
      )}
    </div>
  )
}
