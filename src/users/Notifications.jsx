import { useEffect, useState } from "react"
import { Alert, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import MyNavbar from "../components/MyNavbar"
import HOST from "../Hosts"

function Noti(props){
    return (
        <div>
        <Link to={`/posts/${props.id}`} style={{ textDecoration: 'none' }}>

            <Alert 
                variant="success"
                style={{textDecoration:"none"}}>
                {props.noti}
            </Alert>
        </Link>

        </div>
    )
}

function Notifications(){
    const token = localStorage.getItem('token')
    const [noti, setNotis] = useState([])
    useEffect(()=>{
        fetch(`${HOST}/notifications/`,{
            method:"GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${token}`
            }
        })
        .then(resp => resp.json())
        .then(resp => setNotis(resp))
        .catch(error => console.log(error))
        },[])
    
        return (
            <MyNavbar>
                <Container>
                    {noti.map(e => <Noti noti={e.noti} id={e.post}/> )}
                </Container>
            </MyNavbar>
    )
}

export default Notifications