## Task Management API
## Setup Instructions

1. **Clone/Download the repository**
   Download the source code locally.

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Rename `.env.example` to `.env` and update the values with your local MySQL credentials.
   ```bash
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=your_password
   DB_NAME=task_db
   PORT=3000
   ```

### 4. Initialize the Database
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

### API Endpoints
- GET /tasks (list all tasks)
- POST /tasks (create new task)
- PUT /tasks/:id (update task status)
- DELETE /tasks/:id (delete task)

## Example CURL Command

### Create a Task
```bash
curl -X POST http://localhost:3000/tasks \
     -H "Content-Type: application/json" \
     -d '{"title": "Buy cricket bats", "description": "SG, Kookaburra, and Adidas"}'
```

### Get Tasks
```bash
curl http://localhost:3000/tasks
```


