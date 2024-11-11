import createHttpError from 'http-errors';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from '../services/products.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getProductsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const products = await getAllProducts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};

export const createProductController = async (req, res, next) => {
  const { name, suppliers, stock, price, category } = req.body;

  if (!name || !suppliers || !stock || !price || !category) {
    return next(createHttpError(400, `Missing required property`));
  }

  const product = await createProduct({
    ...req.body,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a product!',
    data: product,
  });
};

export const updateProductController = async (req, res, next) => {
  const { productId: productId } = req.params;

  const result = await updateProduct(productId, {
    ...req.body,
  });

  if (!result) {
    return next(createHttpError(404, `Product with id ${productId} not found`));
  }

  res.status(200).json({
    status: 200,
    message: `Successfully patched product with id ${productId}!`,
    data: result.product,
  });
};

export const deleteProductController = async (req, res, next) => {
  const { productId } = req.params;

  const product = await deleteProduct(productId);

  if (!product) {
    return next(createHttpError(404, `Product with id ${productId} not found`));
  }

  res.status(204).send();
};
