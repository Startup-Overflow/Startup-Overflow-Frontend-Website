import { useEffect, useState } from "react";
import { Button, Col, Row, Toast } from "react-bootstrap";
import MyNavbar from "../components/MyNavbar";
import HOST from "../Hosts";

function Profile(props){
        const [follow, following] = useState("Follow")
        const followp = props.username
        const token = localStorage.getItem("token")
        const [redirect, setRedirect] = useState(false)

        console.log(followp)
        const submit = async(e) => {
            e.preventDefault();
            console.log(followp)
            let method = "DELETE"
            if (follow=="Follow") { method="POST" }
            
            const response = await fetch(`${HOST}/users/follow/`,{
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                },
                body:JSON.stringify({
                    followp
                })
            })
            setRedirect(true)
            const content = await response.json()
            console.log(content)
            following(follow=="Follow" ? "Following" : "Follow" )
        }

        return(
        <div>
            <Toast>
            <Toast.Header closeButton={false}>
                <strong className="me-auto">{props.first_name} {props.last_name}</strong>
            </Toast.Header>
            <Toast.Body>
                <div>

            <form onSubmit={submit}>
            <Button type="submit">{follow}</Button>
            </form>
            <Button style={{marginLeft: "60%", marginTop:"-18%" }} href={`/user/${props.username}`}>View Profile</Button>
                </div>
            </Toast.Body>
            </Toast>
            <br/>
            <br/>
        </div>
    )
}

function Follow(){
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token")

    useEffect(()=>{
        fetch(`${HOST}/users/follow/`,{
            method:"GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${token}`
            }
        })
        .then(resp => resp.json())
        .then(resp => setUsers(resp))
        .catch(error => console.log(error))
        },[])
        console.log(users)

    return (
        <>
            <h3>Follow Peoples...</h3>
            {users.map(e => 
            <Profile 
                first_name={e.first_name} 
                last_name={e.last_name}
                username={e.username}
            />)}
        </>
    )
}

export default Follow;