# Genshin Impact Collection API Documentation

## Base URL
```
http://localhost:3000
```

## Authentication
Most endpoints require a JWT token for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_token>
```

---

## Authentication Endpoints

### Register New User
```http
POST /register
```

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response (201):**
```json
{
  "id": "integer",
  "username": "string",
  "email": "string",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

**Error Response (400):**
```json
{
  "message": "Email already registered"
}
```

### Login
```http
POST /login
```

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response (200):**
```json
{
  "access_token": "string"
}
```

**Error Response (401):**
```json
{
  "message": "Invalid email/password"
}
```

---

## Characters Endpoints

### Get All Characters
```http
GET /characters
```

**Query Parameters:**
- `vision` (optional): Filter by character vision (e.g., "Pyro", "Hydro")
- `weaponType` (optional): Filter by weapon type (e.g., "Sword", "Bow")

**Response (200):**
```json
[
  {
    "id": "integer",
    "name": "string",
    "vision": "string",
    "weaponType": "string",
    "rarity": "integer",
    "region": "string",
    "imageUrl": "string",
    "description": "string"
  }
]
```

### Get Character by ID
```http
GET /characters/:id
```

**Response (200):**
```json
{
  "id": "integer",
  "name": "string",
  "vision": "string",
  "weaponType": "string",
  "rarity": "integer",
  "region": "string",
  "imageUrl": "string",
  "description": "string"
}
```

**Error Response (404):**
```json
{
  "message": "Character not found"
}
```

---

## Weapons Endpoints

### Get All Weapons
```http
GET /weapons
```

**Query Parameters:**
- `type` (optional): Filter by weapon type (e.g., "Sword", "Bow")
- `rarity` (optional): Filter by rarity (integer)

**Response (200):**
```json
[
  {
    "id": "integer",
    "name": "string",
    "type": "string",
    "rarity": "integer",
    "baseATK": "integer",
    "subStat": "string",
    "subValue": "number",
    "passive": "string",
    "imageUrl": "string"
  }
]
```

### Get Weapon by ID
```http
GET /weapons/:id
```

**Response (200):**
```json
{
  "id": "integer",
  "name": "string",
  "type": "string",
  "rarity": "integer",
  "baseATK": "integer",
  "subStat": "string",
  "subValue": "number",
  "passive": "string",
  "imageUrl": "string"
}
```

**Error Response (404):**
```json
{
  "message": "Weapon not found"
}
```

---

## Collections Endpoints

### Get User's Collection
```http
GET /collections
```

**Authentication Required:** Yes

**Response (200):**
```json
[
  {
    "id": "integer",
    "UserId": "integer",
    "CharacterId": "integer",
    "Character": {
      "id": "integer",
      "name": "string",
      "vision": "string",
      "weaponType": "string",
      "rarity": "integer",
      "region": "string",
      "imageUrl": "string",
      "description": "string"
    }
  }
]
```

**Error Response (401):**
```json
{
  "message": "Invalid token"
}
```

### Add Character to Collection
```http
POST /collections/character/:id
```

**Authentication Required:** Yes

**Response (201):**
```json
{
  "message": "Character added to collection"
}
```

**Error Responses:**
- 400: Character already in collection
- 401: Invalid token
- 404: Character not found

### Remove Character from Collection
```http
DELETE /collections/character/:id
```

**Authentication Required:** Yes

**Response (200):**
```json
{
  "message": "Character removed from collection"
}
```

**Error Responses:**
- 401: Invalid token
- 404: Character not found in collection

---

## AI Recommendation Endpoint

### Get Character Recommendation
```http
GET /recommendation
```

**Authentication Required:** Yes

**Response (200):**
```json
{
  "character": {
    "id": "integer",
    "name": "string",
    "vision": "string",
    "weaponType": "string",
    "rarity": "integer",
    "region": "string",
    "imageUrl": "string",
    "description": "string"
  },
  "recommendation": "string"
}
```

**Error Responses:**
- 401: Invalid token
- 500: Failed to get AI recommendation

---

## Error Response Format
All error responses follow this format:
```json
{
  "message": "string"
}
```

## Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

## Rate Limiting
- No rate limiting implemented currently

## Data Models

### User
```json
{
  "id": "integer",
  "username": "string",
  "email": "string",
  "password": "string (hashed)",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Character
```json
{
  "id": "integer",
  "name": "string",
  "vision": "string",
  "weaponType": "string",
  "rarity": "integer",
  "region": "string",
  "imageUrl": "string",
  "description": "string"
}
```

### Weapon
```json
{
  "id": "integer",
  "name": "string",
  "type": "string",
  "rarity": "integer",
  "baseATK": "integer",
  "subStat": "string",
  "subValue": "number",
  "passive": "string",
  "imageUrl": "string"
}
```

### Collection
```json
{
  "id": "integer",
  "UserId": "integer",
  "CharacterId": "integer"
}
```