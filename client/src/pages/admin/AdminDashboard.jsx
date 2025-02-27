import React, {  useEffect, useState } from 'react';
import './AdminDashboard.css';


import axiosInstance from '../../config';
import { getUsersFail, getUsersStart, getUsersSuccess,adminSignOut,deleteUserStart,deleteUserSuccess,deleteUserFail } from '../../redux/admin/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.admin);

    const navigate = useNavigate()
    console.log(users)

    const [editingUserId,setEditingUserId]=useState(null);
    const [editedUser,setEditUser]=useState({});
    
  
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    const getUsers=async()=>{
      console.log('Get users called')

      dispatch(getUsersStart());
      try{
        const response = await axiosInstance.get('/admin/getusers');
        dispatch(getUsersSuccess(response.data));
      }catch(error){
        const errormsg= error.response?.data?.message || 'Faoils to get userss';
        dispatch(getUsersFail(errormsg))
      }
    }
  
    useEffect(() => {
      getUsers();
    }, [dispatch]);
  
    useEffect(() => {
      setFilteredUsers(
        (users||[]).filter((user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }, [searchTerm, users]);

    const handleEdit  = (user)=>{
      setEditingUserId(user._id);
      setEditUser({...user});
    }

    const handleInputChange=(e)=>{
      const {name,value}=e.target;
      setEditUser((prev)=>({...prev,[name]:value}))
    }

    const handleCancel=()=>{
      setEditingUserId(null);
    }

    const handleSave = async()=>{
      try{

        const response = await axiosInstance.put(`/admin/user-edited/${editingUserId}`,editedUser)

      console.log('User updated Success',response.data)


      setEditingUserId(null);
      setEditUser({});

      getUsers();

      }catch(error){
        console.log('User update failed',error.message);
      }
      
    }

   /* const handleDell=(id)=>{
      
      const updateUsers=[...users];
      console.log(users)
      try{
        dispatch(deleteUserStart());
      const updated=updateUsers.filter((us)=>{
        if(us._id !== id){
          return us
        }
      })
      dispatch(deleteUserSuccess(updated));
      }catch(error){
        dispatch(deleteUserFail())
      }
      

    }*/
  
    const handleDelete = async (id) => {
      if (!window.confirm('Are you sure you want to delete this user?')) return;
  
      try {
        await axiosInstance.delete(`/admin/delete/${id}`)
        getUsers()
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete user.');
      }
    };

 

    const handleLogout= async ()=>{

      
      dispatch(adminSignOut());
      await axiosInstance.get('/admin/admin-sign-out')
      navigate('/admin-login');

    }
  
    return (
      <div>
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <table border="1">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>City</th>
                <th>State</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              {editingUserId === user._id ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={editedUser.name}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>
                    <input
                      type="text"
                      name="city"
                      value={editedUser.city}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="state"
                      value={editedUser.state}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleSave(user._id)}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{user.city}</td>
                  <td>{user.state}</td>
                  <td>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    <button onClick={() => handleDelete(user._id)}>
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
          </table>
        )}
      </div>
    );
  };
  
  export default AdminDashboard;