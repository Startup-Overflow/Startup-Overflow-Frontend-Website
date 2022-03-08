import { useEffect, useState } from "react"
import { Card, Container, Button, Navbar, Nav, Toast } from "react-bootstrap"
import { Navigate, useParams } from "react-router-dom"
import MyNavbar, { AddMenu, Item } from "../components/MyNavbar"
import HOST from "../Hosts"
import PostMenu from "./PostMenu"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import {CKEditor} from "@ckeditor/ckeditor5-react"

const Time = (date,time) =>{
    var date = new Date(date.toString()+"T"+time.toString()+"Z");
    return(date.toString().substring(0,21))
}

function Comment(props){
    return(
        <div>
            <Toast style={{ width: '100%', margin:'10px' }}>
            <Toast.Header>
                <strong className="me-auto">{props.username}</strong>
                <small>{Time(props.post_date, props.post_time)} </small>
            </Toast.Header>
            <Toast.Body>{props.comment}</Toast.Body>
            </Toast>
        </div>
    )
}

function ViewPost(props){
    const {id} = useParams()
    const [posts, setPost] = useState({})
    const token = localStorage.getItem("token")
    const [addComment, setComment] = useState()
    const [viewComment, setCommentView] = useState([])

    useEffect(()=>{
        fetch(`${HOST}/posts/view/${id}`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
            }
        }).then(resp => resp.json())
        .then(resp => setPost(resp[0]))
        .catch(error => console.log(error))
    },[])

    useEffect(()=>{
        fetch(`${HOST}/posts/commentview/${id}`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
            }
        }).then(resp => resp.json())
        .then(resp => setCommentView(resp))
        .catch(error => console.log(error))
    },[])

    const submit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${HOST}/posts/comment/`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Token ${token}`
            },
            body:JSON.stringify({
                addComment,
                id
            })
        })
        window.location.reload()
        e.target.reset();
    }

    const comment = posts.catagory=="articles"? "Comment" : posts.catagory=="question"? "Answer" :""
    
    console.log(comment)
    return(
        <MyNavbar>            
            <Navbar expand="lg">
                <Navbar.Collapse className="justify-content-end">
                    <Nav.Link href={"/add/"+posts.catagory}>Add {posts.catagory} </Nav.Link>
                </Navbar.Collapse>
            </Navbar>
        <Container>

        <Card.Body>
            <Card.Title style={{fontSize:"27px"}} >{posts.title}</Card.Title>
            <Card.Footer className="blockquote-footer" className="text-muted">
            Posted By: <cite title="Source Title"> <a href={`/user/${posts.username}`}> {posts.username} </a></cite>
            </Card.Footer>

            <Card.Header> {posts.short_desc} </Card.Header>
            <br/>
            <Card.Text><div dangerouslySetInnerHTML={{__html:posts.desc}}/> </Card.Text>

        </Card.Body>
        <Card.Text><Button>Upvote</Button> <Button style={{marginLeft:"80%"}}>Downvote</Button>  </Card.Text>
        <hr/>

{/* Comment or Answer or  */}
{viewComment.map(a=> <Comment username={a.username} comment={a.comment} post_date={a.post_date} post_time={a.post_time} />)}
        <form onSubmit={submit}>
        <Card.Title>{comment}s </Card.Title>
        <Card.Text>
            <textarea 
                className="form-control" 
                placeholder={`Enter your ${comment}...`} 
                name="comment" 
                rows="5"
                onChange={e => setComment(e.target.value)} />
        </Card.Text>
        <Navbar expand="lg">
            <Navbar.Collapse className="justify-content-end">
                <Button type="submit" >Submit</Button>
            </Navbar.Collapse>
        </Navbar>
        </form>

        </Container>
        </MyNavbar>

    )
}

export default ViewPost;
