import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import './home.css'
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../redux/user/userSlice';
import axiosInstance from '../../config';



const Home = () => {
   
    const{currentUser,loading,error}=useSelector((state)=>state.user)
    console.log(currentUser);
    const dispatch=useDispatch();
    const navigate=useNavigate()
    
      const handleSignout = async () => {
        try {
          await axiosInstance.get('/auth/signout');
          
          dispatch(signOut())
          navigate('/login');
          
        } catch (error) {
          console.log(error);
        }
      };

      function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null; // Return null if the cookie is not found
      }
      
      // Usage
      const accessToken = getCookie('accessToken');
      console.log('Access Token:', accessToken);
      
    
   
    return (
      <div className='home-page'>
        <div className="home-container">

        <h1>Welcome,{currentUser?.name || 'user'}!</h1>
        <nav>
          <Link to="/profile">Go to Profile</Link>
          <button onClick={handleSignout}>Logout</button>
        </nav>
        </div>
        
      </div>
    );
  };
  
  export default Home;