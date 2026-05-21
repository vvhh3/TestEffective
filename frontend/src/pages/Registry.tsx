import { useNavigate } from "react-router-dom"

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

    const navigate = useNavigate()
    const registry = async (
        login: string,
        name: string,
        lastName: string,
        password: string
    ) => {
        try {
            const res = await axios.post("http://localhost:5000/auth/register",
                {
                    login: login,
                    name: name,
                    lastName: lastName,
                    password: password
                }, {
                withCredentials: true
            })

            navigate(`/dashboard/${res.data.user.role}`)
            console.log("res", res)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>

            <div>
                <label>login</label>
                <div >
                    <input
                        value={refistryForm.login}
                        onChange={(e) => setRegistryForm({ ...refistryForm, login: e.target.value })}
                        placeholder="login" />
                </div>
            </div>

            <div >
                <label>First name</label>
                <div>
                    <input
                        value={refistryForm.name}
                        onChange={(e) => setRegistryForm({ ...refistryForm, name: e.target.value })}
                        placeholder="Matvei" />
                </div>
            </div>

            <div>
                <label >Last name</label>
                <div>

                    <input
                        value={refistryForm.lastName}
                        onChange={(e) => setRegistryForm({ ...refistryForm, lastName: e.target.value })}
                        placeholder="Doe" />
                </div>
            </div>


            <div>
                <label>Password</label>
                <div>
                    <input
                        value={refistryForm.password}
                        onChange={(e) => setRegistryForm({ ...refistryForm, password: e.target.value })}
                        placeholder="Create a strong password"
                        type="password" />
                </div>
            </div>


            <div>
                <button
                    onClick={() => registry(
                        refistryForm.login,
                        refistryForm.name,
                        refistryForm.lastName,
                        refistryForm.password
                    )}>
                    Create Account
                </button>
            </div>
        </div>
    )
}

export default Registry
