import Joi from 'joi';

export const createSupplierSchema = Joi.object({
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
  address: Joi.string().required().messages({
    'string.base': 'Address should be a string',
    'string.min': 'Address have at least {#limit} characters',
    'string.max': 'Address have at most {#limit} characters',
    'any.required': 'Address is required',
  }),
  date: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Date should be a string',
    'string.min': 'Date have at least {#limit} characters',
    'string.max': 'Date have at most {#limit} characters',
    'any.required': 'Date is required',
  }),
  amount: Joi.string().messages({
    'string.base': 'Amount should be a string',
    'string.min': 'Amount have at least {#limit} characters',
    'string.max': 'Amount have at most {#limit} characters',
    'any.required': 'Amount is required',
  }),
  status: Joi.string().valid('Active', 'Deactive').required().messages({
    'string.base': 'Status should be a string',
    'any.only': 'Status must be one of the following: Active, Deactive',
    'any.required': 'Status is required',
  }),
});

export const updateSupplierSchema = Joi.object({
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
  address: Joi.string().messages({
    'string.base': 'Address should be a string',
    'string.min': 'Address have at least {#limit} characters',
    'string.max': 'Address have at most {#limit} characters',
  }),
  date: Joi.string().min(3).max(20).messages({
    'string.base': 'Date should be a string',
    'string.min': 'Date have at least {#limit} characters',
    'string.max': 'Date have at most {#limit} characters',
  }),
  amount: Joi.string().messages({
    'string.base': 'Amount should be a string',
    'string.min': 'Amount have at least {#limit} characters',
    'string.max': 'Amount have at most {#limit} characters',
  }),
  status: Joi.string().valid('Active', 'Deactive').messages({
    'string.base': 'Status should be a string',
    'any.only': 'Status must be one of the following: Active, Deactive',
  }),
});
