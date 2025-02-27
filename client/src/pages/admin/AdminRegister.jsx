import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../config';

const AdminRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  
  const handleRegister = async (e) => {
    e.preventDefault();
    try{
      const response = await axiosInstance.post('/auth/admin-sign-up',{name,email,password,role:'admin'});
      console.log('Sign Up Success');
      alert('Signup Success');
      navigate('/admin-login');
    }catch(error){
      console.error('Error:',error.message);
      alert('Error in signup');
    }
    
  };

  return (
    <div class="login-body">
      <div class='login-container'>

      <h2>Admin Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
                  <div class="form-group">

                    <label for="exampleInputEmail1">User Name</label>
                    <input
                      type="text"
                      class="form-control"
                      value={name}
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter the name"
                      onChange={(e)=>setName(e.target.value)}
                    />
                    
                    <label for="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      class="form-control"
                      value={email}
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      onChange={(e)=>setEmail(e.target.value)}
                    />

                    
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      value={password}
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      onChange={(e)=>setPassword(e.target.value)}
                    />
                  </div>
                  <div class="form-group form-check">
                    
                  </div>
                  
                  <button type="submit" class="btn btn-primary">
                    Sign Up
                  </button>
                  
                    
                </form>
      <p>
        Already have an account? <Link to="/admin-login">Login</Link>
      </p>
      </div>
      
    </div>
  );
};

export default AdminRegister;