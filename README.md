# Sendbird Chat POC

A full-stack proof of concept (POC) for managing users, channel groups, and their memberships. Built with:

- **Frontend**: React + Vite + ShadCN UI + React Query + React Router
- **Backend**: Node.js + Express 
- **State Management**: Local storage (auth), React Query (data fetching/caching)

---

## 📁 Folder Structure

```

.
├── backend/               # Express API (not detailed here)
├── frontend/              # React app with ShadCN UI
├── start-pm2.sh           # Script to start PM2 in background
├── ecosystem.config.js    # PM2 configuration file
└── install-deps.sh        # Script to install dependencies

````

---

## 🧩 Features

### ✅ Users
- Create / Update / Delete / View
- Token generation for users (from sendbird api)
- Authentication with api key

### ✅ Channel Groups
- Create / View / Edit / Delete
- Paginated list
- Assign users to a group on creation

### ✅ Manage Members (After Creation)
- Add/remove users to/from channel groups via dedicated page

### ✅ Chat (With ability to choose user before chat)
- Add/remove users to/from channel groups via dedicated page

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- pnpm (recommended) / yarn / npm

### Install Dependencies

```bash
chmod +x install-deps.sh
./install-deps.sh
````

### Run Frontend

```bash
cd frontend
pnpm dev
```

### Run Backend (if applicable)

```bash
cd backend
pnpm start
```

---

## 🔐 Authentication

* Simple token-based mechanism using localStorage
* Protected routes with `ProtectedRoute` component

---

## 🧪 API Assumptions

* `/users` → List, create, update, delete users
* `/users/token` → Generate token
* `/channels` → List/create channel groups
* `/channels/:id/members` → Get, add, remove group members

---

## ✨ UI Libraries Used

* [ShadCN UI](https://ui.shadcn.dev/)
* [React Query](https://tanstack.com/query/latest)
* [React Router](https://reactrouter.com/)

---

## 📎 Scripts

```bash
./install-deps.sh      # Install frontend + backend deps
./start-pm2.sh        # Run both frontend and backend at the same time
```

## 📚 Sendbird Documentation
* [Sendbird Platform API](https://sendbird.com/docs/chat/platform-api/v3/overview)
* [Sendbird SDK](https://sendbird.com/docs/chat/sdk/v4/javascript/overview)
* [Sendbird UI Kit React Native](https://sendbird.com/docs/chat/uikit/v3/react-native/overview)
* [Sendbird UI Kit React](https://sendbird.com/docs/chat/uikit/v3/react/overview)