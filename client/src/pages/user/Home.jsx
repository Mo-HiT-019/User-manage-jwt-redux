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