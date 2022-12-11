import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { Application } from 'express';
import mongoose from 'mongoose';
import { ConnectionOptions } from 'tls';
import passport from 'passport';
import { passportStrategy } from './utils/passport';

import expenseRoutes from './routes/expense';
import userRoutes from './routes/user';

const app: Application = express();

dotenv.config();

mongoose
  .connect(
    process.env.MONGO_URI as string,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectionOptions,
  )
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use(passport.initialize());

passportStrategy(passport);

app.use('/api/expense', expenseRoutes);
app.use('/api/users', userRoutes);

const PORT: string | number = process.env.PORT || 5000;

app.listen(PORT, (): void => console.log(`Server is running on PORT ${PORT}`));
