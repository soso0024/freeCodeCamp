import express from 'express'
import cors from "cors"
import reviews from "./api/reviews.route.js"

const app = express()   // Create an Express application

app.use(cors()) // Enable CORS
app.use(express.json()) // Parse incoming requests with JSON payloads

app.use("/api/v1/reviews", reviews) // Use the reviews route for requests to the /api/v1/reviews path
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))    // Respond with a 404 Not Found status code for requests to all other paths

export default app  // Export the app object
