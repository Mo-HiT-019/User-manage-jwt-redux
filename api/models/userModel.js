import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
    },
    as:{
        type:String,
        default:'user'
    },
    gender:{
         type: String,
          default: '' 
    },
    city:{
         type: String,
         default: '' 
    },
    state:{
         type: String,
         default: '' 
    }
 
})

export default mongoose.model('User',userSchema);