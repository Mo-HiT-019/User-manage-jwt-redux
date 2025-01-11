import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../config';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender,setGender] = useState('')
  const [city,setCity]=useState('')
  const [state,setState]=useState('')
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  
  const handleRegister = async (e) => {
    e.preventDefault();
    try{
      const response = await axiosInstance.post('/auth/sign-up',{name,email,password,gender,city,state});
      console.log('Sign Up Success');
      alert('Signup Success');
      navigate('/login');
    }catch(error){
      console.error('Error:',error.message);
      alert('Error in signup');
    }
    
  };

  return (
    <div class="login-body">
      <div class='login-container'>

      <h2>Sign Up</h2>
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

                    <label for="exampleInputEmail1">Gender</label>
                    <input
                      type="text"
                      class="form-control"
                      value={gender}
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter gender"
                      onChange={(e)=>setGender(e.target.value)}
                    />

                    <label for="exampleInputEmail1">City</label>
                    <input
                      type="text"
                      class="form-control"
                      value={city}
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter city"
                      onChange={(e)=>setCity(e.target.value)}
                    />

                    <label for="exampleInputEmail1">State</label>
                    <input
                      type="text"
                      class="form-control"
                      value={state}
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter your state
                       "
                      onChange={(e)=>setState(e.target.value)}
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
        Already have an account? <Link to="/">Login</Link>
      </p>
      </div>
      
    </div>
  );
};

export default Register;
