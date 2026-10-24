
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const taskRoutes = require("./routes/taskRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/tasks", taskRoutes);
app.get("/api/health", (req, res) => {
  res.json({ message: "StudentHub backend is running!" });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
