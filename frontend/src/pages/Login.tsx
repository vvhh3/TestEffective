
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { useState } from "react";


const Login = () => {

    const [loginForm, setLoginForm] = useState({ email: "", password: "" })

    const navigate = useNavigate()


    const login = async (email: string, password: string) => {
        try {
            const res = await axios.post("http://localhost:5000/auth/login", {
                email: email,
                password: password
            }, {
                withCredentials: true 
            })
            console.log(`/dashboard/${res.data.user.role}`)
            navigate(`/dashboard/${res.data.user.role}`)
            console.log("login", res)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <div >
                <div >
                    <input type="email"
                        placeholder="email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}/>
                </div>
                {/* password */}
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
                    onClick={() => login(loginForm.email, loginForm.password)}>
                    Sign In
                </button>
            </div>


        </div>
    )
}

export default Login;
