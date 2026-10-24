
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    default: "",
  },

  dueDate: {
    type: String,
    default: "",
  },

  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Medium",
  },

  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
});

module.exports = mongoose.model("Task", taskSchema);
