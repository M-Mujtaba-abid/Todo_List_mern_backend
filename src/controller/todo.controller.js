// import {Todo} from "../model/todo.model.js"
// // post create at
// const myPost=async(req,res)=>{
//   try {
    
//         const {title ,description,status}=req.body
//          if([title,description,status].some((i)=>!i || i==="")){
//   console.log("all feild are required")
//          }
  
//        const todo  = await Todo.create({
//         title,
//         description,
//         status,
  
//        })
  
//        return res.status(200).json(todo)
//   } catch (error) {
//    res.status(500).json({ message: "Server error", error: error.message });

    
//   }
// }

// // get all todos
// const getMyPosts = async (req, res) => {
//   try {
//     const todos = await Todo.find().sort({ createdAt: -1 }); // latest first
//     res.status(200).json(todos);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// //update post here 
// const updateMyPost=async(req,res)=>{
//    try {
//      const { id } = req.params;
//        const {title , description, status}=req.body
       
//        if([title,description,status].some((i)=> !i || i.trim()==="")){
//        console.log("all feilds are requried") 
//         }
//    const updatedTodo=await Todo.findByIdAndUpdate(id,
//     {
//        title , description, status
//    },
//   {
//     new:true
//   }
// )
// if(!updatedTodo){
//   res.status(400).json({message:"todo not found"})
// }

// res.status(201).json(updatedTodo)


//    } catch (error) {
//          res.status(500).json({ message: "server error",error:error.message})    
//    } 
// }

// // delete post 
// const deleteMyPost = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deleteThisPostId = await Todo.findByIdAndDelete(id);

//     if (!deleteThisPostId) {
//       return res.status(404).json({ message: "Post not found" }); // ✅ return + 404
//     }

//     return res.status(200).json({
//       message: "Post deleted successfully",
//       deletedPost: deleteThisPostId,
//     });
//   } catch (error) {
//     console.error("Delete error:", error);
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };



// export {myPost,updateMyPost,deleteMyPost,getMyPosts}



import { Todo } from "../model/todo.model.js";

// ✅ Create Todo (userId add kiya)
const myPost = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if ([title, description, status].some((i) => !i || i === "")) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const todo = await Todo.create({
      title,
      description,
      status,
      userId: req.user._id, // 🔑 logged-in user ka id save
    });

    return res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Server error line 112", error: error.message });
  }
};

// ✅ Get all todos (sirf logged-in user ke)
const getMyPosts = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user._id }).sort({ createdAt: -1 }); // 🔑 filter by userId
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Server error line 122", error: error.message });
  }
};

// ✅ Update Todo (sirf apne hi update kar paye)
const updateMyPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    if ([title, description, status].some((i) => !i || i.trim() === "")) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user._id }, // 🔑 ensure sirf apna hi update ho
      { title, description, status },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found or not authorized" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "server error line 148", error: error.message });
  }
};

// ✅ Delete Todo (sirf apne hi delete kar paye)
const deleteMyPost = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteThisPostId = await Todo.findOneAndDelete({
      _id: id,
      userId: req.user._id, // 🔑 filter by userId
    });

    if (!deleteThisPostId) {
      return res.status(404).json({ message: "Post not found or not authorized" });
    }

    return res.status(200).json({
      message: "Post deleted successfully",
      deletedPost: deleteThisPostId,
    });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ message: "Server error line172", error: error.message });
  }
};

export { myPost, updateMyPost, deleteMyPost, getMyPosts };
