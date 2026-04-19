Smart E-Commerce Backend (Local Stores)
Overview

This is the backend of the Smart E-Commerce Website for Local Stores. It provides RESTful APIs for authentication, product management, cart operations, and order processing.

Features

Authentication
User Signup & Login
Password hashing using bcrypt
JWT-based authentication
Protected routes

Product APIs
Add product
Get all products
Update product
Delete product

Cart APIs
Add to cart
Remove from cart
Update quantity
Get user cart

Order APIs
Place order
View orders

Tech Stack
Node.js
Express.js
MongoDB (Mongoose)
JWT Authentication
bcrypt

Setup
npm install
npm run dev

Environment Variables

Create .env:

MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret

API Testing

Use Postman to test APIs.

