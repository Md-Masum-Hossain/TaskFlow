# TaskFlow

Mini Task & Issue Management System

<p align="left">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/RTK%20Query-593D88?style=for-the-badge&logo=redux&logoColor=white" alt="RTK Query" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

## 1. Project Title
TaskFlow - Mini Task & Issue Management System

## 2. Project Overview
TaskFlow is a full-stack task management application built with a React client and an Express/MongoDB API. The current implementation includes authenticated access, a dashboard overview, task CRUD operations, server-side filtering, and a responsive task board UI.

The repository currently focuses on task management flows rather than a separate issue-tracking module. This README documents only what is implemented in the codebase today.

## Features

- User registration, login, logout, and refresh-token authentication
- Protected application routes and guest-only auth routes
- Dashboard with task totals, status summaries, priority summaries, and kanban previews
- Task board with create, edit, delete, search, filter, and drag-and-drop status updates
- Task filtering by search term, status, and priority on the backend and frontend
- Task forms and cards support due date and assignee fields
- JWT-based access tokens with refresh-token cookie handling
- RTK Query data fetching with automatic token refresh retry logic
- Zod validation for auth and task request payloads
- Responsive layout with shared app shell, sidebar, and navigation

## Tech Stack

- Frontend: React 18, Vite, React Router DOM
- State Management: Redux Toolkit, RTK Query
- Styling: Tailwind CSS
- Drag and Drop: @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities
- Forms and UI Utilities: react-hook-form, use-debounce, react-hot-toast, sonner, react-icons
- Backend: Node.js, Express
- Database: MongoDB, Mongoose
- Authentication: JWT, bcryptjs, cookies
- Validation: Zod
- Middleware: cors, cookie-parser

## Folder Structure

```text
TaskFlow/
├── client/
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── app/
│       │   ├── api/
│       │   │   └── baseApi.js
│       │   └── store.js
│       ├── components/
│       │   ├── layout/
│       │   │   ├── AppLayout.jsx
│       │   │   ├── Navbar.jsx
│       │   │   └── Sidebar.jsx
│       │   ├── tasks/
│       │   │   └── TaskModal.jsx
│       │   └── ui/
│       │       ├── Button.jsx
│       │       ├── Input.jsx
│       │       ├── Select.jsx
│       │       └── Textarea.jsx
│       ├── context/
│       │   └── AuthContext.jsx
│       ├── features/
│       │   ├── auth/
│       │   │   ├── api/
│       │   │   │   └── authApi.js
│       │   │   ├── components/
│       │   │   │   ├── LoginForm.jsx
│       │   │   │   └── RegisterForm.jsx
│       │   │   └── slices/
│       │   │       └── authSlice.js
│       │   └── tasks/
│       │       ├── api/
│       │       │   └── tasksApi.js
│       │       ├── components/
│       │       │   ├── CreateTaskModal.jsx
│       │       │   ├── DeleteConfirmationDialog.jsx
│       │       │   ├── EditTaskModal.jsx
│       │       │   ├── EmptyState.jsx
│       │       │   ├── LoadingState.jsx
│       │       │   ├── PriorityBadge.jsx
│       │       │   ├── StatusBadge.jsx
│       │       │   ├── TaskActionsMenu.jsx
│       │       │   ├── TaskCard.jsx
│       │       │   ├── TaskColumn.jsx
│       │       │   ├── TaskFilters.jsx
│       │       │   ├── TaskForm.jsx
│       │       │   ├── TaskItem.jsx
│       │       │   └── TaskList.jsx
│       │       └── utils/
│       │           └── badgeVariants.js
│       ├── hooks/
│       │   ├── useAuth.js
│       │   └── useTaskDragAndDrop.js
│       ├── pages/
│       │   ├── DashboardPage.jsx
│       │   ├── LoginPage.jsx
│       │   ├── NotFoundPage.jsx
│       │   ├── RegisterPage.jsx
│       │   └── TasksPage.jsx
│       ├── routes/
│       │   ├── App.routes.jsx
│       │   ├── Protected.route.jsx
│       │   └── guest.route.jsx
│       └── styles/
│           └── globals.css
└── server/
  ├── app.js
  ├── package.json
  ├── server.js
  └── src/
    ├── config/
    │   └── db.config.js
    ├── controllers/
    │   ├── auth.controller.js
    │   └── task.controller.js
    ├── middleware/
    │   ├── auth.middleware.js
    │   ├── error.middleware.js
    │   └── validate.middleware.js
    ├── models/
    │   ├── task.model.js
    │   └── user.model.js
    ├── routes/
    │   ├── auth.routes.js
    │   └── task.routes.js
    ├── utils/
    │   ├── asyncHandler.js
    │   └── generateToken.js
    └── validations/
      ├── auth.validation.js
      └── task.validation.js
```

