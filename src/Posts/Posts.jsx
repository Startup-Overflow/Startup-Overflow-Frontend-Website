import { useEffect, useState } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Navigate, useParams } from 'react-router-dom';
import MyNavbar, { AddMenu, Item } from '../components/MyNavbar';
import HOST from '../Hosts';
import Follow from '../users/Follow';
import Login from '../users/Login';
import PostMenu from './PostMenu';

function Post(props){
  return(
    <div>
      <Card className='card'>
      <Card.Body>
      <Row xs={1} sm={2} md={2} lg={2}>
        <Col xs={12} sm={12} md={4} lg={4} >
        {/* //  style={{ width: '18rem' }}> */}
          <Card.Img variant="top" src={props.attachment}/>
          {console.log(props.attachment)}
        </Col>
        <Col xs={12} sm={12} md={8} lg={8}>
          <Card.Title><a href={"/posts/"+props.id}>{props.title}</a></Card.Title>
          <Card.Text>
            {props.desc}
          </Card.Text>
          
          {props.tags.map((value, index) => {
            return <Button style={{margin:'5px'}} variant="secondary">{value}</Button>
          })}

        </Col>
        </Row>
      </Card.Body>
      </Card>
    </div>
  )
}

function MyPosts(props){
  const [posts, setPosts] = useState([])
  const [tagPosts, setTagPosts] = useState([])
  const {id} = useParams()
  const token = localStorage.getItem("token")

  useEffect(() => {
    fetch('http://127.0.0.1:8000/posts/',{
      method:"GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      }
  })
  .then(resp => resp.json())
  .then(resp => setPosts(resp))
  .catch(error => console.log(error))
  },[])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/posts/tag/'+id,{
      method:"GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      }
  })
  .then(resp => resp.json())
  .then(resp => setTagPosts(resp))
  .catch(error => console.log(error))
  },[])


  console.log(posts==0)
  console.log(tagPosts)

  return (
    <Container>
      {(tagPosts==0 && id!="followings") ? <h4>No {id.charAt(0).toUpperCase()+id.slice(1)} Found. </h4> : tagPosts.map(post=><Post key={post.id} id={post.id} title={post.title} desc={post.short_desc} attachment={HOST+post.attachment} tags={post.hashtag}/>)}
      {id=="followings"? posts.map(post=><Post key={post.id} id={post.id} title={post.title} desc={post.short_desc} attachment={HOST+post.attachment} tags={post.hashtag}/>) : ""}
    </Container>
  );
}



function Posts(props) {
  const token = localStorage.getItem("token")
  console.log(token)
  localStorage.setItem("Connect","Yes")
  const {id} = useParams()

  return(
      <div>
        <MyNavbar>
        <AddMenu postlink={`/add/${id}`} post={id.charAt(0).toUpperCase()+id.slice(1)} />
          
        <Row>
          <Col xs={12} sm={8} md={8} lg={8}>
          {localStorage.getItem("token")==null? localStorage.getItem("Connect")!="Yes"? <Navigate to="/"/> : window.setTimeout(()=>{window.location.reload()}): <MyPosts name={props.name}/>}
          </Col>
          <Col xs={12} sm={4} md={4} lg={4}>
          <Follow/>
          </Col>
          
        </Row>
        
        </MyNavbar>
      </div>
  )
}

export default Posts;