import express from 'express';
import { uploadProfilePic } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router= express.Router();

router.get('/',(req,res)=>{
    res.json({
        message:'Api is workingg'
    })
});


router.put('/pic-upload/:userId',verifyToken,uploadProfilePic)


export default router; 