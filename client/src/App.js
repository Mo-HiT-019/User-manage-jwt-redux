import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route,BrowserRouter,Routes } from 'react-router-dom';
import Home from './pages/user/Home';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Profile from './pages/user/Profile';
import Header from './pages/header/Header';
import AdmninLogin from './pages/admin/AdminLogin';
import AdminRegister from './pages/admin/AdminRegister';
import PrivateRoute from './pages/components/PrivateRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import PrivateRouteAdmin from './pages/components/PrivateRouteAdmin';




function App() {
  return (
    <BrowserRouter>
    <Header/>
    <div class='body-container'>
    <Routes>

      
      <Route path='/login' element={<Login/>}/>
      <Route path='/sign-up' element={<Register/>}/>

      <Route path='/admin-sign-up' element={<AdminRegister/>}/> 
      <Route path='/admin-login' element={<AdmninLogin/>}/>

      <Route element={<PrivateRoute/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='/profile' element={<Profile/>}/>
      </Route>

      <Route element={<PrivateRouteAdmin/>}>
      <Route path='/admin-dash' element={<AdminDashboard/>}/>
      </Route>
      
    </Routes>
    </div>
    
    </BrowserRouter>
    
  );
}

export default App;
