import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

type UpdateData = {
    name: string
    lastName: string
}

export default function ProfileUpdate() {
    const [error, setError] = useState("")
    const [updateForm, setUpdateForm] = useState<UpdateData>({
        name: "",
        lastName: ""
    })

    const navigate = useNavigate()

    const update = async () => {
        try {
            await axios.patch("http://localhost:5000/profile/update", {
                name: updateForm.name,
                lastName: updateForm.lastName
            }, {
                withCredentials: true
            })

            navigate("/profile")
        } catch (e) {
            console.log(e)
            setError("Wrong profile data")
        }
    }

    useEffect(() => {
        const init = async () => {
            const res = await axios.get("http://localhost:5000/auth/me", {
                withCredentials: true
            })

            setUpdateForm({
                name: res.data.user.name,
                lastName: res.data.user.lastName
            })
        }
        init()
    }, [])

    return (
        <div className="form-container">
            <h2 className="form-title">Update Data</h2>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <label>First name</label>
                <input
                    placeholder="name"
                    value={updateForm.name}
                    onChange={(e) => setUpdateForm({ ...updateForm, name: e.target.value })} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <label>Last name</label>
                <input
                    placeholder="lastName"
                    value={updateForm.lastName}
                    onChange={(e) => setUpdateForm({ ...updateForm, lastName: e.target.value })} />
            </div>

            <button onClick={update}>
                Update
            </button>

            <div className="home-links">
                <Link to="/profile">Profile</Link>
            </div>
            {error && <p className="error">{error}</p>}
        </div>
    )
}
