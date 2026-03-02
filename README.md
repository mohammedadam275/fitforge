FitForge

A full-stack fitness forum built using a 3-Tier Architecture.  
Users can register, log in, post questions, and answer discussions across fitness categories.

This project was built for the Software Engineering Bootcamp – Project 4 (Node.js & Express).

---

## Live Application

**Frontend (React SPA):**  
https://fitforge-frontend.onrender.com  

**Backend API (Express + MongoDB):**  
https://fitforge-backend-0wml.onrender.com  

---

## 3-Tier Architecture

### Data Layer
- MongoDB Atlas (Cloud Database)
- Database: `fitforgeDB`
- Collections:
  - users
  - categories
  - questions
  - answers

---

### Application Layer
- Node.js
- Express.js
- RESTful JSON API
- JWT Authentication
- Password hashing with bcrypt
- Protected routes middleware

API Routes:


/api/auth
/api/categories
/api/questions
/api/answers


---

### Presentation Layer
- React (Single Page Application)
- React Router
- Axios for API communication
- Protected dashboard routes
- Field-level validation for registration

---

## Features

### User Registration
- Username required
- Password must be at least 8 characters and contain a number
- Repeat password validation
- Terms & Conditions checkbox
- Field-level error messages

### User Login
- JWT authentication
- Invalid credential handling
- Secure route access

### Dashboard
- Displays logged-in username
- Logout functionality
- Scrollable category sidebar
- Questions displayed chronologically
- Post new questions
- Post answers to questions

### 💾 Persistent Data
- MongoDB Atlas cloud database
- Production-ready deployment

---

## Tech Stack

### Frontend
- React
- Axios
- React Router

### Backend
- Node.js
- Express.js
- JWT
- bcrypt

### Database
- MongoDB Atlas

### Deployment
- Render (Web Service + Static Site)
- GitHub (Version Control)

---

## Project Structure


fitforge/
│
├── backend/
│ ├── src/
│ │ ├── config/
│ │ ├── middleware/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── seed.js
│ │ └── server.js
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ └── App.js
│ └── package.json
│
└── README.md


---

## Installation (Run Locally)

### Clone Repository


git clone https://github.com/mohammedadam275/fitforge.git

cd fitforge


---

### Setup Backend


cd backend
npm install


Create `.env` file:


MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000


Run server:
npm run dev


---

### Setup Frontend


cd ../frontend
npm install
npm start


Frontend runs at:


http://localhost:3000


Backend runs at:


http://localhost:5000


---

## Seed Example Data

To seed categories:


cd backend
node src/seed.js


---

## Environment Variables (Production)

Backend requires:

- MONGO_URI
- JWT_SECRET
- PORT

These are configured in Render environment settings.

---

## Assignment Alignment

This project satisfies:

✔ 3-Tier Architecture  
✔ User Authentication  
✔ Themed Forum with Category Hierarchy  
✔ Public Hosting  
✔ Functional Dashboard  
✔ Robust Backend API  
✔ GitHub Repository  
✔ Documentation  

---

## Future Improvements

- Voting system
- Pagination
- User profiles
- Improved styling with a CSS framework
- Unit testing

---

## Author

Mohammed Adam  
Software Engineering Bootcamp – Project 4
