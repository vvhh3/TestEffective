
import { useNavigate } from "react-router-dom";

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

            const res = await axios.post("http://localhost:5000/auth/login", {
                login: login,
                password: password
            }, {
                withCredentials: true 
            })

            localStorage.setItem("isAuth", "true")

            navigate(`/profile`)
            console.log("login", res)
        } catch (e) {
            console.log(e)
            setError("Wrong login or password")
        }
    }

    return (
        <div>
            <div >
                <div >
                    <label>login</label>
                    <input
                        placeholder="login"
                        value={loginForm.login}
                        onChange={(e) => setLoginForm({ ...loginForm, login: e.target.value })}/>
                </div>

                <div >
                    <label >Password</label>
                    <input type="password"
                        placeholder="password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}  />
                </div>
            </div>

            <div >
                <button
                    onClick={() => login(loginForm.login, loginForm.password)}>
                    Sign In
                </button>
            </div>

            <div>
                <p>{error}</p>
            </div>
        </div>
    )
}

export default Login;
