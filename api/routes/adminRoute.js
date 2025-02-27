import express from 'express';
import { deleteUser, getUsers,updateUser } from '../controllers/adminController.js';
import { verifyTokenAdmin } from '../middlewares/authMiddleware.js';
import { adminSignout } from '../controllers/authController.js';


const router = express.Router();

router.get('/getusers',verifyTokenAdmin,getUsers);
router.put('/user-edited/:id',verifyTokenAdmin,updateUser);
router.delete('/delete/:id',verifyTokenAdmin,deleteUser)
router.get('/admin-sign-out',adminSignout);

export default router;