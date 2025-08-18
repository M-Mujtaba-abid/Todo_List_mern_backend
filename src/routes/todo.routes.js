import express from "express";
import { myPost,updateMyPost,deleteMyPost,getMyPosts } from "../controller/todo.controller.js";

const router=express.Router()

router.post("/",myPost)
router.patch("/update/:id",updateMyPost)
router.delete("/delete/:id",deleteMyPost)
router.get("/all",getMyPosts)


export default router