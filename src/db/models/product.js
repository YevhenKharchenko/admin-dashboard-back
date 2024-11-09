import { model, Schema } from 'mongoose';

const productsSchema = new Schema(
  {
    photo: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    suppliers: {
      type: String,
      required: true,
    },
    stock: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        'Medicine',
        'Heart',
        'Head',
        'Hand',
        'Leg',
        'Dental Care',
        'Skin Care',
      ],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ProductsCollection = model('Product', productsSchema);
