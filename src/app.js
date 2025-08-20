import express from "express";
import cors from "cors";
import todoRoute from "./routes/todo.routes.js"
import userRoute from "./routes/user.routes.js"
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser())
app.use(cors({
  origin: [
    "http://localhost:5173", // tumhara local Vite frontend
    "https://todo-list-mern-frontend-sigma.vercel.app" // hosted frontend
  ],
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Backend server is running successfully 🚀");
});
app.use("/api/todo",todoRoute)
app.use("/api/todo/user",userRoute)

export default app;
