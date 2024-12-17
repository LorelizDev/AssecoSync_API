# AssecoSync API 🚀

## 📁 Project Structure 

We have separated the project into two repositories:

- **[AssecoSync Client](https://github.com/LorelizDev/AssecoSync_client)**: Focuses exclusively on the user interface (UI), presentation logic, and user experience.

- **[AssecoSync API](https://github.com/LorelizDev/AssecoSync_API)**: Handles business logic, data storage, authentication, authorizations, and database communication.

---


## Table of Contents

1. [Overview](#📝-Overview)
2. [Features](#🔧-Features)
3. [Technologies Used](#💻-Technologies-Used)      
4. [API Documentation](#📃-API-Documentation)
5. [Team](#🧑‍🤝‍🧑-Team)


## 📝 Overview

AssecoSync API is part of the AssecoSync web application, designed to simplify and optimize the management of employee time logs, absences, and vacation requests. It enables seamless tracking and administrative management of working hours, vacations, leave requests and stistical time logs.

AssecoSync API leverages Keycloak for secure user authentication, Bull for managing background tasks, and Docker for containerizing Keycloak and Redis services. It enables efficient time management for employees and administrators at Asseco, supporting seamless vacation and leave tracking.

## 🔧 Features

### Role-based Access Control
With **Keycloak**, users are assigned roles (e.g., Employee, Admin) which control access to various endpoints and features. This ensures secure and granular control over who can access and modify sensitive data.

### Auto-close Workdays
The system automatically closes any workday that exceeds 8 hours. This feature runs as a background job managed by **Bull.js**, ensuring that it does not block the main user flow while keeping time logs accurate and compliant with work regulations.

Other features include:

- Employee management
- Time log management
- Leave request management
- Statistical time log management
- External employee management

## 💻 Technologies Used

### 🗝️ Key Technologies

### Keycloak for Authentication and Authorization

  AssecoSync uses Keycloak as its authentication and authorization solution. Keycloak is an open-source identity and access management tool that provides robust authentication mechanisms, including Single Sign-On (SSO), LDAP integration, and OAuth2.0 support. This ensures secure and scalable management of user roles and permissions across the system.

- **Role-based Access Control:** Keycloak helps manage roles such as "Employee" and "Admin." Employees can access and manage their own data, while Admins have full access to manage employees, time logs, leave requests, and other administrative tasks.
- **Secure Access:** With Keycloak, users are required to authenticate with JWT tokens, ensuring secure access to API endpoints. Token-based authentication simplifies the integration of third-party services and supports scalability.

### Bull for Background Jobs

AssecoSync integrates Bull, a robust queue system, to manage background jobs efficiently. Bull is used to handle tasks that need to be processed asynchronously, ensuring the smooth operation of the application without blocking the main event loop.

- **Auto-close Long Workdays:** One key feature that utilizes Bull is the automatic closure of workdays that exceed 8 hours. Bull allows the system to schedule and process this task in the background, without affecting the user experience.
- **Job Queueing:** Other background tasks such as sending notifications or processing reports can also be managed using Bull, which guarantees reliable task execution.

### ➕ Additional Technologies Used:

- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white): JavaScript runtime environment for building scalable server-side applications.
- ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white): Web framework for Node.js, used to build APIs and handle HTTP requests.
- ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white): ORM for Node.js that helps interact with relational databases like PostgreSQL.
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white): Open-source relational database system used to store data.
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white): A statically typed superset of JavaScript that helps catch errors early and improve code quality.
- ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white): Platform for containerizing applications, used here for Keycloak and Redis services.
- ![Day.js](https://img.shields.io/badge/Day.js-FF6F00?style=for-the-badge&logo=javascript&logoColor=white): Lightweight library for handling and manipulating dates and times in JavaScript.
- ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white): Code formatter that ensures consistent code style across the project.
- ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white): Static code analysis tool for identifying and fixing problems in JavaScript/TypeScript code.
- ![Husky](https://img.shields.io/badge/Husky-000000?style=for-the-badge&logo=git&logoColor=white): Git hooks tool for enforcing rules like running tests or linting before commits.


## 📃 API Documentation

The API documentation can be found in the [AssecoSync API Documentation](https://documenter.getpostman.com/view/37812295/2sAYBXBB9B#f75ccd0e-fc11-46b4-9d76-8d4c5f176c4a) wiki.

## 🧑‍🤝‍🧑 Team

- [Lorena Acosta](https://github.com/LorelizDev)
- [Anca Bacria](https://github.com/a-bac-0)
- [Jonnatha Figueira](https://github.com/jfigueira87)
- [Laura De Vega](https://github.com/devegalaura-dev)
- [Ana María García](https://github.com/AnaMaria-Sole)
