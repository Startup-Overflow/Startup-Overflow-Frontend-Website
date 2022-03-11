import Register from './users/Register'
import Login from './users/Login'
import { Route, Routes } from 'react-router-dom';
import {CookiesProvider} from 'react-cookie';
import Posts from './Posts/Posts';
import Hashtag from './Hashtag/Hashtag';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logout from './users/Logout';
import AddPost from './Posts/AddPosts';
import Tags from './Hashtag/Tags';
import ViewPost from './Posts/ViewPost';
import UserDetails from './users/Details';
import EditProfile from './users/EditProfile';
import Follow from './users/Follow';
import Following from './users/Followings';
import MyPost from './Posts/MyPost';
import Notifications from './users/Notifications'

function App() {
  return (
    <CookiesProvider>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/user/:name" element={<UserDetails/>} />
        <Route path="/edit/:name" element={<EditProfile/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/hashtag" element={<Hashtag/>} />
        <Route path="/view/:id" element={<Posts/>} />
        <Route path="/my/:id" element={<MyPost/>} />
        <Route path="/add/:catagory" element={<AddPost/>} />
        <Route path="/posts/:id" element={<ViewPost/>} />
        <Route path="/follow" element={<Follow/>} />
        <Route path="/following" element={<Following/>} />
        <Route path="/noti" element={<Notifications/>} />
      </Routes>
    </CookiesProvider>
  );
}

export default App;
