import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:5000/api/tasks";

function App() {
 
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");


  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  
useEffect(() => {
  async function fetchTasks() {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
      setError("");
    } catch (error) {
      setError("Could not load tasks. Check that the backend is running.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  fetchTasks();
}, []);


  
  
async function completeTask(id) {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, {
      status: "Completed",
    });

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task._id === id ? response.data : task
      )
    );

    setError("");
  } catch (error) {
    console.error("Error completing task:", error);
    setError("Could not update the task. Please try again.");
  }
}


  

async function addTask(event) {
  event.preventDefault();

  if (!title.trim()) {
    alert("Please enter a task title.");
    return;
  }

  try {
    const newTask = {
      title: title.trim(),
      description,
      dueDate,
      priority,
      status: "Pending",
    };

    const response = await axios.post(API_URL, newTask);

    setTasks((currentTasks) => [
      ...currentTasks,
      response.data,
    ]);

    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("Medium");
    setShowForm(false);
    setError("");
  } catch (error) {
    console.error("Error saving task:", error);
    setError(
      error.response?.data?.message || "Could not save the task."
    );
  }
}

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>🎓 StudentHub</h2>
        <p className="active">▦ Dashboard</p>
        <p>✓ My Tasks</p>
        <p>▤ Study Notes</p>
      </aside>

      <main className="content">
        <p className="eyebrow">YOUR PERSONAL STUDY SPACE</p>
        <h1>Welcome to StudentHub!</h1>
        <p className="subtitle">
          Organise your learning, one task at a time.
        </p>

        
<button
  type="button"
  onClick={() => setShowForm(!showForm)}
>
  {showForm ? "Cancel" : "+ Add Task"}
</button>

{showForm && (
  <form className="add-task-form" onSubmit={addTask}>
    <h2>Create a New Task</h2>

    <label htmlFor="title">Task Title *</label>
    <input
      id="title"
      value={title}
      onChange={(event) => setTitle(event.target.value)}
      placeholder="e.g. Complete React assignment"
      required
    />

    <label htmlFor="description">Description</label>
    <textarea
      id="description"
      value={description}
      onChange={(event) => setDescription(event.target.value)}
      placeholder="Add task details..."
      rows="3"
    />

    <label htmlFor="dueDate">Due Date</label>
    <input
      id="dueDate"
      type="date"
      value={dueDate}
      onChange={(event) => setDueDate(event.target.value)}
    />

    <label htmlFor="priority">Priority</label>
    <select
      id="priority"
      value={priority}
      onChange={(event) => setPriority(event.target.value)}
    >
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </select>

    <button type="submit">Save Task</button>
  </form>
)}


        <section className="cards">
          <div className="card">
            <span>Total Tasks</span>
            <h2>{tasks.length}</h2>
          </div>

          <div className="card">
            <span>Pending</span>
            <h2>
              {tasks.filter((task) => task.status === "Pending").length}
            </h2>
          </div>

          <div className="card">
            <span>Completed</span>
            <h2>
              {tasks.filter((task) => task.status === "Completed").length}
            </h2>
          </div>
        </section>

        <section className="task-section">
          <h2>My Tasks</h2>

{loading && <p>Loading tasks...</p>}
{error && <p>{error}</p>}
{!loading && !error && tasks.length === 0 && (
  <p>No tasks yet. Click Add Task to create your first task!</p>
)}
          
{tasks.map((task) => (
  <div className="task" key={task._id}>
    <div className="task-details">
      <strong>{task.title}</strong>

      <p className="task-description">
        {task.description || "No description provided."}
      </p>

      <div className="task-meta">
        <span className={`priority ${task.priority.toLowerCase()}`}>
          {task.priority} Priority
        </span>

        <span className={`status ${task.status.toLowerCase().replace(" ", "-")}`}>
          {task.status}
        </span>
      </div>

      <p className="task-date">
        Due date:{" "}
        {task.dueDate
          ? new Date(task.dueDate + "T00:00:00").toLocaleDateString(
              "en-IN",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              }
            )
          : "Not set"}
      </p>
    </div>

    <button
      onClick={() => completeTask(task._id)}
      disabled={task.status === "Completed"}
    >
      {task.status === "Completed" ? "Completed" : "Finish"}
    </button>
  </div>
))}

        </section>
      </main>
    </div>
  );
}

export default App;
