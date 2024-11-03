import { model, Schema } from 'mongoose';

const transactionsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Income', 'Expense', 'Error'],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const TransactionsCollection = model('Transaction', transactionsSchema);
