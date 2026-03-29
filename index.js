const express = require('express');
const cors = require('cors');
const db = require('./config/db');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const apiAuth = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey === process.env.API_KEY || apiKey === 'taskmanager-2026') {
        next();
    } else {
        res.status(401).json({ error: "Unauthorized: Missing or invalid API key" });
    }
};

app.post('/tasks', apiAuth, async (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ error: "Title required!" });
    }
    try {
        const [result] = await db.query(
            "INSERT INTO tasks (title, description) VALUES (?, ?)",
            [title, description || ""]
        );
        res.status(201).json({
            id: result.insertId,
            message: "Task created successfully!"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong on our end." });
    }
});

app.get('/tasks', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    try {
        const [rows] = await db.query(
            "SELECT * FROM tasks ORDER BY created_at DESC LIMIT ? OFFSET ?",
            [limit, offset]
        );
        res.json({
            page,
            limit,
            tasks: rows
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not fetch tasks." });
    }
});

app.put('/tasks/:id', apiAuth, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const allowedStatuses = ['pending', 'in-progress', 'completed'];
    if (!status || !allowedStatuses.includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
    }
    try {
        const [result] = await db.query(
            "UPDATE tasks SET status = ? WHERE id = ?",
            [status, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Task not found." });
        }

        res.json({ message: "Task status updated successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update task." });
    }
});

app.delete('/tasks/:id', apiAuth, async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query("DELETE FROM tasks WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Task not found." });
        }

        res.json({ message: "Task deleted successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not delete task." });
    }
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
