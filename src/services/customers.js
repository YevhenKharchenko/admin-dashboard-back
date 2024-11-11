import { SORT_ORDER } from '../constants/index.js';
import { CustomersCollection } from '../db/models/customer.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllCustomers = async ({
  page = 1,
  perPage = 5,
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'name',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const customersQuery = CustomersCollection.find();

  if (filter.name) {
    const nameRegex = new RegExp(filter.name, 'i');
    customersQuery.where('name').regex(nameRegex);
  }

  const [customersCount, customers] = await Promise.all([
    CustomersCollection.find().merge(customersQuery).countDocuments(),
    customersQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(customersCount, perPage, page);

  return { customers: customers, ...paginationData };
};

export const getCustomerById = async (customerId) => {
  const customer = await CustomersCollection.findById(customerId);
  return customer;
};
