# User Registration API Documentation

## Register User
Endpoint for registering a new user in the system.

**URL**: `/users/register`

**Method**: `POST`

**Content-Type**: `application/json`

### Request Body
```json
{
    "fullName": {
        "firstName": "string",    // minimum 3 characters
        "lastName": "string"      // minimum 3 characters
    },
    "email": "string",           // valid email format
    "password": "string"         // minimum 6 characters
}
```

### Example Request
```json
{
    "fullName": {
        "firstName": "John",
        "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
}
```

### Success Response
**Code**: `201 Created`

**Content Example**:
```json
{
    "status": "success",
    "data": {
        "fullName": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "email": "john.doe@example.com",
        "_id": "user_id",
        "socketId": null
    },
    "token": "jwt_token_string"
}
```

### Error Responses

#### Validation Error
**Code**: `400 Bad Request`

**Content Example**:
```json
{
    "status": "fail",
    "errors": [
        {
            "msg": "Email is required",
            "param": "email",
            "location": "body"
        }
    ]
}
```

#### Missing Required Fields
**Code**: `400 Bad Request`

**Content Example**:
```json
{
    "status": "fail",
    "message": "All fields are required"
}
```

### Notes
- All fields (firstName, lastName, email, password) are required
- Email must be unique in the system
- Password will be hashed before storage
- A JWT token is returned upon successful registration
- The response will not include the password field

## Login User
Endpoint for authenticating an existing user.

**URL**: `/users/login`

**Method**: `POST`

**Content-Type**: `application/json`

### Request Body
```json
{
    "email": "string",           // valid email format
    "password": "string"         // minimum 6 characters
}
```

### Example Request
```json
{
    "email": "john.doe@example.com",
    "password": "password123"
}
```

### Success Response
**Code**: `200 OK`

**Content Example**:
```json
{
    "status": "success",
    "data": {
        "fullName": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "email": "john.doe@example.com",
        "_id": "user_id",
        "socketId": null
    },
    "token": "jwt_token_string"
}
```

### Error Responses

#### Invalid Credentials
**Code**: `401 Unauthorized`

**Content Example**:
```json
{
    "status": "fail",
    "message": "Invalid email or password"
}
```

#### Validation Error
**Code**: `400 Bad Request`

**Content Example**:
```json
{
    "status": "fail",
    "errors": [
        {
            "msg": "Password must be at least 6 characters long",
            "param": "password",
            "location": "body"
        }
    ]
}
```

### Notes
- Both email and password are required fields
- Password is compared with the hashed password stored in the database
- A JWT token is returned upon successful authentication
- The response includes the user data (excluding password) and a JWT token
- For security reasons, the same error message is returned whether the email doesn't exist or the password is incorrect