## Installation Guide

### Prerequisites

- Node.js
- MongoDB

### Clone the repository

```bash
git clone https://github.com/Md-Masum-Hossain/TaskFlow.git
cd TaskFlow
```

### Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### Configure environment variables

Create a `.env` file in both `client/` and `server/` using the templates below.

### Start the backend

```bash
cd server
npm run dev
```

### Start the frontend

```bash
cd client
npm run dev
```

## Environment Variables

### client/.env.example

```env
VITE_API_URL=http://localhost:5000/api
```

### server/.env.example

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/taskflow
JWT_SECRET=change_this_secret
REFRESH_TOKEN_SECRET=change_this_refresh_secret
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
NODE_ENV=development
```

## Available Scripts

### client/package.json

```bash
npm run dev
npm run build
npm run preview
```

### server/package.json

```bash
npm run dev
npm start
```

## API Endpoints

Base URL: `/api`

### Auth Routes

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Register a new user and return `user` and `accessToken` while setting the refresh-token cookie. |
| POST | `/api/auth/login` | No | Log in a user and return `user` and `accessToken` while setting the refresh-token cookie. |
| GET | `/api/auth/me` | Yes | Return the authenticated user profile. |
| POST | `/api/auth/refresh` | Cookie | Exchange the refresh-token cookie for a new access token. |
| POST | `/api/auth/logout` | No | Clear the refresh-token cookie. |

### Task Routes

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/tasks` | Yes | Return the authenticated user's tasks. Supports `search`, `status`, and `priority` query parameters. |
| POST | `/api/tasks` | Yes | Create a new task for the authenticated user. |
| PUT | `/api/tasks/:id` | Yes | Update an existing task owned by the authenticated user. |
| DELETE | `/api/tasks/:id` | Yes | Delete an existing task owned by the authenticated user. |

### Query Parameters

The task list endpoint accepts these filters:

- `search`
- `status`
- `priority`

Example:

```text
/api/tasks?search=design&status=todo&priority=high
```

## Authentication Flow

1. The user registers or logs in through the client.
2. The server validates the payload with Zod.
3. The server hashes the password with `bcryptjs` and generates an access token and a refresh token.
4. The refresh token is stored in an `httpOnly` cookie.
5. The client stores the access token in `localStorage`.
6. RTK Query attaches the access token as a Bearer token on API requests.
7. If a request returns `401`, the base query calls `/api/auth/refresh`.
8. If refresh succeeds, the client stores the new access token and retries the original request.
9. `ProtectedRoute` blocks protected pages when no access token exists.
10. `GuestRoute` redirects authenticated users away from login and register pages.

## Project Screenshots

No screenshots are committed in the repository yet.

- Dashboard screenshot: not available
- Tasks board screenshot: not available
- Login screen screenshot: not available
- Register screen screenshot: not available

## Live Demo

No live demo URL is committed in this repository.

## GitHub Repository

Md-Masum-Hossain/TaskFlow

## Future Improvements

- Add a deployed live demo link
- Add screenshot assets for the main screens
- Add task pagination for larger task lists
- Add task assignment UI if assignee management is expanded
- Add production deployment documentation

## License

No license file is committed in the repository.

## Author

Md Masum Hossain
