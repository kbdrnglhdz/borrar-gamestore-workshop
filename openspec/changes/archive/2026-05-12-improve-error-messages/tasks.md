## 1. Backend — Input Validation

- [x] 1.1 Add required field validation for email and password in login route (`backend/src/routes/auth.ts`)
- [x] 1.2 Add required field validation for name, email, and password in register route
- [x] 1.3 Replace raw `error.message` in 500 catch blocks with "Something went wrong"

## 2. Frontend — Network Error Handling

- [x] 2.1 Add try/catch to `api.auth.login()` and `api.auth.register()` in `frontend/src/services/api.ts` to return a user-friendly network error
