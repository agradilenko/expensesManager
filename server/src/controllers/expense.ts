import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Expense from '../models/expense';

export const getAllExpensesByUserId = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.query.userId;

  const expenses = await Expense.find({ user: userId });
  res.status(201).json({
    expenses,
  });
});
