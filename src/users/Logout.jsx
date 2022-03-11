import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import MyNavbar from "../components/MyNavbar"
import HOST from "../Hosts"


const Logout = () => {
    const token = localStorage.getItem('token')
    useEffect(() => {
        fetch(`${HOST}/users/logout/`,{
          method:"DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
          }
      })
      .then(resp => resp.json())
      .then(resp => console.log(resp))
    })
    localStorage.removeItem('token')

    return(
        <div>
            <MyNavbar>
                <h3>Logout Successfully</h3>
            </MyNavbar>
            <Navigate to="/"/>
        </div>
    )
}

export default Logout;