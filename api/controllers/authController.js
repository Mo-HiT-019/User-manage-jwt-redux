import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { name, email, password, gender, city, state } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, gender, city, state });
    try {
      await newUser.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      next(error);
    }
  }

export const adminSignup = async (req, res, next) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const as=role
    const newUser = new User({ name, email, password: hashedPassword, as });
    try {
      await newUser.save();
      res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
      next(error);
    }
  }

export const login = async(req,res,next)=>{
  const {email, password}=req.body;
  console.log("Login called");

  try{
    const userValid=await User.findOne({email})
    if(!userValid) return next(errorHandler(404,'User not foundd.'));

    if(userValid.as!=='user') return next(errorHandler(404,'User Not founf'))

    console.log("check1");
    const validPassword = bcryptjs.compareSync(password, userValid.password);
    if (!validPassword) return next(errorHandler(401, 'wrong credentials'));

    const token=jwt.sign({id: userValid._id},process.env.JWT_SECRET);
    const {password:hashedPassword,...rest}=userValid._doc;
    const expiryDate = new Date(Date.now() + 3600000);

    

    res.cookie('accessToken',token,{httpOnly:true,expires:expiryDate})
    .status(200).json(rest); 

  }catch(error){ 
    next(error);
  }
}


export const adminLogin = async(req,res,next)=>{
  const {email, password}=req.body;
  console.log("Login called");

  try{
    const userValid=await User.findOne({email})
    if(!userValid) return next(errorHandler(404,'User not foundd.'));
    if(userValid.as!=='admin') return next(errorHandler(404,'User Not founf'))

    console.log("check1");
    const validPassword = bcryptjs.compareSync(password, userValid.password);
    if (!validPassword) return next(errorHandler(401, 'wrong credentials'));

    const token=jwt.sign({id: userValid._id},process.env.JWT_SECRET);
    const {password:hashedPassword,...rest}=userValid._doc;
    const expiryDate = new Date(Date.now() + 3600000);

    

    res.cookie('accessTokenAdmin',token,{httpOnly:true,expires:expiryDate})
    .status(200).json(rest); 

  }catch(error){ 
    next(error);
  }
}

export const signout = (req, res) => {
  console.log('User signout called')
  res.clearCookie('accessToken').status(200).json('Signout success!');
};


export const adminSignout = (req, res) => {
  console.log('Admin signout called')
  res.clearCookie('accessTokenAdmin').status(200).json('Signout success!');
};