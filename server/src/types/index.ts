export interface IErrors {
  name?: string;
  email?: string;
  password?: string;
}

export interface UserAuthPayload {
  email: string;
  password: string;
}

export interface UserRegistrationPayload extends UserAuthPayload {
  name: string;
}
