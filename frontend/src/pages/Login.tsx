import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"

type LoginProp = {
    email: string
    password: string
}

const Login = () => {
    const [loginForm, setLoginForm] = useState<LoginProp>({ email: "", password: "" })
    const [error, setError] = useState<string>("")

    const navigate = useNavigate()

    const login = async (email: string, password: string) => {
        try {
            await axios.post("http://localhost:5000/auth/login", {
                email,
                password
            }, {
                withCredentials: true
            })

            localStorage.setItem("isAuth", "true")

            navigate("/profile")
        } catch (e) {
            console.log(e)
            setError("Wrong email or password")
        }
    }

    return (
        <div className="form-container">
            <h2 className="form-title">Welcome back</h2>
            <p className="form-subtitle">Sign in to your account</p>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <label>Email</label>
                <input
                    placeholder="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <label>Password</label>
                <input type="password"
                    placeholder="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
            </div>

            <button
                onClick={() => login(loginForm.email, loginForm.password)}>
                Sign In
            </button>

            <div className="home-links">
                <Link to="/">Home</Link>
                <Link to="/register">Register</Link>
            </div>
            {error && <p className="error">{error}</p>}
        </div>
    )
}

export default Login
