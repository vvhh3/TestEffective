import { Link, useNavigate } from "react-router-dom"

import axios from "axios"
import { useState } from "react"

type RegistryType = {
    login: string
    name: string
    lastName: string
    password: string
}

const Registry = () => {

    const [refistryForm, setRegistryForm] = useState<RegistryType>({
        login: "",
        name: "",
        lastName: "",
        password: ""
    })
    const [error, setError] = useState<string>("")

    const navigate = useNavigate()
    const registry = async (
        login: string,
        name: string,
        lastName: string,
        password: string
    ) => {
        try {
            await axios.post("http://localhost:5000/auth/register",
                {
                    login: login,
                    name: name,
                    lastName: lastName,
                    password: password
                }, {
                withCredentials: true
            })

            localStorage.setItem("isAuth", "true")

            navigate(`/profile`)
        } catch (e) {
            console.log(e)
            setError("ошибка регистрации")
        }
    }

    return (
        <div className="form-container">
            <h2 className="form-title">Create account</h2>
            <p className="form-subtitle">Fill in the details below</p>


            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <label>login</label>
                <input
                    value={refistryForm.login}
                    onChange={(e) => setRegistryForm({ ...refistryForm, login: e.target.value })}
                    placeholder="login" />
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <label>First name</label>
                <input
                    value={refistryForm.name}
                    onChange={(e) => setRegistryForm({ ...refistryForm, name: e.target.value })}
                    placeholder="Matvei" />
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <label>Last name</label>
                <input
                    value={refistryForm.lastName}
                    onChange={(e) => setRegistryForm({ ...refistryForm, lastName: e.target.value })}
                    placeholder="Doe" />
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <label>Password</label>
                <input
                    value={refistryForm.password}
                    onChange={(e) => setRegistryForm({ ...refistryForm, password: e.target.value })}
                    placeholder="Create a strong password"
                    type="password" />
            </div>

            <button
                onClick={() => registry(
                    refistryForm.login,
                    refistryForm.name,
                    refistryForm.lastName,
                    refistryForm.password
                )}>
                Create Account
            </button>

            <div className="home-links">
                <Link to="/login">Login</Link>
                <Link to="/">Home</Link>
            </div>
            {error && <p className="error">{error}</p>}
        </div>
    )
}

export default Registry
