export interface User {
  _id: string,
  email: string,
  displayName: string,
  avatar: null | string,
}

export interface RegisterUserData {
  [key: string]: any,

  email: string,
  password: string,
  displayName: string,
  avatar: null | File
}

export interface LoginUserData {
  email: string,
  password: string,
}

export interface FieldError {
  message: string,
}

export interface RegisterError {
  errors: {
    email: FieldError,
    confirmPassword: FieldError,
    displayName: FieldError,
  }
}

export interface LoginError {
  error: string,
}

