import { 
    Button, 
    Container, 
    Form, 
    FormControl, 
    Nav, 
    Navbar,
    NavDropdown 
} from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from "react";
import HOST from "../Hosts";

// type Props = {
//     children: JSX.Element,
// }

const Item = (props) => {
    return(
        <div>
            <Nav.Link href={props.link}>{props.name}</Nav.Link>
        </div>
    )
}

const AddMenu = (props) => {
    return(
        <div>  
            <Navbar expand="lg">
                <Navbar.Collapse className="justify-content-end">
                    <Nav.Link href={props.postlink}>{props.post != "Followings" ? "Add "+props.post : ""  } </Nav.Link>
                    <Nav.Link href={props.link}>My {props.name}s</Nav.Link>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}


const UserMenu = () => {
    const [user, setUser] = useState([])
    const token = localStorage.getItem("token")

    useEffect(() => {
        fetch(`${HOST}/users/type/`,{
          method:"GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
          }
      })
      .then(resp => resp.json())
      .then(resp => setUser(resp))
      .catch(error => console.log(error))
      },[])

    console.log(user)

    return (
        <div>
        <Nav>
            <Nav.Link href="/view/followings">Follows</Nav.Link>
            <Nav.Link href="/view/question">Questions</Nav.Link>
            {user.entre || user.mentor ?  <Nav.Link href="/view/plan">Plans</Nav.Link>: ""}
            {user.entre || user.inv ?  <Nav.Link href="/view/investment">Investment</Nav.Link>: "" }
            {/* <Nav.Link href="/Products">Products</Nav.Link> */}
            <NavDropdown title={user.user} id="basic-nav-dropdown">
                {/* <NavDropdown.Item href="">Messages</NavDropdown.Item> */}
                <NavDropdown.Item href="/noti">Notifications</NavDropdown.Item>
                <NavDropdown.Item href="/following">Followings</NavDropdown.Item>
                
                <NavDropdown.Divider />

                <NavDropdown.Item href={`/user/${user.user}`}>View Profile</NavDropdown.Item>
                <NavDropdown.Item href={`/edit/${user.user}`}>Edit Profile</NavDropdown.Item>
                <NavDropdown.Divider />

                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
        </Nav>

        </div>
    )
}

const Menu = () => {
    return (
        <Nav>
            <Nav.Link href="/register">Register</Nav.Link>
        </Nav>
    )
}

const MyNavbar = (props) => {
    const token = localStorage.getItem("token")
      return(
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">Startup Overflow</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    {token==null ? <Menu/> : <UserMenu/> }
                </Navbar.Collapse>
            </Container>
            </Navbar>
            {props.children}
        </div>
    )
}

export {AddMenu, Item};
export default MyNavbar;