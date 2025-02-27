import User from "../models/userModel.js";


export const getUsers = async (req, res) => {
    console.log('getUsers called ');
      try {
        const users = await User.find({as:'user'});
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
    };


export const updateUser = async (req, res) => {
        const updatedData = req.body;
        const userID = req.params.id;
      
        try {
          const user = await User.findByIdAndUpdate(userID,updatedData,{new:true});
          if (!user) return res.status(404).json({ message: 'User not found' });
      
        
      
          
          res.status(200).json({ message: 'User updated successfully', user });
        } catch (error) {
          res.status(500).json({ message: 'Server error' });
        }
      };
    
 export const deleteUser = async (req, res) => {
     try {
          console.log('Delete uese');
          
          const user = await User.findByIdAndDelete(req.params.id);
          console.log('Deleted user:', user);
          if (!user) return res.status(404).json({ message: 'User not found' });
      
          res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Server error' });
        }
      };