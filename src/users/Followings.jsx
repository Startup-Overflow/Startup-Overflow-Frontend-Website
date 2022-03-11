import { useEffect, useState } from "react"
import { Button, Card, Container } from "react-bootstrap"
import MyNavbar from "../components/MyNavbar"
import HOST from "../Hosts"

function Person(props){
    const [follow, following] = useState("Following")
    const followp = props.username
    const token = localStorage.getItem("token")
    const [redirect, setRedirect] = useState(false)

    const submit = async(e) => {
        e.preventDefault();
        console.log(followp)
        let method = "POST"
        if (follow=="Following") { method="DELETE" }
        
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
        following(follow=="Following" ? "Follow" : "Following" )
    }

    return(
        <div>
        <Card>
            <Card.Body>
            <Card.Title>{props.first_name} {props.last_name}</Card.Title>
            <div>

        <form onSubmit={submit}>
        <Button type="submit">{follow}</Button>
        </form>
        <Button style={{marginLeft: "60%" }} href={`/user/${props.username}`}>View Profile</Button>
            </div>
        </Card.Body>
        </Card>
    </div>
    )
}

function Following(props) {
    const token = localStorage.getItem("token")
    const [followings, setFollowings] = useState([])
    useEffect(()=>{
        fetch(`${HOST}/users/get/followings/`,{
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
              }        
        })
        .then(resp => resp.json())
        .then(resp => setFollowings(resp))
        .catch(error => console.log(error))
    },[])
    
    return (
        <MyNavbar>
            <Container>
            {followings.map(e=> 
            <Person 
                first_name={e.first_name} 
                last_name={e.last_name} 
                username={e.username}                 
            />)}
            </Container>
            
        </MyNavbar>
    )
}

export default Following