import express from "express"
import supabase from "../supabaseClient.js"
import { verifyUser } from "../middleware/verifyUser.js"

const router = express.Router()

// Get all users (for assignment)
router.get("/", verifyUser, async (req, res) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, email")
    .order("email")

  if (error) return res.status(400).json({ message: error.message })
  res.json(data)
})

export default router;