import { SyntheticEvent, useState } from "react";
import { Container, Card } from "react-bootstrap";
import {Navigate} from 'react-router-dom';
import MyNavbar from "../components/MyNavbar";
import HOST from "../Hosts";

const Register = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [redirect, setRedirect] = useState(false)

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (password===confirm_password){
            const response = await fetch(`${HOST}/users/register/`,{
              method:"POST",
              headers: {"Content-Type": "application/json"},
              body:JSON.stringify({
                  first_name,
                  last_name,
                  email,
                  username,
                  password,
                  confirm_password
              })
          })
          setRedirect(true)
          const content = await response.json()
          console.log(content)
        }

    }

    if (redirect){
        return <Navigate to="/"/>
    }

    return (
    <MyNavbar>
        <Container>
            <Card>
        <form onSubmit={submit}>
            <input type="text" placeholder="First Name" className="form-control" name="first_name" onChange={e => setFirstName(e.target.value) } required />
            <input type="text" placeholder="Last Name" className="form-control" name="last_name" onChange={e => setLastName(e.target.value) } required/>
            <input type="email" placeholder="Email" className="form-control" name="email" onChange={e => setEmail(e.target.value) } required/>
            <input type="text" placeholder="Username" className="form-control" name="username" onChange={e => setUsername(e.target.value) } required/>
            <input type="password" placeholder="Password" className="form-control" name="password" onChange={e => setPassword(e.target.value) } required/>
            <input type="password" placeholder="Confirm Password" className="form-control" name="confirm_password" onChange={e => setConfirmPassword(e.target.value) } required/>
            <br/>
            <button className="btn btn-primary" type="submit">Submit</button>
        </form>
            </Card>
        </Container>
    </MyNavbar>
    )
}

export default Register;
