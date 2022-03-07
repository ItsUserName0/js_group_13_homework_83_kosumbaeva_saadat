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

export interface FieldError {
  message: string,
}

export interface RegisterError {
  errors: {
    email: FieldError,
    password: FieldError,
    displayName: FieldError,
  }
}

