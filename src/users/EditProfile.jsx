import { useState, useEffect, useRef } from "react"
import { Card, Container, Row, Col, Button } from "react-bootstrap"
import { Navigate, useParams } from "react-router-dom"
import MyNavbar from "../components/MyNavbar"
import Multiselect from "multiselect-react-dropdown";
import HOST from "../Hosts";
import UserDetails from "./Details";


const EditProfile = () => {
    const {name} = useParams()
    const [hashtag, setHashtag] = useState([]);
    const [tags, setTags] = useState([]);
    const token = localStorage.getItem("token")
    const [userdetails,setUserDetails] = useState([{}])
    const [redirect,setRedirect] = useState(false)

    const [fname, setFName] = useState("")
    const [lname, setLName] = useState("")
    const [bio, setBio] = useState("")
    const [hobbies, setHobbies] = useState([])
    const [skills, setSkills] = useState([])
    const [interests, setInterests] = useState([])
    const [mobile_no, setMobiNo] = useState("")

    const [entre, setEntre] = useState("")
    const [mentor, setMentor] = useState("")
    const [inv, setInv] = useState("")
    const [job, setJob] = useState("")
    
    useEffect(()=>{
        fetch(`${HOST}/users/in/${name}/`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        }).then(resp => resp.json())
        .then(resp => setUserDetails(resp))
        .then(err => console.log(err))
    },[])

    useEffect(() => {
        fetch(`${HOST}/hashtag/tag/`,{
          method:"GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
          }
      })
      .then(resp => resp.json())
      .then(resp => setHashtag(resp.map((tag)=>tag.name)))
      .catch(error => console.log(error))

    },[])
    

    const submit = async (e) => {
        e.preventDefault();

        console.log(
            fname,
            lname,
            bio,
            hobbies,
            skills,
            interests,
            entre,
            mentor,
            inv,
            job

        )
        const response = await fetch(`${HOST}/users/in/${name}/`,{
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body:JSON.stringify({
                fname,
                lname,
                bio,
                hobbies,
                skills,
                interests,
                mobile_no,
                entre,
                mentor,
                inv,
                job
    
            })
        })
          setRedirect(true)
          const content = await response.json()
          console.log(content)
        }

    if (redirect){
        return <Navigate to={`/user/${name}`}/>
    }


    return (
        <div>
            {console.log(userdetails)}
            <MyNavbar/>
            <Container>
            <Card>
            <Card.Body>
            <form onSubmit={submit}>
                <Row xs={1} sm={2} md={2} lg={2}>
                <Col xs={12} sm={12} md={6} lg={6} >
                <Card.Title>First Name </Card.Title>
                <Card.Text>
                    <input 
                        className="form-control" 
                        placeholder="First Name" 
                        name="fname" 
                        defaultValue={userdetails.first_name}
                        onChange={e => setFName(e.target.value)} 
                    />
                </Card.Text>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} >
                <Card.Title>Last Name</Card.Title>
                <Card.Text>
                    <input 
                        className="form-control" 
                        placeholder="Last Name" 
                        defaultValue={userdetails.last_name} 
                        name="lname" 
                        onChange={e => setLName(e.target.value)} 
                    />
                </Card.Text>
                </Col>
                </Row>
                <br/>
                <Card.Title>Bio </Card.Title>
                <Card.Text>
                    <textarea 
                        className="form-control" 
                        placeholder="Write something about yourself"
                        name="bio" 
                        defaultValue={userdetails.bio} 
                        rows="3"
                        onChange={e => setBio(e.target.value)} />
                </Card.Text>
                <br/>
                <Card.Title>Mobile No</Card.Title>
                <Card.Text>
                    <input 
                        className="form-control" 
                        placeholder="Mobile Number" 
                        defaultValue={userdetails.mobile_no} 
                        name="mobile_no" 
                        maxLength="10"
                        onChange={e => setMobiNo(e.target.value)} 
                    />
                </Card.Text>
                <br/>

                <Row xs={1} sm={2} md={3} lg={3}>
                    <Col>
                        <Card.Title>Hobbies </Card.Title>
                        <Multiselect
                            isObject={false}
                            onRemove={(event) => {
                                setHobbies(event);
                            }}
                            onSelect={(event) => {
                                setHobbies(event);
                            }}
                            options={hashtag}
                            name="hobbies" 
                            selectedValues={userdetails.hobbies}
                            showCheckbox
                        />    
                    </Col>
                    <Col>
                        <Card.Title>Interests </Card.Title>
                        <Multiselect
                            isObject={false}
                            onRemove={(event) => {
                                setInterests(event);
                            }}
                            onSelect={(event) => {
                                setInterests(event);
                            }}
                            options={hashtag}
                            name="interests" 
                            selectedValues={userdetails.interests}
                            showCheckbox
                        />    
                    </Col>
                    <Col>
                        <Card.Title>Skills </Card.Title>
                        <Multiselect
                            isObject={false}
                            onRemove={(event) => {
                                setSkills(event);
                                console.log(tags)
                            }}
                            onSelect={(event) => {
                                setSkills(event);
                                console.log(tags)
                            }}
                            options={hashtag}
                            name="skills" 
                            selectedValues={userdetails.skills}
                            showCheckbox
                        />    
                    </Col>
                </Row>
                <br/>
                <Card.Text className="text-end">Your Hobby/Skill/Interest not In list. Add it from here...</Card.Text>
                <br/>
                <Card.Title>Set Profile as : </Card.Title>
                <Card.Text>
                    <div className="form-check form-switch">
                    <input 
                        className="form-check-input" 
                        type="checkbox" 
                        value="true"
                        name="entre"
                        defaultChecked={userdetails.entre}
                        onChange={e => setEntre(e.target.value)} />

                    <label className="form-check-label" >
                        Entreprenur
                    </label>
                    </div>
                </Card.Text>

                <Card.Text>
                    <div className="form-check form-switch">
                    <input 
                        className="form-check-input" 
                        type="checkbox" 
                        value="true"
                        defaultChecked={userdetails.mentor}
                        onChange={e => setMentor(e.target.value)}/>
                    <label className="form-check-label">
                        Mentor
                    </label>
                    </div>
                </Card.Text>

                <Card.Text>
                    <div className="form-check form-switch">
                    <input 
                        className="form-check-input" 
                        type="checkbox" 
                        value="true" 
                        defaultChecked={userdetails.inv}
                        onChange={e => setInv(e.target.value)}/>
                    <label className="form-check-label">
                        Investor
                    </label>
                    </div>
                </Card.Text>

                <Card.Text>
                    <div className="form-check form-switch">
                    <input 
                        className="form-check-input" 
                        type="checkbox" 
                        defaultChecked={userdetails.job}
                        value="true" 
                        onChange={e => setJob(e.target.value)}/>
                    <label className="form-check-label">
                        Job Seeker
                    </label>
                    </div>
                </Card.Text>


                <Button type="submit">Submit</Button>
            </form>

            </Card.Body>
            </Card>

            </Container>
        </div>
    )
}

export default EditProfile