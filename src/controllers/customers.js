import createHttpError from 'http-errors';
import { getAllCustomers, getCustomerById } from '../services/customers.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getCustomersController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const customers = await getAllCustomers({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found customers!',
    data: customers,
  });
};

export const getCustomerByIdController = async (req, res, next) => {
  const { customerId: customerId } = req.params;

  const customer = await getCustomerById(customerId);

  if (!customer) {
    return next(
      createHttpError(404, `Customer with id ${customerId} not found`),
    );
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found customer with id ${customerId}!`,
    data: customer,
  });
};
