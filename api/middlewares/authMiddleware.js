import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';


export const verifyToken=(req,res,next)=>{
    const token = req.cookies.accessToken;

    if(!token )return next(errorHandler(401,'Not authenticated token missing'));

    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return next(errorHandler(404,'Token is not valid '));

        req.user=user;
        next();
    })
}