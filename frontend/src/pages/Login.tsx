
import { useNavigate,Link } from "react-router-dom";

import axios from "axios";

import { useState } from "react";

type LoginProp = {
    login: string
    password: string
}

const Login = () => {

    const [loginForm, setLoginForm] = useState<LoginProp>({ login: "", password: "" })
    const [error, setError] = useState<string>("")

    const navigate = useNavigate()

    const login = async (login: string, password: string) => {
        try {

            await axios.post("http://localhost:5000/auth/login", {
                login: login,
                password: password
            }, {
                withCredentials: true
            })

            localStorage.setItem("isAuth", "true")

            navigate(`/profile`)
        } catch (e) {
            console.log(e)
            setError("Wrong login or password")
        }
    }

    return (
        <div className="form-container">
            <h2 className="form-title">Welcome back</h2>
            <p className="form-subtitle">Sign in to your account</p>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <label>login</label>
                <input
                    placeholder="login"
                    value={loginForm.login}
                    onChange={(e) => setLoginForm({ ...loginForm, login: e.target.value })} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <label>Password</label>
                <input type="password"
                    placeholder="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
            </div>

            <button
                onClick={() => login(loginForm.login, loginForm.password)}>
                Sign In
            </button>

            <div className="home-links">
                <Link to="/Home">Home</Link>
                <Link to="/register">Register</Link>
            </div>
            {error && <p className="error">{error}</p>}
        </div>
    )
}

export default Login;
