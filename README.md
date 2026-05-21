# Hintro AI Dashboard Alpha

A frontend mock dashboard project built for the Hintro Frontend Assignment.

This project recreates the provided Figma dashboard design using React and the supplied mock APIs. The dashboard supports both empty and populated states based on different users returned from the API.

---

# Project Idea

The goal of this project was to build a mock dashboard interface that:

- Follows the provided Figma design
- Uses live mock API data
- Handles multiple user states
- Displays empty and populated dashboard views
- Maintains reusable styling and theme consistency
- Includes responsive layouts and transitions

The project focuses heavily on frontend implementation, API integration, UI accuracy, and component structuring.

---

# Features

- Dashboard UI based on Figma
- API-driven data rendering
- Empty state handling
- Dynamic call statistics
- Feedback history page
- Responsive layouts
- Reusable CSS structure
- React Router navigation

---

# Routes

- `/` → Login Page
- `/dashboard` → Dashboard Page
- `/feedback-history` → Feedback History Page

---

# Setup Tutorial

## 1. Clone the Repository

```bash
git clone https://github.com/7t64vu3ge/hintro-ai-dashboard-alpha.git
```

## 2. Navigate Into the Project

```bash
cd hintro-ai-dashboard-alpha
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Create Environment File

```bash
touch .env
```

## 5. Add API URL

```bash
echo "VITE_API_URL=https://mock-backend-hintro.vercel.app" > .env
```

Or manually add this inside `.env`:

```env
VITE_API_URL=https://mock-backend-hintro.vercel.app
```

## 6. Start the Development Server

```bash
npm run dev
```

---

# Mock API Users

The backend supports two user states:

| User | Behaviour |
|------|------------|
| `u1` | Empty dashboard states |
| `u2` | Randomized populated dashboard data |

## Test Login Credentials

| Email | Purpose |
|------|------|
| `u1@test.com` | Empty state dashboard |
| `u2@test.com` | Dashboard with populated/randomized data |

Password:
```txt
Anything you type
```

---

# Project Notes

Detailed implementation notes, design observations, and frontend traps documented during development:

https://docs.google.com/document/d/14LOAkzXaxNmgGg9pG7XB00ujcRB1_M0SsTvs6iHMBpU/edit?usp=sharing

