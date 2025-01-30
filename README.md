# ModernVet Feedback API

A Node.js/Express API for managing pet service feedback submissions.

## Features
- Submit feedback with name, pet name, rating, and comments (optional)
- Retrieve all feedback submissions
- In-memory data storage
- Data validation and error handling

## Requirements
- Node.js (v14+)
- npm

## Installation
1. Clone the repository
```bash
git clone https://github.com/muhnuryusri/modern_vet_backend.git
cd modern_vet_backend
```
3. Install dependencies:
```bash
npm install express
```

## Run Server
```bash
node server.js
```
The server will start on port 3000 by default. To use a different port:
```bash
PORT=4000 node server.js
```

## Testing
To test the API, you can use tools like curl or Postman:
```bash
# Submit feedback
curl -X POST -H "Content-Type: application/json" \
  -d '{"name":"Alice","petName":"Buddy","rating":5}' \
  http://localhost:3000/api/feedback

# Retrieve feedback list
curl http://localhost:3000/api/feedback

# Retrieve feedback detail
curl http://localhost:3000/api/feedback/1
```

## API Documentation
POST /api/feedback
```bash
{
  "name": "string",
  "petName": "string",
  "rating": "number (1-5)",
  "comments": "string (optional)"
}
```

GET /api/feedback
```bash
{
  "feedbacks": [
    {
      "id": "number"
      "name": "string",
      "petName": "string",
      "rating": "number",
      "comments": "string|null",
      "timestamp": "ISO date string"
    }
  ]
}
```

GET /api/feedback/:id
```bash
{
  {
    "id": "number"
    "name": "string",
    "petName": "string",
    "rating": "number",
    "comments": "string|null",
    "timestamp": "ISO date string"
  }
}
```
