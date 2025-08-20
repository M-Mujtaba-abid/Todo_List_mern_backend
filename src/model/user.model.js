import mongoose, { Schema } from "mongoose";
import { makeHashed, checkEncryptedPassword } from "../utils/encryptPassword.js";
import jwt from "jsonwebtoken"
const UserSchema =new Schema({
    name:{
        type: String,
        required: true,
        
    },
    email:{
        type: String,
        required: true,
        unique: true

    },
    password:{
        type: String,
        required: true,

    }
},{timestamps:true})

// rgister krne se phle 
UserSchema.pre("save",async function (next) {
  if(!this.isModified("password")) return next()
    try {
      this.password= await makeHashed(this.password)
      next()
    } catch (error) {
      next(error)
    }
  
})


UserSchema.methods.generateAccessToken=function(){
  return  jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email:this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
     expiresIn:process.env.ACCESS_TOKEN_EXPIRY    
    }
  
  )
}

UserSchema.methods.generateRefreshToken=function(){
  return  jwt.sign(
    {
      _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}

// password reset krne ke liye
UserSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update?.password) {
    try {
      update.password = await makeHashed(update.password);
      this.setUpdate(update);
    } catch (err) {
      return next(err);
    }
  }
  next();
});




export const User=mongoose.model("User",UserSchema)