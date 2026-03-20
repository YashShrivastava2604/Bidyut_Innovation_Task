# DevList – Full Stack MERN Application with Pagination and Docker Deployment

## Overview

DevList is a full-stack MERN application designed to demonstrate efficient server-side pagination, API data ingestion, and production-ready deployment using Docker and Nginx.

The application fetches developer-related articles from an external API (Dev.to), stores them in MongoDB, and serves them through a paginated REST API. The frontend provides a clean interface for browsing, searching, and filtering resources.

---

## Key Features

### Backend

* Server-side pagination using MongoDB (`skip` and `limit`)
* Search functionality using regex (case-insensitive)
* Category-based filtering
* External API ingestion (Dev.to) via a seeding script
* Structured REST API responses
* Clean architecture with separation of concerns

### Frontend

* React (Vite) based UI
* Tailwind CSS for styling
* Search input with dynamic querying
* Category filter
* Pagination controls (Prev/Next)
* API abstraction using Axios

### DevOps / Deployment

* Dockerized backend and frontend
* Multi-stage build for frontend (Node → Nginx)
* Nginx reverse proxy for API routing
* docker-compose orchestration

---

## Project Structure

```
devlist/
  ├── backend/
  │    ├── src/
  │    │    ├── config/
  │    │    ├── controllers/
  │    │    ├── models/
  │    │    ├── routes/
  │    │    └── seed/
  │    ├── Dockerfile
  │    └── .env
  │
  ├── frontend/
  │    ├── src/
  │    │    ├── components/
  │    │    ├── pages/
  │    │    └── services/
  │    ├── nginx.conf
  │    ├── Dockerfile
  │    └── .env
  │
  └── docker-compose.yml
```

---

## Data Flow Architecture

```
Dev.to API → Seeder Script → MongoDB → Backend API → Frontend (React)
                                               ↓
                                            Nginx
```

---

## Backend Details

### API Endpoint

```
GET /api/resources
```

### Query Parameters

| Parameter | Description                           |
| --------- | ------------------------------------- |
| page      | Page number (default: 1)              |
| limit     | Items per page (default: 10, max: 50) |
| search    | Search term (matches title)           |
| category  | Filter by category                    |

---

### Sample Response

```json
{
  "total": 240,
  "page": 2,
  "limit": 10,
  "totalPages": 24,
  "data": [...]
}
```

---

### Pagination Strategy

Pagination is implemented at the database level using:

* `skip = (page - 1) * limit`
* `limit = number of documents per request`

This ensures:

* No unnecessary data loading
* Scalable performance for large datasets

---

## Data Seeding

A one-time seeding script is used to populate the database.

### Source

* Dev.to public API

### Process

1. Fetch multiple pages of articles
2. Transform data into internal schema
3. Insert into MongoDB

### Run Seeder

```
node src/seed/seed.js
```

---

## Frontend Details

### Features

* Displays paginated resource list
* Search updates results dynamically
* Category filter narrows dataset
* Pagination updates via API calls

### API Integration

All API calls are handled via a centralized Axios instance:

```
baseURL = VITE_API_URL
```

---

## Environment Variables

### Backend (`backend/.env`)

```
PORT=5000
MONGO_URI=your_mongodb_uri
```

### Frontend (`frontend/.env`)

```
VITE_API_URL=/api
```

---

## Docker Setup

### Services

* Backend (Node.js)
* Frontend (Nginx serving Vite build)

---

### Run the Application

From project root:

```
docker-compose up --build
```

---

### Access

* Frontend: http://localhost:3000
* Backend API: http://localhost:5000/api/resources

---

## Nginx Configuration

Nginx serves the frontend and proxies API requests:

* `/` → React app
* `/api` → Backend service

This allows seamless communication without exposing backend ports in production.

---

## Design Decisions

### Why store API data locally?

* Full control over dataset
* No dependency on external API at runtime
* Enables custom pagination and filtering

### Why server-side pagination?

* Efficient memory usage
* Scalable for large datasets
* Industry-standard approach

### Why Nginx?

* Serves static frontend efficiently
* Handles API routing via reverse proxy
* Simplifies production deployment

---

## Future Improvements

* Debounced search (reduce API calls)
* Page number navigation (instead of only Prev/Next)
* Full-text indexing for faster search
* Authentication and user personalization
* Deployment on AWS (EC2 / ECS / Nginx reverse proxy)

---

## Conclusion

This project demonstrates:

* Backend optimization (pagination, filtering, search)
* Full-stack integration (React + Node + MongoDB)
* External API ingestion and data normalization
* Production-ready deployment using Docker and Nginx

It is designed to reflect real-world backend and deployment practices rather than a basic CRUD application.
