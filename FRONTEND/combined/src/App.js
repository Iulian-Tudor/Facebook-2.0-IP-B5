
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import RegisterAccount from './components/Register/App';
import ForgotPass from './components/Forgot/forgotpass';
import NewPass from './components/Forgot/newpass';
import Verify from './components/Forgot/verify';
import Homepage from "./components/HomePage/App";
import MyProfile from './components/MyProfile/App';
import Profile from './components/Profile/App';
import ChatBox from './components/Message/ChatBox';
function App() {
  return (
    <Router> 
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route  path="/register" element={<RegisterAccount/>} />
        <Route path="/forgot" element={<ForgotPass/>} />
        <Route path="/verify" element={<Verify/>} />
        <Route path="/new" element={<NewPass/>} />
        <Route path="/home" element={<Homepage/>}/>
        <Route path="/myprofile" element={<MyProfile/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/mess" element={<ChatBox/>}/>

        </Routes>
   </Router>
  );
}

export default App;
