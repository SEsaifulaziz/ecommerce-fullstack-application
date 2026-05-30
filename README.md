# Full-Stack B2B E-Commerce Marketplace Application

A production-ready, full-stack B2B E-Commerce marketplace built using a decoupled monorepo architecture. The application features a robust relational database backend powered by Java and Spring Boot, seamlessly integrated with a highly responsive, modern React dashboard frontend.

## 🚀 Live Deployments
* **Frontend Dashboard (Vercel):** `https://your-app-name.vercel.app`
* **Backend API Gateway (Render):** `https://ecommerce-fullstack-application-d4lk.onrender.com`

---

## 🏗️ Architecture & Project Structure
The repository is managed as a clean monorepo, cleanly separating core concerns between client-side rendering and server-side business logic:

```text
ecommerce-fullstack-application/
├── e-commerce-backend-design/      # Spring Boot REST API Engine
│   ├── src/main/java/              # Core Controllers, Services, & Security Layers
│   └── src/main/resources/         # Environment App Properties
└── ecommerce-frontend-design/     # React.js Client Application
    ├── src/components/             # Modular Functional UI Components
    └── src/services/api.js         # Axios/Fetch Infrastructure

```

## Technology Stack
### Backend Infrastructure
- Framework: Spring Boot 3.x (Java)
- Security: Spring Security & JWT (JSON Web Tokens) Authentication
- Data Access: Spring Data JPA (Hibernate ORM)
- Database Connection Pool: HikariCP
- Production Database: MySQL (Hosted via Aiven Cloud Services)

### Frontend Engine
- Library: React.js (Functional Components & Hooks)
- Styling Framework: Tailwind CSS
- Icons: Lucide React
- Build System: Vite / Create React App

## Core Features Complete
- Cloud-Native Database Pipeline: Fully migrated from a local localhost instance to an active,
distributed cloud data cluster on Aiven.
- REST API Filtering Hub: Server-side search logic handling categorical queries (/products/filter?category=...)
with automated zero-match fallbacks.
- Granular Product Details Workspace: Dynamic lifecycle hook tracking that reads product database primary keys (productId)
 and extracts item specification matrices.
- Secure Enterprise Authentication: Complete user registration and login state routing tied directly
 to an automated database role-seeding security architecture (ROLE_USER, ROLE_ADMIN).
- Production Environment Configuration: Decentralized CORS credential mapping
 handling secure variations between development host nodes and production cloud servers via dynamic environment variables.

## Local Setup & Installation
### Prerequisites
- Java 17 or higher

- Node.js (v18+)

- MySQL Workbench (Optional, for cloud inspection)

### Running the Backend
1. Navigate to the backend subdirectory:
   - cd e-commerce-backend-design
2. Configure your environment properties inside IntelliJ or
 your native terminal wrapper (DB_URL, DB_USERNAME, DB_PASSWORD, JWT_SECRET, APP_CORS_ALLOWED_ORIGINS).
3. Compile and boot the application:
   ./mvnw spring-boot:run

### Running the Frontend
1. Navigate to the frontend subdirectory:
   - cd ../ecommerce-frontend-design

2. Install project dependencies:
   - npm install

3. Boot up the local development network node:
   npm run dev


## Author
Saiful Aziz




