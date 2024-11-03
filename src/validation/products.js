import Joi from 'joi';

export const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name have at least {#limit} characters',
    'string.max': 'Name have at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  suppliers: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Suppliers should be a string',
    'string.min': 'Suppliers have at least {#limit} characters',
    'string.max': 'Suppliers have at most {#limit} characters',
    'any.required': 'Suppliers is required',
  }),
  stock: Joi.number().required().messages({
    'number.base': 'Stock should be a number',
    'any.required': 'Stock is required',
  }),
  price: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Price should be a string',
    'string.min': 'Price have at least {#limit} characters',
    'string.max': 'Price have at most {#limit} characters',
    'any.required': 'Price is required',
  }),
  category: Joi.string()
    .valid(
      'Medicine',
      'Heart',
      'Head',
      'Hand',
      'Leg',
      'Dental Care',
      'Skin Care',
    )
    .required()
    .messages({
      'string.base': 'Category should be a string',
      'any.only':
        'Category must be one of the following: Medicine, Heart, Head, Hand, Leg, Dental Care, Skin Care',
      'any.required': 'Category is required',
    }),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name have at least {#limit} characters',
    'string.max': 'Name have at most {#limit} characters',
  }),
  suppliers: Joi.string().min(3).max(20).messages({
    'string.base': 'Suppliers should be a string',
    'string.min': 'Suppliers have at least {#limit} characters',
    'string.max': 'Suppliers have at most {#limit} characters',
  }),
  stock: Joi.number().messages({
    'number.base': 'Stock should be a number',
  }),
  price: Joi.string().min(3).max(20).messages({
    'string.base': 'Price should be a string',
    'string.min': 'Price have at least {#limit} characters',
    'string.max': 'Price have at most {#limit} characters',
  }),
  category: Joi.string()
    .valid(
      'Medicine',
      'Heart',
      'Head',
      'Hand',
      'Leg',
      'Dental Care',
      'Skin Care',
    )
    .messages({
      'string.base': 'Category should be a string',
      'any.only':
        'Category must be one of the following: Medicine, Heart, Head, Hand, Leg, Dental Care, Skin Care',
    }),
});
