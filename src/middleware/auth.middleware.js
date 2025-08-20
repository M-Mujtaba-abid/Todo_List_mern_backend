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
    const token =
      req.cookies?.token ||
      req.headers["authorization"]?.split(" ")[1]; // Bearer <token>

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password"); // yahan req.user set hota hai ✅

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
