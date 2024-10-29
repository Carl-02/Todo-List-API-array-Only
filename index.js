
import express from "express";
const app = express();
const PORT = 3000;


app.use(express.json());

const tasks = [];
let taskCounter = 1;


app.get('/', (req, res) => {
    res.send('Welcome');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// GET TASK
app.get("/api/task", (req, res) => {
    const { status } = req.query;

    if (status) {
        const filteredTasks = tasks.filter(task => task.status === status);
        return res.status(200).json(filteredTasks);
    }

    res.status(200).json(tasks);
});

// POST TASK
app.post("/api/task", (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required." });
    }

    const newTask = {
        id: taskCounter++,
        title,
        description,
        status: "pending"
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// GET TASK BY ID
app.get("/api/task/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const foundTask = tasks.find(task => task.id === taskId);

    if (foundTask) {
        return res.status(200).json(foundTask);
    } else {
        return res.status(404).json({ message: "Task not found." });
    }
});

// PATCH TASK
app.patch("/api/task/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, description, status } = req.body;
    const foundTask = tasks.find(task => task.id === taskId);

    if (foundTask) {
        if (title !== undefined) foundTask.title = title;
        if (description !== undefined) foundTask.description = description;
        if (status !== undefined) foundTask.status = status;

        return res.status(200).json(foundTask);
    } else {
        return res.status(404).json({ message: "Task not found." });
    }
});

// DELETE TASK
app.delete('/api/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        return res.status(204).send();
    } else {
        return res.status(404).json({ message: 'Task not found.' });
    }
});
