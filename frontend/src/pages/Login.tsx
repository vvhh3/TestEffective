
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { useState } from "react";

type LoginProp = {
    login: string
    password: string
}

const Login = () => {

    const [loginForm, setLoginForm] = useState<LoginProp>({ login: "", password: "" })

    const navigate = useNavigate()


    const login = async (login: string, password: string) => {
        try {

            const res = await axios.post("http://localhost:5000/auth/login", {
                login: login,
                password: password
            }, {
                withCredentials: true 
            })

            navigate(`/profile/${res.data.user.role}`)
            console.log("login", res)
        } catch (e) {
            console.log(e)
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


        </div>
    )
}

export default Login;
