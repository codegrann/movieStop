# Local Setup Guide for MovieStop

This is a guide to setting up the application on your local machine.

---

## Prerequisites

- Node.js (v16+ recommended)
- npm or yarn package manager
- MongoDB Atlas account or local MongoDB server
- TMDb API key (https://www.themoviedb.org/documentation/api)
- Google OAuth 2.0 credentials (client ID and secret)

---

## Clone the repository

```bash
git clone git@github.com:codegrann/movieStop.git
cd movieStop
```

## Setup Backend

```bash
cd services

npm install

```

Create a .env file in the services/ folder with the following variables and replace them respectively:

```bash

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173
TMDB_API_KEY=your_tmdb_api_key
PORT=5000
```

Start the backend server:

```bash
npm run start
```


## Setup Frontend

Navigate to the root folder:

```bash
cd ..
```

Install dependencies:

```bash
npm install
```
Create a .env file in the frontend/ folder with the following variables:

```bash

VITE_BACKEND_URL=http://localhost:5000/api/auth
VITE_FRONTEND_URL=http://localhost:5173
```

Start the frontend development server:

```bash

npm run dev
```