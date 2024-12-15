# User Registration Endpoint Documentation

## Endpoint: `/users/register`

### Description

This endpoint is used to register a new user in the system. It accepts user details such as fullname, email, and password, validates the input, hashes the password, and stores the user in the database. Upon successful registration, it returns a JSON Web Token (JWT) for authentication along with user information.

### Method: `POST`

### Headers

- `Content-Type: application/json`

### Request Body

The request body should be in JSON format and include the following fields:

| Field                | Type     | Required | Description                                            |
| -------------------- | -------- | -------- | ------------------------------------------------------ |
| `fullname.firstname` | `string` | Yes      | User's first name. Must be at least 3 characters long. |
| `fullname.lastname`  | `string` | Yes      | User's last name. Must be at least 3 characters long.  |
| `email`              | `string` | Yes      | User's email address. Must be a valid email format.    |
| `password`           | `string` | Yes      | User's password. Must be at least 6 characters long.   |

#### Example Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "password123"
}
```

### Response

#### Success Response

**Status Code:** `201 Created`

**Response Body:**

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "640d7b9c8f4a7b0000000000",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com",
    "password": "<hashed-password>",
    "_id": "675e5ecf678b83419971ad40",
    "__v": 0
  }
}
```

#### Error Responses

**Validation Errors:**

- **Status Code:** `400 Bad Request`
- **Response Body:**

```json
{
  "error": [
    {
      "type": "field",
      "value": "<input-name>",
      "msg": "Firstname must be at least 3 characters.",
      "path": "fullname.firstname",
      "location": "body"
    },
    {
      "type": "field",
      "value": "<input-email>",
      "msg": "Invalid email",
      "path": "email",
      "location": "body"
    }
  ]
}
```