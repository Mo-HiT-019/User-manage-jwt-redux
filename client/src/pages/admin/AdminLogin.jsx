import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css'
import { useDispatch,useSelector } from 'react-redux';
import { adminSigninStart,adminSigninSuccess,adminSigninFail } from '../../redux/admin/adminSlice';
import axiosInstance from '../../config';


const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate=useNavigate();

    const { loading, error } = useSelector((state) => state.user);


    const handleSubmit=async(e)=>{
      e.preventDefault();
      try{
        dispatch(adminSigninStart());
        const response = await axiosInstance.post('/auth/admin-sign-in', { email, password });
        const data=await response.data;
        console.log(data);

        if (data.success === false) {
          dispatch(adminSigninFail(data));
          return;
        }

      dispatch(adminSigninSuccess(data));
      console.log('Navigatinf');
      navigate('/admin-dash');
      }catch(error){
        dispatch(adminSigninFail(error));
      }
    }


   
  
    return ( 
      <div className="login-body">
        <div className="login-container">
          <h2>Admin Login</h2>

          <form onSubmit={handleSubmit}>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                class="form-control"
                value={email}
                placeholder="Enter email"
                onChange={(e)=>setEmail(e.target.value)}
              />

              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                value={password}
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
              />

               <button type="submit" class="btn btn-primary">
              Login
            </button>
      
            </div>
            
           
            
          </form>

          <p>
              Create an account 
              <Link to='/register'> Sign up</Link>
           </p>
          
        </div>
      </div>
    );
  };
  
  export default AdminLogin;