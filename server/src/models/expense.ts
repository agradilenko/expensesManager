import mongoose from 'mongoose';

export interface IExpense extends mongoose.Document {
  name: string;
  description?: string;
  value: number;
  date: string;
  placeOfExpense?: string;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ExpenseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    value: {
      type: Number,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    placeOfExpense: {
      type: String,
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Expense = mongoose.model<IExpense>('Expense', ExpenseSchema);

export default Expense;
