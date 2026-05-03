# Food Delivery App Project

## Table of Contents
1. [Project Overview](#project-overview)
2. [Project Architecture](#project-architecture)
3. [Tech Stack](#tech-stack)
4. [Setup Instructions](#setup-instructions)
5. [Backend Deployment](#backend-deployment)
6. [Development Issues & Solutions](#development-issues--solutions)
7. [Deployment Issues & Solutions](#deployment-issues--solutions)

## Project Overview
This project is a comprehensive Food Delivery Application featuring a customer-facing mobile application, a dedicated administrative dashboard, and a robust backend service. It supports full end-to-end functionality including browsing products, managing cart/orders, driver delivery tracking, and administrative controls for categories and overall orders.

## Project Architecture
The repository is structured into three main components:
- **User App (`./`)**: A React Native CLI application for customers to browse food, place orders, and track deliveries.
- **Admin App (`./adminpanel_app/`)**: An Expo-based React Native application designed for administrators and store managers to handle inventory, view feedback, and manage operations.
- **Backend API (`./adminpanel_app/adminBackend/`)**: A Node.js & Express RESTful API with MongoDB that serves both the User App and the Admin App.

## Tech Stack
- **User App**: React Native CLI, NativeWind (Tailwind CSS), Zustand, React Query, Stripe React Native, Axios.
- **Admin App**: Expo, React Navigation, NativeWind, Zustand, React Query.
- **Backend**: Node.js, Express, MongoDB (Atlas), Mongoose.
- **Deployment**: AWS Elastic Beanstalk (Backend), Vercel (Web Frontend), Expo Application Services (EAS) for Mobile Apps.

## Setup Instructions

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd adminpanel_app/adminBackend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and set the required variables (e.g., `MONGO_URI`, `PORT`, `JWT_SECRET`).
4. Start the server:
   ```bash
   npm start
   ```

### 2. User App Setup
1. Navigate to the root directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Metro Bundler:
   ```bash
   npm start
   ```
4. Run the app on an emulator or physical device:
   ```bash
   npm run android  # For Android
   npm run ios      # For iOS
   ```

### 3. Admin App Setup
1. Navigate to the admin app directory:
   ```bash
   cd adminpanel_app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Expo server:
   ```bash
   npm start
   ```

## Backend Deployment
The Node.js backend is configured for deployment on **AWS Elastic Beanstalk**. 
- To deploy, you must zip the `adminBackend` directory (excluding `node_modules`) and upload it to the AWS Elastic Beanstalk console, or use the EB CLI.
- Ensure that you configure the Environment Properties within the Elastic Beanstalk console to include your `MONGO_URI`, `PORT`, and any other secrets required by `.env`.

## Development Issues & Solutions

### 1. State Management for Driver Deliveries
**Issue:** We needed a seamless way for drivers to mark orders as "delivered" and have that state synchronize across both the User and Admin dashboards.
**Solution:** We created a dedicated backend API endpoint to handle the order status transition from 'delivering' to 'completed'. On the frontend, we added a 'Mark as Delivered' button to the 'My Deliveries' interface and utilized Zustand to ensure the global state reflects these updates instantaneously without requiring a manual refresh.

### 2. Secure Admin Authentication & Logout
**Issue:** Implementing a secure logout mechanism to properly clear administrative sessions and prevent unauthorized access.
**Solution:** We updated the `useAuthStore` (Zustand) to include a robust `logout` function. This function clears all stored user data and authentication tokens, and effectively resets the application state. The `RootNavigator` was updated to seamlessly transition the user back to the `AuthNavigator` upon logout.

### 3. Managing Shipping Eligibility
**Issue:** Needed a user-friendly way to assign and update shipping eligibility statuses for products/orders.
**Solution:** We integrated a custom dropdown UI component and connected it to the frontend's form state management. This ensures the selected shipping eligibility value is accurately captured and persisted to the backend API during form submissions.

## Deployment Issues & Solutions

### 1. Android APK Build Failures (Windows)
**Issue:** Persistent native C++ build failures and environment variable configuration errors occurred while attempting to generate a local Android APK on Windows. Additionally, there were network security policy errors and proxy-based rate limiting issues.
**Solution:** We transitioned from local React Native CLI building to using **Expo Application Services (EAS)** for cloud-based builds. We created `eas.json` configuration files to offload the heavy build process to the cloud, entirely bypassing the local Windows native build complications. We also documented all necessary API and network security configurations to ensure stable production releases.

### 2. AWS Elastic Beanstalk Connection Errors
**Issue:** After deploying the backend to AWS Elastic Beanstalk, the health checks failed, and the server was unreachable due to database connection timeouts.
**Solution:** We resolved this by configuring **MongoDB Atlas Network Access** to permit inbound connections from the AWS environment. We also explicitly defined the MongoDB connection string as an environment variable within the Elastic Beanstalk configuration panel and ensured the application correctly binds to the standard process port provided by the AWS runtime.

### 3. Vercel / Web Deployment Network Errors
**Issue:** The web deployments faced `net::ERR_CONNECTION_REFUSED` errors when attempting to authenticate or fetch data.
**Solution:** We identified that the frontend was making API requests to a hardcoded `localhost:5000` base URL. We implemented environment-based configurations (`process.env.REACT_APP_API_URL` or Expo equivalents) to dynamically point to the production AWS backend URL when deployed, ensuring API connectivity across both local development and production.
