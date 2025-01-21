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

## Get User Profile
Endpoint for retrieving the authenticated user's profile information.

**URL**: `/users/profile`

**Method**: `GET`

**Authentication**: Required (JWT token in cookie or Authorization header)

### Headers
```
Cookie: token=jwt_token_string
```
OR
```
Authorization: Bearer jwt_token_string
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
    }
}
```

### Error Response

#### Unauthorized
**Code**: `401 Unauthorized`

**Content Example**:
```json
{
    "message": "Unauthorized"
}
```

## Logout User
Endpoint for logging out the current user and invalidating their token.

**URL**: `/users/logout`

**Method**: `GET`

**Authentication**: Required (JWT token in cookie or Authorization header)

### Headers
```
Cookie: token=jwt_token_string
```
OR
```
Authorization: Bearer jwt_token_string
```

### Success Response
**Code**: `200 OK`

**Content Example**:
```json
{
    "message": "Logout successful"
}
```

**Effects**:
- Clears the token cookie from the client
- Adds the token to a blacklist to prevent reuse
- Invalidates the current session

### Error Response

#### Unauthorized
**Code**: `401 Unauthorized`

**Content Example**:
```json
{
    "message": "Unauthorized"
}
```

### Notes
- Both endpoints require authentication via JWT token
- Token can be provided either in a cookie (recommended) or Authorization header
- After logout, the token is blacklisted and cannot be reused
- Cookie is set with httpOnly flag for security
- Cookie expires in 90 days from creation

# Captain Registration API Documentation

## Register Captain
Endpoint for registering a new captain in the system.

**URL**: `/captain/register`

**Method**: `POST`

**Content-Type**: `application/json`

### Request Body
```json
{
    "fullName": {
        "firstName": "string",    // minimum 3 characters, required
        "lastName": "string"      // minimum 3 characters, required
    },
    "email": "string",           // valid email format, required
    "password": "string",        // minimum 6 characters, required
    "vehicle": {
        "color": "string",       // minimum 3 characters, required
        "plate": "string",       // minimum 3 characters, required
        "capacity": "number",    // minimum value 1, required
        "vehicleType": "string"  // must be one of: "auto", "motorcycle", "car", required
    }
}
```

### Example Request
```json
{
    "fullName": {
        "firstName": "John",
        "lastName": "Driver"
    },
    "email": "john.driver@example.com",
    "password": "password123",
    "vehicle": {
        "color": "red",
        "plate": "MP 04 XYI 6204",
        "capacity": 3,
        "vehicleType": "car"
    }
}
```

### Success Response
**Code**: `201 Created`

**Content Example**:
```json
{
    "fullName": {
        "firstName": "John",
        "lastName": "Driver"
    },
    "email": "john.driver@example.com",
    "vehicle": {
        "color": "red",
        "plate": "MP 04 XYI 6204",
        "capacity": 3,
        "vehicleType": "car"
    },
    "_id": "captain_id",
    "status": "inactive",
    "socketId": null,
    "createdAt": "2025-01-21T06:40:18.123Z",
    "updatedAt": "2025-01-21T06:40:18.123Z"
}
```

### Error Responses

#### Validation Error
**Code**: `400 Bad Request`

**Content Example**:
```json
{
    "errors": [
        {
            "msg": "Vehicle type must be either auto, motorcycle, or car",
            "param": "vehicle.vehicleType",
            "location": "body"
        }
    ]
}
```

#### Captain Already Exists
**Code**: `400 Bad Request`

**Content Example**:
```json
{
    "message": "Captain already exists"
}
```

### Notes
- All fields marked as required must be provided
- Email must be unique in the system
- Password will be hashed before storage
- Vehicle type must be one of the allowed values: "auto", "motorcycle", "car"
- Vehicle capacity must be a number greater than 0
- Captain status is set to "inactive" by default
- The response will not include the password field
