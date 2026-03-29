# Task Management API

## Features
- **Full CRUD**: Create, view, update status, and delete tasks.
- **Web Interface**: Simple UI to manage your tasks easily.
- **Pagination**: Loads 8 tasks per page.


## Setup Instructions

1. **Clone/Download the repository**
   Download the source code locally.

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Rename `.env.example` to `.env` and update the values with your local MySQL credentials.
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=your_password
   DB_NAME=task_db
   PORT=3000
   ```

4. **Initialize the Database**
   Connect to your MySQL server and run the SQL code in `db/schema.sql` to create the database and table.
```sql
CREATE DATABASE task_db;
USE task_db;
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Start the server (Option A: Node.js)
   ```bash
   node index.js
   ```

### 6. Start with Docker (Option B: Recommended)
   If you have Docker installed, you can start the entire stack (App + MySQL) with a single command:
   ```bash
   docker-compose up --build
   ```

## API Reference & CURL Commands

### 1. Get All Tasks (Paginated)
`GET /tasks?page=1&limit=8`
```bash
curl -X GET "http://localhost:3000/tasks?page=1&limit=8"
```

### 2. Create a New Task
`POST /tasks`
```bash
curl -X POST http://localhost:3000/tasks \
     -H "Content-Type: application/json" \
     -d '{"title": "Check project requirements", "description": "Ensure everything is correct"}'
```

### 3. Update Task Status
`PUT /tasks/:id` (Allowed statuses: `pending`, `in-progress`, `completed`)
```bash
curl -X PUT http://localhost:3000/tasks/1 \
     -H "Content-Type: application/json" \
     -d '{"status": "completed"}'
```

### 4. Delete a Task
`DELETE /tasks/:id`
```bash
curl -X DELETE http://localhost:3000/tasks/1
```
