import express from "express";
import cors from "cors";
import todoRoute from "./routes/todo.routes.js"

// Routes import
const app = express();

app.use(cors())
app.use(express.json())
app.use("/api/todo",todoRoute)


export default app;
