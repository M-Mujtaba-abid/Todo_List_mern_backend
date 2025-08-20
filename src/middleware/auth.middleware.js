// import jwt from "jsonwebtoken"
// import { User } from "../model/user.model.js";

// export const verifyJWT_Token=async(req,res,next)=>{
//     try {
//         const token =req.cookies?.accessToken || req.header("authorization")?.replace("bearer ","")

//         if(!token){
//             return res.status(401).json(400,"unAuthorized access line 9 auth middleware");
//         }

//         const decodedToken =jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

//         const user= await User.findById(decodedToken._id).select("-password -refreshToken")

//         if(!user){
//             return res.status(401).json(401,"invalid access line 16 auth middleware");
            
//         }

//         req.user=user
//          return next();
//     } catch (error) {
//         return res.status(401).json(401,"invalid request line 22 auth midddleware");
                
//     }
// }

import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

export const verifyJWT_Token = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization"); // Proper capital
    const token = req.cookies?.token || authHeader?.split(" ")[1];

    console.log("Auth Header:", authHeader);
    console.log("Token mil gaya:", token);

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded ===", decoded);

    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
