import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
// import keys from '../../config/keys';
// import passport from 'passport';
import asyncHandler from 'express-async-handler';

import User from '../models/user';
import { validateLoginInput, validateRegisterInput } from '../validation';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  }

  const { name, email, password } = req.body;

  const user = await User.findOne({ email: req.body.email });

  if (user) {
    res.status(400).json({ email: 'Email already exists' });
  } else {
    const newUser = new User({
      name,
      email,
      password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save();
        res.status(201).json({ user: newUser });
      });
    });
  }
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ emailNotFound: 'Email not found' });
  } else
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
        };

        jwt.sign(
          payload,
          process.env.secret as string,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
            });
          },
        );
      } else {
        res.status(400).json({ passwordIncorrect: 'Password incorrect' });
      }
    });
});
