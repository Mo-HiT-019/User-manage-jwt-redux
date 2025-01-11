import express from 'express';
import { signup,login, signout } from '../controllers/authController.js';

const router= express.Router();


router.post('/sign-up',signup);
router.post('/sign-in',login);
router.get('/signout',signout);

export default router;