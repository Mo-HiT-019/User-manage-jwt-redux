import express from 'express';
import { signup,login, signout,adminSignup,adminLogin } from '../controllers/authController.js';


const router= express.Router();


router.post('/sign-up',signup);
router.post('/sign-in',login);
router.get('/signout',signout);
router.post('/admin-sign-in',adminLogin);
router.post('/admin-sign-up',adminSignup);

export default router; 