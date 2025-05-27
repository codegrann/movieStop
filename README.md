# movieStop


# Register
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d '{"email":"testuser2@example.com","password":"password123","name":"Test User1"}'

# Login and get token (manual extraction)
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"email":"testuser2@example.com","password":"password123"}'

# Login and store token in variable (bash + jq)
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"email":"testuser2@example.com","password":"password123"}' | jq -r '.token')

# Get popular movies
curl -H "Authorization: Bearer $TOKEN" http://localhost:5000/api/movies/popular

# Search movies
curl -H "Authorization: Bearer $TOKEN" "http://localhost:5000/api/movies/search?query=inception"

# Movie details
curl -H "Authorization: Bearer $TOKEN" http://localhost:5000/api/movies/27205
