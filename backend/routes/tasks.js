import express from "express"
import supabase from "../supabaseClient.js"
import { verifyUser } from "../middleware/verifyUser.js"

const router = express.Router()

// GET /api/tasks?status=done : this route return all the tasks or tasks with specific status to the frontend.
router.get("/", verifyUser, async (req, res) => {
  const status = req.query.status
  let query = supabase.from("tasks").select("*, profiles:assigned_user(email)")
  if (status) query = query.eq("status", status)

  const { data, error } = await query

  if (error) return res.status(400).json({ message: error.message })
  res.json(data)
}) 

// POST /api/tasks : this route add a specific task to the tasks table and return this new task object as a response.
router.post("/", verifyUser, async (req, res) => {
  const { title, status, started_date, assigned_user } = req.body

  if (!title)
    return res.status(400).json({ message: "Title is required" })

  const { data, error } = await supabase.from("tasks")
    .insert([
      {
        title,
        status,
        started_date,
        assigned_user,
        created_by: req.user.id,
      },
    ])
    .select()

  if (error) return res.status(400).json({ message: error.message })
  res.json(data[0]);
});

// PUT /api/tasks/:id : this route update a specific task with specific id from the tasks table and return this updated task as a object in the response.
router.put("/:id", verifyUser, async (req, res) => {
  const { id } = req.params
  const { title, status, started_date, assigned_user } = req.body

  const { data, error } = await supabase
    .from("tasks")
    .update({ title, status, started_date, assigned_user })
    .eq("id", id)
    .select()

  if (error) return res.status(400).json({ message: error.message });
  res.json(data[0])
})

// DELETE /api/tasks/:id : this route delete a specific task with a specific id from the tasks table and return object including done message.
router.delete("/:id", verifyUser, async (req, res) => {
  const { id } = req.params
  const { error } = await supabase.from("tasks").delete().eq("id", id)
  if (error) return res.status(400).json({ message: error.message })

  res.json({ message: "Task deleted" })
})

export default router;
