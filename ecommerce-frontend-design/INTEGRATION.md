# Frontend ↔ Backend integration

## 1. Configure the API URL

In `ecommerce-frontend-design`, copy `.env.example` to `.env`:

```env
VITE_API_BASE_URL=https://YOUR-APP-NAME.onrender.com
```

Use your real Render URL with **no trailing slash**.

## 2. Render backend environment

On Render, set:

| Variable | Example |
|----------|---------|
| `DB_URL` | JDBC MySQL URL |
| `DB_USERNAME` | your user |
| `DB_PASSWORD` | your password |
| `JWT_SECRET` | long random string |
| `FRONTEND_URL` | `http://localhost:5173` (for local testing) |

After you deploy the frontend, add your live frontend URL to `FRONTEND_URL` (comma-separated if multiple).

## 3. Run the frontend locally

```bash
cd ecommerce-frontend-design
npm install
npm run dev
```

Open http://localhost:5173

## 4. What is connected

| Feature | API |
|---------|-----|
| Home categories & recommended items | `GET /api/v1/products` |
| Product listing, search, category filter | `GET /api/v1/products/filter` |
| Product details | `GET /api/v1/products/{id}` |
| Login / Register | `POST /api/v1/auth/login`, `/register` |
| Admin add product | `POST /api/v1/products` (requires `ROLE_ADMIN`) |
| Cart | Browser `localStorage` (no orders API yet) |

## 5. Seed data

On first deploy, if the products table is empty, the backend seeds 10 sample products (Unsplash image URLs).

## 6. Create an admin user (optional)

Register a normal user from **Profile → Register**, then in MySQL set role to admin, or register via API with `"role": ["admin"]` if roles exist in DB.

## 7. Copy files to your GitHub repo

Copy these folders/files from this integration into your connected repo:

- `ecommerce-frontend-design/src/api/`
- `ecommerce-frontend-design/src/context/`
- `ecommerce-frontend-design/src/utils/`
- `ecommerce-frontend-design/src/components/` (updated)
- `ecommerce-frontend-design/src/App.jsx`
- `ecommerce-frontend-design/src/main.jsx`
- `ecommerce-frontend-design/.env.example`
- `e-commerce-backend-design/src/main/java/.../config/WebConfig.java`
- `e-commerce-backend-design/src/main/java/.../config/SecurityConfig.java`
- `e-commerce-backend-design/src/main/resources/application.properties`

Then commit, push, redeploy backend on Render, and run the frontend locally with `.env` pointing at Render.
