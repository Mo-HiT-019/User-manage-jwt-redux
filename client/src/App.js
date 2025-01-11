import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route,BrowserRouter,Routes } from 'react-router-dom';
import Home from './pages/user/Home';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Profile from './pages/user/Profile';
import Header from './pages/header/Header';
import PrivateRoute from './pages/components/PrivateRoute';


function App() {
  return (
    <BrowserRouter>
    <Header/>
    <div class='body-container'>
    <Routes>

      
      <Route path='/login' element={<Login/>}/>
      <Route path='/sign-up' element={<Register/>}/>

      <Route element={<PrivateRoute/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='/profile' element={<Profile/>}/>
      </Route>
      
    </Routes>
    </div>
    
    </BrowserRouter>
    
  );
}

export default App;
