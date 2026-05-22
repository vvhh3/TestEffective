import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

interface User {
  id: string
  email: string
  name: string
  lastName: string
  role: string
  isActive?: boolean
}

interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
}

interface Order {
  id: number
  quantity: number
  status: string
  total: number
  userId: number
  userEmail: string
  productName: string
}

export default function Profile() {
  const [user, setUser] = useState<User | null>()
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [dataError, setDataError] = useState("")
  const navigate = useNavigate()

  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/auth/logout", {}, {
        withCredentials: true
      })
      navigate("/")
    } catch (e) {
      console.log(e)
      navigate("/")
    }
  }

  const deleteAccount = async () => {
    try {
      await axios.delete("http://localhost:5000/profile", {
        withCredentials: true
      })

      navigate("/")
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const init = async () => {
      try {
        const meRes = await axios.get("http://localhost:5000/auth/me", {
          withCredentials: true
        })
        const currentUser = meRes.data.user

        setUser(currentUser)

        if (currentUser.role === "user") {
          return
        }

        const productsRes = await axios.get("http://localhost:5000/products", {
          withCredentials: true
        })
        const ordersRes = await axios.get("http://localhost:5000/orders", {
          withCredentials: true
        })

        setProducts(productsRes.data.products)
        setOrders(ordersRes.data.orders)

        if (currentUser.role === "admin") {
          const usersRes = await axios.get("http://localhost:5000/users", {
            withCredentials: true
          })

          setUsers(usersRes.data.users)
        }
      } catch (e) {
        console.log(e)
        setDataError("not load role data")
      }
    }
    init()
  }, [])

  return (
    <div className="profile-card">
      {!user ? (
        <p className="profile-loading">Loading...</p>
      ) : (
        <>
          <p className="profile-role">{user.role}</p>

          <div className="profile-info">
            <div className="profile-info-item">
              <span>role</span>
              <span>{user.role}</span>
            </div>
            <div className="profile-info-item">
              <span>First name</span>
              <span>{user.name}</span>
            </div>
            <div className="profile-info-item">
              <span>Last name</span>
              <span>{user.lastName}</span>
            </div>
            <div className="profile-info-item">
              <span>Email</span>
              <span>{user.email}</span>
            </div>
          </div>

          <button onClick={logout}>
            Logout
          </button>

          <button onClick={deleteAccount}>
            Delete account
          </button>

          <div className="home-links" style={{ marginTop: "20px" }}>
            <Link to="/profile/update">Update profile</Link>
          </div>

          {dataError && <p className="error">{dataError}</p>}

          {(user.role === "manager" || user.role === "admin") && (
            <div className="role-data">
              <section>
                <div className="role-data-header">
                  <h2>Products</h2>
                </div>

                <div className="data-list">
                  {products.map((product) => (
                    <article className="data-item" key={product.id}>
                      <div>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                      </div>
                      <div className="data-meta">
                        <span>${product.price}</span>
                        <span>Stock: {product.stock}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section>
                <div className="role-data-header">
                  <h2>Orders</h2>
                </div>

                <div className="data-list">
                  {orders.map((order) => (
                    <article className="data-item" key={order.id}>
                      <div>
                        <h3>{order.productName}</h3>
                        <p>{order.userEmail} - Status: {order.status}</p>
                      </div>
                      <div className="data-meta">
                        <span>${order.total}</span>
                        <span>Qty: {order.quantity}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          )}

          {user.role === "admin" && (
            <section className="admin-users">
              <div className="role-data-header">
                <h2>Users</h2>
              </div>

              <div className="data-list">
                {users.map((item) => (
                  <article className="data-item" key={item.id}>
                    <div>
                      <h3>{item.email}</h3>
                      <p>{item.name} {item.lastName}</p>
                    </div>
                    <div className="data-meta">
                      <span>{item.role}</span>
                      <span>{item.isActive ? "active" : "deleted"}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}
