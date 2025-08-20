import express from "express";
import { myPost,updateMyPost,deleteMyPost,getMyPosts } from "../controller/todo.controller.js";
import { verifyJWT_Token } from "../middleware/auth.middleware.js";

const router=express.Router()


router.post("/todos", verifyJWT_Token, myPost);
router.get("/todos", verifyJWT_Token, getMyPosts);
router.patch("/todos/:id", verifyJWT_Token, updateMyPost);
router.delete("/todos/:id", verifyJWT_Token, deleteMyPost);
// router.post("/",myPost)
// router.patch("/update/:id",updateMyPost)
// router.delete("/delete/:id",deleteMyPost)
// router.get("/all",getMyPosts)


export default router