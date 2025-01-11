import React, { useEffect, useState } from 'react';
import './home.css'
import { useDispatch, useSelector } from 'react-redux';
import { updateUserStart,updateUserSuccess,updateUserfail } from '../../redux/user/userSlice';
import axiosInstance from '../../config';



const Profile = () => {
  const { currentUser} = useSelector((state) => state.user);
   
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImage, setProfileImage] = useState(currentUser?.profilePic);
  console.log(profileImage);
  const [gender,setGender]=useState(currentUser?.gender || '');
  const [city,setCity]=useState(currentUser?.city || '');
  const [state,setState]=useState(currentUser?.state || '');
  const dispatch=useDispatch()
  
    const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
    };
    

/*
    const handleEdit=async (field)=>{
     
      
      const newValue=prompt(`Enter new ${field}:`, field === 'gender' ? gender : field === 'city' ? city : state);

      if (newValue === null || newValue.trim() === ''){
        return;
      }
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };

        const payload = { [field]: newValue };
        console.log(field)
        console.log(token);
        const { data } = await API.put(`/api/users/profileupdate`, payload, config);

       if (field === 'gender') setGender(data.gender);
      if (field === 'city') setCity(data.city);
      if (field === 'state') setState(data.state);

      alert(`${field} updated successfully!`);
    }catch(error){
      console.log(error);
      alert(error.response?.data?.message ||'Erropr failedr to update')
    }
  }
    */


    const handleUpload = async (e) => {
      e.preventDefault();
      if (!selectedFile) return alert('Please select a file.');
  
      const formData = new FormData();
      formData.append('profileImage', selectedFile);
  
      try {
        dispatch(updateUserStart())
        const {data}=await axiosInstance.put(`/user/pic-upload/${currentUser._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log(data);
        setProfileImage(data.profileImage);
        alert('Profile image updated successfully!');
      
        dispatch(updateUserSuccess(data))
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to upload image.');
        dispatch(updateUserfail(error))
      }
    };

    


  
    return (
      <div className='profile-page'>
  <div className="profile-header">
    <h2>{currentUser.name}'s Profile</h2>

    <img
  src={

    currentUser?.profilePic || 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg'
  }
  alt="Profile"
  style={{
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
  }}
/>
    <form onSubmit={handleUpload}>
      <input type="file" onChange={handleFileChange}/>
      <button type="submit">Upload</button>
    </form>
  </div>

  <div className="profile-info">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title"></h5>
        <p className="card-text">User details</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Gender:{currentUser.gender} </li>
        <li className="list-group-item">City:{currentUser.city} </li>
        <li className="list-group-item">State:{currentUser.state} </li>
      </ul>
    </div>
  </div>
</div>
    );
  };

  
  export default Profile;