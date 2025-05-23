# Mock Services Documentation

## Login Service

The mock login service provides authentication functionality for development and testing.

### Available Test Accounts

| Username | Password | Email | Description |
|----------|----------|-------|-------------|
| `admin` | `admin123` | admin@example.com | Administrator account |
| `demo` | `demo123` | demo@example.com | Demo user account |
| `user` | `user123` | user@example.com | Regular user account |

### Endpoints

#### POST /api/auth/login
Authenticates a user and returns a session token.

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "result": {
    "session": {
      "user": {
        "_key": "177651341",
        "email": "admin@example.com",
        "createdOn": 1698765432000,
        "lastLogin": 1701357432000,
        "updatedOn": 1701357432000,
        "gravatar": "https://www.gravatar.com/avatar/..."
      },
      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9...",
      "createdOn": 1701357432000
    }
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid username or password"
}
```

#### POST /api/auth/logout
Logs out the current user.

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### GET /api/auth/me
Returns the current authenticated user's information.

**Headers Required:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "result": {
    "_key": "177651341",
    "email": "admin@example.com",
    "username": "admin",
    "gravatar": "https://www.gravatar.com/avatar/..."
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

### Features

- **Realistic JWT tokens**: Generated with proper structure (header.payload.signature)
- **Network delay simulation**: 800ms delay to simulate real network conditions
- **Gravatar integration**: Each user has a unique avatar using different Gravatar styles
- **Proper error handling**: Returns appropriate HTTP status codes and error messages
- **Session structure**: Matches the TypeScript interfaces defined in the application

### Testing Login Flow

1. Start the development server with `npm start`
2. Navigate to the application
3. You'll see the login screen
4. Enter one of the test credentials above
5. Click "Sign In"
6. On successful login, you'll be redirected to the dashboard
7. Your avatar will appear in the top-right corner
8. Click the avatar and select "Logout" to sign out