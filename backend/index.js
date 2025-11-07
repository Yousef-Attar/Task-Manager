import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import tasksRouter from "./routes/tasks.js"
import usersRouter from "./routes/users.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use("/api/tasks", tasksRouter)
app.use("/api/users", usersRouter)

// test route
app.get("/", (req, res) => {
  res.send("Task Manager API is running 🚀");
})

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
})
