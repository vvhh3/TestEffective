import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"

type RegistryType = {
    email: string
    name: string
    lastName: string
    password: string
}

const Registry = () => {
    const [registryForm, setRegistryForm] = useState<RegistryType>({
        email: "",
        name: "",
        lastName: "",
        password: ""
    })
    const [error, setError] = useState<string>("")

    const navigate = useNavigate()

    const registry = async () => {
        try {
            await axios.post("http://localhost:5000/auth/register",
                {
                    email: registryForm.email,
                    name: registryForm.name,
                    lastName: registryForm.lastName,
                    password: registryForm.password
                }, {
                withCredentials: true
            })

            localStorage.setItem("isAuth", "true")

            navigate("/profile")
        } catch (e) {
            console.log(e)
            setError("Registration error")
        }
    }

    return (
        <div className="form-container">
            <h2 className="form-title">Create account</h2>
            <p className="form-subtitle">Fill in the details below</p>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <label>Email</label>
                <input
                    value={registryForm.email}
                    onChange={(e) => setRegistryForm({ ...registryForm, email: e.target.value })}
                    placeholder="email" />
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <label>First name</label>
                <input
                    value={registryForm.name}
                    onChange={(e) => setRegistryForm({ ...registryForm, name: e.target.value })}
                    placeholder="Matvei" />
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <label>Last name</label>
                <input
                    value={registryForm.lastName}
                    onChange={(e) => setRegistryForm({ ...registryForm, lastName: e.target.value })}
                    placeholder="Doe" />
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <label>Password</label>
                <input
                    value={registryForm.password}
                    onChange={(e) => setRegistryForm({ ...registryForm, password: e.target.value })}
                    placeholder="Create a strong password"
                    type="password" />
            </div>

            <button onClick={registry}>
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
