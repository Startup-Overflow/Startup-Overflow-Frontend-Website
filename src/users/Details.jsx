import { useEffect, useState } from "react"
import { Button, Card, Container, ListGroup, Row, Col } from "react-bootstrap"
import { useParams } from "react-router-dom"
import MyNavbar from "../components/MyNavbar"
import HOST from "../Hosts"

function UserDetails(){
    const {name} = useParams()
    const [userdetails,setUserDetails] = useState([{}])
    const token = localStorage.getItem("token")
    const [follow, following] = useState("")

    useEffect(()=>{
        fetch(`${HOST}/users/in/${name}/`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        }).then(resp => resp.json())
        .then(resp =>{
            setUserDetails(resp)
            following(resp.follow)
        })
        .then(err => console.log(err))

    },[])


    const followp = name
    const [redirect, setRedirect] = useState(false)

    console.log(followp)
    const submit = async(e) => {
        e.preventDefault();
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
            <MyNavbar/>
            <Container>
            <Card>
            <Card.Header>Profile</Card.Header>
            <Card.Body className="text-center">
                <Card.Title>{ userdetails.name } </Card.Title>
                <Card.Text>{ userdetails.bio }</Card.Text>
            
            <Row xs={1} sm={1} md={2} lg={2}>
                <Col>
                <ListGroup.Item>
                    Contact Number: 
                    {userdetails.mobile_no}
                </ListGroup.Item>
                </Col>
                
                <Col>
                {console.log(userdetails)}
                <ListGroup.Item>
                    Using as: 
                    {userdetails.entre ? "Entreprenur, " : "" }
                    {userdetails.mentor ? "Mentor, " : "" }
                    {userdetails.job ? "Job Seaker, " : "" }
                    {userdetails.inv ? "Investor, " : "" }
                </ListGroup.Item>
                </Col>
                <form onSubmit={submit}>
                    {follow=="Edit Profile" 
                    ? <Button href={`/edit/${userdetails.username}`} type="submit">{follow}</Button>
                    : <Button type="submit">{follow}</Button>}
                </form>

            </Row>
        

            </Card.Body>

            {/* <Card.Footer className="text-right" className="text-end">
                <Button href={`/edit/${name}`} variant="warning">Edit Profile</Button>
            </Card.Footer> */}
            </Card>
            </Container>
            {/* {userdetails.user.first_name} */}
        </div>
    )
}

export default UserDetails