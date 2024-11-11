import createHttpError from 'http-errors';
import {
  createSupplier,
  getAllSuppliers,
  updateSupplier,
} from '../services/suppliers.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getSuppliersController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const suppliers = await getAllSuppliers({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found suppliers!',
    data: suppliers,
  });
};

export const createSupplierController = async (req, res, next) => {
  const { name, suppliers, address, amount, date, status } = req.body;

  if (!name || !suppliers || !address || !amount || !date || !status) {
    return next(createHttpError(400, `Missing required property`));
  }

  const supplier = await createSupplier({
    ...req.body,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a supplier!',
    data: supplier,
  });
};

export const updateSupplierController = async (req, res, next) => {
  const { supplierId: supplierId } = req.params;

  const result = await updateSupplier(supplierId, {
    ...req.body,
  });

  if (!result) {
    return next(
      createHttpError(404, `Supplier with id ${supplierId} not found`),
    );
  }

  res.status(200).json({
    status: 200,
    message: `Successfully patched supplier with id ${supplierId}!`,
    data: result.supplier,
  });
};
