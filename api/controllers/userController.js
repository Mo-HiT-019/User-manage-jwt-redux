import cloudinary from 'cloudinary';
import User from '../models/userModel.js';
import multer from 'multer';



cloudinary.config({ 
    cloud_name: 'dwtjw9yfr', 
    api_key: '269633839131353', 
    api_secret: '55xlQVUL0xk9AQdoCc2whA_qnsM'
  });


  const storage = multer.memoryStorage();
  const upload = multer({ storage });
  
  export const uploadProfilePic = async (req, res) => {
    upload.single('profileImage')(req, res, async (err) => {
      if (err) {
        console.error('Multer error:', err);
        return res.status(500).json({ message: 'Profile upload failed' });
      }
  
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      try {
        const result = cloudinary.v2.uploader.upload_stream(
          {
            resource_type: 'image',
            public_id: `profile_pics/${Date.now()}`,
          },
          async (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              return res.status(500).json({ message: 'Cloudinary upload failed' });
            }

            const user = await User.findById(req.params.userId);
            if (!user) {
              return res.status(404).json({ message: 'User not found' });
            }
  
            user.profilePic = result.secure_url;
            await user.save();
            res.status(200).json({ message: 'Profile pic updated', profilePic: result.secure_url });
          }
        );
        result.write(req.file.buffer);
        result.end();
      } catch (error) {
        console.error('Upload failed:', error);
        res.status(500).json({ message: 'Server error' });
      }
    });
  };

export const uploadProfilePicccc= async (req,res)=>{
    upload(req,res, async(err)=>{
      if (err){
        console.log("Profile upload error:", err);
        return res.status(500).json({ message: 'Profile upload failed' });
      }
  
      try{
        console.log("Pic uploadingg......");
  
        const result = await cloudinary.v2.uploader.upload_stream(
          {
            resource_type: 'image', 
            public_id: `profile_pics/${Date.now()}`
          },
  
          async (error, result) => {
            if (error) {
              console.log('Cloudinary upload error:', error);
              return res.status(500).json({ message: 'Cloudinary upload failed' });
            }
  
            const user = await User.findById(req.userId);
            if (!user) {
              return res.status(404).json({ message: 'User not found' });
            }
  
            user.profilePic = result.secure_url;
            await user.save();
            res.status(200).json({ message: 'Profile pic updated', profilePic: result.secure_url });
          }
        );
        result.end(req.file.buffer);
      }catch(error){
        console.log("C upload faill",error)
        res.status(500).json({ message: 'Server Error' });
      }
    })
  }
  