## Hotel Booking System Backend

This repository contains the microservice implementation of a Hotel Booking System, providing basic CRUD operations for four main tables: user, customerData, bookings, and rooms. The system is designed to manage user authentication using cookies and JWT token.

## Table of Contents

1. Introduction
2. Features
3. Technologies Used
4. Authentication
5. Password Encryption
6. .env File Setup
7. API EndPoints Documentation
8. Assumptions

## Introduction

The Hotel Booking System backend is built to manage the core functionalities required for a hotel reservation system. It includes user management, customer data storage, booking information, and room details.

## Features:

User Management: CRUD operations and login for user accounts.
Customer Data: Create, Read, Update, and Delete operations for customer information.
Bookings: Manage hotel room bookings with CRUD operations.
Rooms: CRUD operations for maintaining room details.

## Technologies Used:

Node.js
Express.js
MongoDB
Cookies for Routes Authentication
JSON Web Tokens (JWT) for user Authentication
Bcryptjs for Password Encryption

## Authentication

User authentication is implemented using JWT tokens and cookies. All the routes are protected with cookie except the login one.

## Password Encryption

User passwords are securely hashed using bcryptjs to ensure the confidentiality of user credentials.

## .env File Setup:

Rename `.env-sample` to `.env` and can change the values according to your need.

## API EndPoints Documentation

The documentation for all the API endpoints for this project is given in this file.

### File:

```
Hotel_Booking_Service.postman_collection.json
```

## Assumptions:

1. I am charging customer for a booking of a room on per day basis not hourly.
2. Room would have unique room number in the hotel.
3. There are 2 user roles one is `admin`(all user related routes are accessible by this role only) and the other is `receptionist`.
4. There should be a cron-job or scheduler which will trigger one day after the end date of booking to update its status to complete if it remained confirmed. But as it was out of the scope of this test description so I just modified the apis to handle if status completed is hit by update api.
