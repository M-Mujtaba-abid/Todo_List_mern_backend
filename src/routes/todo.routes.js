import express from "express";
import { myPost,updateMyPost,deleteMyPost,getMyPosts } from "../controller/todo.controller.js";
import { verifyJWT_Token } from "../middleware/auth.middleware.js";

const router=express.Router()




router.post("/",verifyJWT_Token, myPost)
router.patch("/update/:id",verifyJWT_Token,updateMyPost)
router.delete("/delete/:id" ,verifyJWT_Token ,deleteMyPost)
router.get("/all",verifyJWT_Token, getMyPosts)


export default router