import {Todo} from "../model/todo.model.js"
// post create at
const myPost=async(req,res)=>{
  try {
    
        const {title ,description,status}=req.body
         if([title,description,status].some((i)=>!i || i==="")){
  console.log("all feild are required")
         }
  
       const todo  = await Todo.create({
        title,
        description,
        status,
  
       })
  
       return res.status(200).json(todo)
  } catch (error) {
   res.status(500).json({ message: "Server error", error: error.message });

    
  }
}

// get all todos
const getMyPosts = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//update post here 
const updateMyPost=async(req,res)=>{
   try {
     const { id } = req.params;
       const {title , description, status}=req.body
       
       if([title,description,status].some((i)=> !i || i.trim()==="")){
       console.log("all feilds are requried") 
        }
   const updatedTodo=await Todo.findByIdAndUpdate(id,
    {
       title , description, status
   },
  {
    new:true
  }
)
if(!updatedTodo){
  res.status(400).json({message:"todo not found"})
}

res.status(201).json(updatedTodo)


   } catch (error) {
         res.status(500).json({ message: "server error",error:error.message})    
   } 
}

// delete post 
const deleteMyPost = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteThisPostId = await Todo.findByIdAndDelete(id);

    if (!deleteThisPostId) {
      return res.status(404).json({ message: "Post not found" }); // ✅ return + 404
    }

    return res.status(200).json({
      message: "Post deleted successfully",
      deletedPost: deleteThisPostId,
    });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};



export {myPost,updateMyPost,deleteMyPost,getMyPosts}
