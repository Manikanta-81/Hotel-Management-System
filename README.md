# StayHub - Hotel Management System

StayHub is a **role-based hotel management system** that enables customers to seamlessly book rooms while allowing admins to efficiently manage room listings. Built using the **MERN stack**, this project ensures a smooth and secure experience with **JWT authentication, Axios API integration, Node.js cron jobs, and middleware-based access control.**

## 🚀 Deployment

StayHub is deployed on an AWS EC2 instance with an **Elastic IP:**

🔗 **Live API Base URL**: [`http://13.202.204.246/`](http://13.202.204.246/)

## 📌 Features

### **Backend Features**
- **Role-Based Authentication:** Secure login with JWT tokens for customers and admin.
- **Room Management:** Admin can add new rooms, and customers can view/book rooms.
- **Booking System:** Customers can book rooms, and admins can confirm bookings.
- **User Management:** Customers can register, log in, and manage their details.
- **Feedback System:** Customers can submit feedback for completed bookings.
- **Contact Support:** Users can submit inquiries via the contact form.
- **Secure API Integration:** Axios is used for handling API requests efficiently.
- **Cron Jobs (Node-cron):** Automated tasks like database cleanup and booking expiration checks.
- **Middleware for Access Control:** Protects routes based on user roles.

### **Frontend Features**
- **React-based UI:** Built with React.js and Bootstrap for a responsive and user-friendly experience.
- **Seamless API Calls:** Uses **Axios instance** for efficient API communication.
- **Real-time Notifications:** Implemented using `react-toastify` for success and error alerts.
- **Smooth Navigation:** Implemented with `react-router-dom` for easy page transitions.
- **Hero Section with Image Carousel:** Engaging banner with multiple slides showcasing hotel ambiance.  
- **Room Listings with Interactive Cards:** Displays available rooms with images, prices, and booking options.  
- **Navigation Bar with Authentication Handling:** Conditional rendering for login, logout, and dashboard links.  
- **Search & Filter Functionality:** Allows customers to filter rooms based on availability, price, and ratings.  
- **Customer Feedback & Contact Section:** Users can submit reviews and reach out via the contact form.  

## 🏗 Project Structure

```bash
Hotel-Management-System/
│-- client/                  # Frontend (React)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Different pages (Login, Booking, etc.)
│   │   ├── services/        # Axios API service files
│   │   ├── App.js           # Main app component
│   │   ├── index.js         # Entry point
│-- server/                  # Backend (Node.js, Express, MongoDB)
│   ├── controllers/         # Handles business logic
│   ├── models/              # Mongoose models
│   ├── routes/              # API endpoints
│   ├── middlewares/         # Authentication & authorization
│   ├── cronJobs             # Manages reserved rooms, checkout rooms.
│   ├── server.js            # Main server file
│-- README.md                # Documentation
```

## 🛠 Installation Guide

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/balajis183/Hotel-management-system.git
cd Hotel-management-system
```

### 2️⃣ Backend Setup
```bash
cd server
npm install
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd client
npm install
npm start
```

## 🔄 How Does StayHub Work?

1. **User Registration & Authentication:**
   - Customers can sign up and log in using JWT-based authentication.
   - Admins have separate access for room management.
   
2. **Room Booking Flow (Customer):**
   - Customers browse available rooms.  
   - Select a room and proceed with the booking giving checkin and checkout.  
   - The booking status is initially set to **"Pending"**.  
   - Once the user checks the detials and confirms the booking, the status updates to **"Confirmed"**.  
   - Customers can check their booking details and status anytime.  

3. **Admin Role & Room Management:**
   - Admins can add new rooms to the system.

4. **Feedback & Support:**
   - Customers can submit feedback post-booking.
   - Contact form available for inquiries.

5. **Automated Cron Jobs:**
   - Schedules periodic Cron Jobs to release reserved rooms and booking expiration checks.

## 🌐 API Endpoints

### **User Routes**
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/users/register-user` | Register a new user |
| POST | `/users/login-user` | Login user and receive JWT |
| GET  | `/users/get-all-users` | Fetch all registered users |

### **Room Routes**
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST  | `/rooms/create-room` | Admin adds a new room |
| GET  | `/rooms/get-all-rooms` | Fetch all available rooms |
| GET  | `/rooms/getSingleRoom/:id` | Get a specific room by ID |

### **Booking Routes**
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST  | `/bookings/create-booking` | Customer creates a booking |
| GET  | `/bookings/get-bookings` | Fetch all bookings |
| GET  | `/bookings/get-booking-by-id/:bookingId` | Get a specific booking by ID |
| PUT  | `/bookings/confirm-booking/:bookingId` | Admin confirms a booking |

### **Feedback Routes**
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST  | `/feedback/add-feedback` | Customer submits feedback |
| GET  | `/feedback/get-all-feedback` | Fetch all feedback |
| GET  | `/feedback/getfeedback/:bookingId` | Fetch feedback by booking ID |

### **Contact Routes**
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST  | `/contact/savecontact` | Save user contact messages |

## 📦 Dependencies

### Backend (Server)
- Express.js (Backend framework)
- MongoDB & Mongoose (Database & ODM)
- JSON Web Token (JWT for authentication)
- Node-cron (Automated jobs)
- Cors, dotenv (Environment variables & security)

### Frontend (Client)
- React.js (User interface)
- React Bootstrap (UI Components)
- Axios (API Integration with Axios instance)
- React Router DOM (Navigation)
- React Toastify (Notifications)
- Bootstrap Icons (UI Enhancements)

---

## Screenshoots for reference!


![image](https://github.com/user-attachments/assets/d4bc919c-879f-4ac8-84a6-31b663a80f52)



![image](https://github.com/user-attachments/assets/92da81a4-25ab-4954-80bf-78b6d4d27ebb)



![image](https://github.com/user-attachments/assets/9c5cf310-3171-446a-854e-f17cc368aeea)



![image](https://github.com/user-attachments/assets/89cde834-7dec-44de-a122-1fa9f31d71f8)



![image](https://github.com/user-attachments/assets/b80153b0-78db-4595-aa84-875c7c38a502)



![image](https://github.com/user-attachments/assets/ffb28171-e9f6-4925-af9b-68de654692ff)



![image](https://github.com/user-attachments/assets/290c9fd4-123e-4c05-a0d7-ebaba2308bcb)



![image](https://github.com/user-attachments/assets/16aafdcc-0767-489a-83cc-869b351e6514)



![image](https://github.com/user-attachments/assets/562f0cc8-7cbb-4c15-9544-20f23b429f37)



![image](https://github.com/user-attachments/assets/9b617619-8b00-4a4a-949f-2cd253ed833e)



![image](https://github.com/user-attachments/assets/0ca8eb48-599e-4289-a494-58064fc8f05a)



![image](https://github.com/user-attachments/assets/71509939-8ecc-4044-a63c-cc83d5e8d316)



![image](https://github.com/user-attachments/assets/bd3649a7-b8e3-4e06-8fe4-3fd0495bbb8e)



![image](https://github.com/user-attachments/assets/ec595d57-313b-4c30-9279-fac40cf01752)



![image](https://github.com/user-attachments/assets/043a9227-ff9b-42e3-956d-fea94ff8c420)



![image](https://github.com/user-attachments/assets/514bb2c9-6527-4f29-975a-9ec416890cdb)



![image](https://github.com/user-attachments/assets/46c6d37b-2f58-4a08-8ea0-7a93322a7bb1)



---

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request. For major changes, open an issue to discuss your ideas first.

## Contact

If you have any questions or feedback, feel free to reach out:

- **GitHub**: [balajis183](https://github.com/balajis183)
- **Email**: sbalaji2000s@gmail.com

---


For more projects visit my github profile.
```bash
https://github.com/balajis183
```
Thank you for exploring **StayHub**! 😊

