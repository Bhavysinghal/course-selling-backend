# 🎓 Course Selling Backend Application

> A production-style **backend application for selling online courses**, built using **Node.js, Express, MongoDB, and JWT authentication**. This project demonstrates **clean architecture, role-based access control, and secure authentication**, making it suitable for real-world applications and technical interviews.

---

## 📖 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture & Structure](#-architecture--structure)
- [Database Models](#-database-models)
- [API Endpoints](#-api-endpoints)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Authentication Flow](#-authentication-flow)
- [Future Improvements](#-future-improvements)

---

## 📌 Features

### 👤 User

- **Signup & Login:** Secure registration and authentication.
- **Browse Courses:** View all available courses.
- **Purchase Courses:** Buy courses securely.
- **Dashboard:** View list of purchased courses.

### 🧑‍🏫 Admin

- **Course Management:** Create, update, and delete courses.
- **Dashboard:** View all courses created by the specific admin.
- **Secure Access:** Dedicated login portal for admins.

### 🔐 Security

- **Password Hashing:** Implemented using **bcrypt**.
- **Stateless Auth:** Secured using **JWT (JSON Web Tokens)**.
- **RBAC:** Role-Based Access Control distinguishing User vs. Admin.
- **Input Validation:** Request validation using **Zod**.

---

## 🧱 Tech Stack

| Component      | Technology | Description                               |
| :------------- | :--------- | :---------------------------------------- |
| **Runtime**    | Node.js    | JavaScript runtime environment            |
| **Framework**  | Express.js | Backend web application framework         |
| **Database**   | MongoDB    | NoSQL database                            |
| **ODM**        | Mongoose   | Object Data Modeling for MongoDB          |
| **Auth**       | JWT        | Stateless authentication mechanism        |
| **Security**   | bcrypt     | Password hashing algorithm                |
| **Validation** | Zod        | Schema declaration and validation library |
| **Config**     | dotenv     | Environment variable management           |

---

## 🔄 Architecture & Structure

This project follows a **Layered Architecture** to ensure scalability, maintainability, and separation of concerns.

### 📂 Folder Structure

```bash
src
├── config
│   └── index.js
├── controllers
│   ├── admin.controller.js
│   ├── course.controller.js
│   └── user.controller.js
├── db
│   └── index.js
├── middlewares
│   ├── admin.middleware.js
│   └── user.middleware.js
├── models
│   ├── admin.models.js
│   ├── course.models.js
│   ├── purchase.models.js
│   ├── user.models.js
│   └── index.js
├── routes
│   ├── admin.routes.js
│   ├── course.routes.js
│   └── user.routes.js
├── validators
│   └── index.js
├── app.js
└── index.js
```

### Flow of Data

1. **Routes:** Define API endpoints.
2. **Middlewares:** specific checks (Auth/Admin verification).
3. **Validators:** Validate request body inputs.
4. **Controllers:** Handle business logic.
5. **Models:** Interact with the Database.

---

## 🗃️ Database Models

### User Schema

- `email` (Unique, String)
- `password` (Hashed String)
- `firstName` (String)
- `lastName` (String)

### Admin Schema

- `email` (Unique, String)
- `password` (Hashed String)
- `firstName` (String)
- `lastName` (String)

### Course Schema

- `title` (String)
- `description` (String)
- `price` (Number)
- `imageUrl` (String)
- `creatorId` (ObjectId -> Ref: Admin)

### Purchase Schema

- `userId` (ObjectId -> Ref: User)
- `courseId` (ObjectId -> Ref: Course)

---

## 🌐 API Endpoints

### 👤 User Routes (`/api/v1/user`)

| Method | Endpoint     | Description            | Auth Required |
| :----- | :----------- | :--------------------- | :-----------: |
| `POST` | `/signup`    | User registration      |      ❌       |
| `POST` | `/signin`    | User login             |      ❌       |
| `GET`  | `/purchases` | View purchased courses |      ✅       |

### 🧑‍🏫 Admin Routes (`/api/v1/admin`)

| Method   | Endpoint       | Description            | Auth Required |
| :------- | :------------- | :--------------------- | :-----------: |
| `POST`   | `/signup`      | Admin registration     |      ❌       |
| `POST`   | `/signin`      | Admin login            |      ❌       |
| `POST`   | `/course`      | Create a new course    |      ✅       |
| `PUT`    | `/course`      | Update existing course |      ✅       |
| `DELETE` | `/course`      | Delete a course        |      ✅       |
| `GET`    | `/course/bulk` | Get all admin courses  |      ✅       |

### 📚 Course Routes (`/api/v1/course`)

| Method | Endpoint    | Description                | Auth Required |
| :----- | :---------- | :------------------------- | :-----------: |
| `GET`  | `/preview`  | View all available courses |      ❌       |
| `POST` | `/purchase` | Purchase a course          |      ✅       |

---

## 🔐 Authentication Flow

1. **Login:** User/Admin submits credentials.
2. **Validation:** Server verifies credentials (bcrypt comparison).
3. **Token Issue:** If valid, server signs a JWT containing the user's ID.
4. **Request:** Client sends token in headers for protected routes.
   ```http
   Authorization: Bearer <JWT_TOKEN>
   ```
5. **Verification:** Middleware verifies token signature.
6. **Access:** If valid, access is granted; otherwise `401 Unauthorized`.

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_USER_PASSWORD=your_user_jwt_secret
JWT_ADMIN_PASSWORD=your_admin_jwt_secret
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone [https://github.com/your-username/course-selling-backend.git](https://github.com/your-username/course-selling-backend.git)
cd course-selling-backend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Up Environment

Create the `.env` file as shown in the section above.

### 4️⃣ Start the Server

```bash
# Standard start
node index.js

# Or if using nodemon (dev mode)
npx nodemon index.js
```

---

## 🧪 Error Handling Standards

The API returns standard HTTP status codes:

- `200` OK: Request successful.
- `201` Created: Resource successfully created.
- `400` Bad Request: Validation failed / Invalid input.
- `401` Unauthorized: Missing or invalid token.
- `403` Forbidden: Valid token but insufficient permissions.
- `404` Not Found: Resource not found.
- `409` Conflict: Duplicate data (e.g., email already exists).
- `500` Server Error: Internal server issue.

---

## ✅ Improvements & Future Enhancements

- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] Course video hosting and streaming
- [ ] Refresh tokens implementation
- [ ] Pagination & filtering for courses
- [ ] Centralized global error handler
- [ ] Rate limiting for API security

---
