import express from 'express';
import { getAllExpensesByUserId } from '../controllers/expense';

const router = express.Router();

router.route('/:userId').get(getAllExpensesByUserId);

export default router;
