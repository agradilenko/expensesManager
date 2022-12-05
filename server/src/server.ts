import express from 'express';
import cors from 'cors';

import { Application } from 'express';

const app: Application = express();

app.use(cors());
app.use(express.json());

const PORT: string | number = process.env.PORT || 5000;

app.listen(PORT, (): void => console.log(`Server is running on PORT ${PORT}`));
