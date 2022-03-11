import { Tag } from "@mui/icons-material";
import { Hash } from "crypto";
import { useEffect, useState, SyntheticEvent } from "react";
import { Navigate, useParams } from "react-router-dom";
import MyNavbar from "../components/MyNavbar";
import Hashtag from "../Hashtag/Hashtag";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import {CKEditor} from "@ckeditor/ckeditor5-react"
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Card, Container, Button, Navbar, Nav } from "react-bootstrap";
import PostMenu from "./PostMenu";
import HOST from "../Hosts";
import Multiselect from "multiselect-react-dropdown";


function AddPost(props){

    const [title, setTitle] = useState('');
    const [shrtdesc, setShrtDesc] = useState('');
    const [desc, setDesc] = useState('')
    const [hashtag, setHash] = useState('');
    const [redirect, setRedirect] = useState(false)
    const [hashtags, setHashtags] = useState([])
    const token = localStorage.getItem("token")
    const {catagory} = useParams()
    const [cover, setCever] = useState("")

    useEffect(() => {
        fetch(`${HOST}/hashtag/tag/`,{
          method:"GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
          }
      })
      .then(resp => resp.json())
      .then(resp => setHashtags(resp.map((tag)=>tag.name)))
      .catch(error => console.log(error))
    },[])

    const submit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${HOST}/posts/`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body:JSON.stringify({
                title,
                shrtdesc,
                desc,
                catagory,
                hashtag,

            })
        })
        setRedirect(true)
        const content = await response.json()
        console.log(content)
    }
    if (redirect){
        return <Navigate to={`/view/${catagory}`}/>
    }

    return (
    <MyNavbar>
        <Container>
            <Card>
            <Card.Body>
            <form onSubmit={submit}>
                <Card.Title>Enter Your {catagory} Title</Card.Title>
                <Card.Text><input className="form-control" placeholder="Title" name="title" onChange={e => setTitle(e.target.value) } /></Card.Text>
                <Card.Title>A Short Description of Your {catagory} </Card.Title>
                <Card.Text><input className="form-control" placeholder="Short Description" name="shrtdesc" onChange={e => setShrtDesc(e.target.value) }/></Card.Text>
                
                <Card.Title>Add Image </Card.Title>
                <Card.Text><input type="file" name="uploadData" className="form-control" onChange={e => setCever(e.target.files[0]) }/></Card.Text>
                
                <Card.Title>Write Details of Your {catagory}</Card.Title>
                <Card.Text>
                    <CKEditor
                    editor={ClassicEditor}
                    data={desc}
                    onChange={(event, editor) => {
                        const data = editor.getData()
                        setDesc(data)
                    }}
                    />
                </Card.Text>
                <Card.Title>Hashtags of your {catagory}:</Card.Title>
                <Multiselect
                            isObject={false}
                            onRemove={(event) => {
                                setHash(event);
                            }}
                            onSelect={(event) => {
                                setHash(event);
                            }}
                            options={hashtags}
                            name="hashtag" 
                            // selectedValues={hashtags}
                            showCheckbox
                        />    

                <Navbar expand="lg">
                    <Navbar.Collapse className="justify-content-end">
                        <Button style={{margin:'25px'}} variant="primary" type="submit">Submit</Button>
                    </Navbar.Collapse>
                </Navbar>

            </form>
            </Card.Body>
            </Card>
        </Container>
    </MyNavbar>
    )
}

export default AddPost;