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

### 5. Start the server
   ```bash
   node index.js
   ```
   The app will be running at `http://localhost:3000`.

## API Endpoints
- `GET /tasks` - Retrieve a list of tasks.
- `POST /tasks` - Create a new task.
- `PUT /tasks/:id` - Update the status of a task.
- `DELETE /tasks/:id` - Remove a task.

## Example CURL (API Test)
```bash
curl -X POST http://localhost:3000/tasks \
     -H "Content-Type: application/json" \
     -d '{"title": "Buy cricket bats", "description": "SG, Kookaburra, and Adidas"}'
```
