import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';


export const verifyToken=(req,res,next)=>{
    const token = req.cookies.accessToken;

    if(token){
        console.log('Token is present')
    }

    if(!token )return next(errorHandler(401,'Not authenticated token missing'));

    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return next(errorHandler(404,'Token is not valid '));

        req.user=user;
        next();
    })
}

export const verifyTokenAdmin=(req,res,next)=>{
    const token = req.cookies.accessTokenAdmin;

    if(token){
        console.log('Admin Token is present')
    }

    if(!token )return next(errorHandler(401,'Not authenticated token missing'));

    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return next(errorHandler(404,'Token is not valid '));

        req.user=user;
        next();
    })
}