
import { useEffect, useState } from "react"
import axios from "axios"

interface User {
  id: string;
  login: string;
  name: string;
  lastName: string;
  role: string;
}

export default function Profile() {

  const [user, setUser] = useState<User | null>()

    useEffect(() => {
    const init = async () => {

      if (localStorage.getItem("isAuth") === "true") {
        const res = await axios.get("http://localhost:5000/auth/me", {
          withCredentials: true
        })
        setUser(res.data.user)
        console.log("res", res)
      }

    }
    init()
  }, [])
  return (
    <div>Profile</div>
  )
}
