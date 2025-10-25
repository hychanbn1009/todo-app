# Todo App Backend

A TypeScript-based Express backend for a to-do list app using Supabase.

## Architecture
- **Frontend**: React (to be implemented)
- **Backend**: Express with TypeScript, handling CRUD operations
- **Database**: Supabase (PostgreSQL) with `todos` table
- **Deployment**: Kubernetes (Deployment, Service, ConfigMap, Secret)

![Architecture Diagram](architecture.png)

## Setup
1. Clone the repo: `git clone <repo-url>`
2. Install dependencies: `npm install`
3. Set up `.env` with Supabase credentials
4. Run locally: `npm run dev`
5. Build for production: `npm run build && npm start`

## API Endpoints
- `GET /api/todos`: List all todos
- `POST /api/todos`: Create a todo
- `GET /api/todos/:id`: Get a todo
- `PUT /api/todos/:id`: Update a todo
- `DELETE /api/todos/:id`: Delete a todo