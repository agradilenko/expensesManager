import Validator from 'validator';
import isEmpty from 'is-empty';
import { IErrors, UserAuthPayload, UserRegistrationPayload } from '../types';

export const validateRegisterInput = (data: UserRegistrationPayload): { errors: IErrors; isValid: boolean } => {
  const errors: IErrors = {};

  let { name, email, password } = data;

  name = !isEmpty(name) ? name : '';
  email = !isEmpty(email) ? email : '';
  password = !isEmpty(password) ? password : '';

  if (Validator.isEmpty(name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export const validateLoginInput = (data: UserAuthPayload): { errors: IErrors; isValid: boolean } => {
  const errors: IErrors = {};

  let { email, password } = data;

  email = !isEmpty(email) ? email : '';
  password = !isEmpty(password) ? password : '';

  if (Validator.isEmpty(email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
