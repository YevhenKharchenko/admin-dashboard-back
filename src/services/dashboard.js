import { SORT_ORDER } from '../constants/index.js';
import { TransactionsCollection } from '../db/models/transaction.js';
import { ProductsCollection } from '../db/models/product.js';
import { SuppliersCollection } from '../db/models/supplier.js';
import { CustomersCollection } from '../db/models/customer.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getDashboardInfo = async ({
  page = 1,
  perPage = 6,
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'name',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const transactionsQuery = TransactionsCollection.find();

  if (filter.name) {
    const nameRegex = new RegExp(filter.name, 'i');
    transactionsQuery.where('name').regex(nameRegex);
  }

  const [
    customers,
    transactionsCount,
    transactions,
    productsCount,
    suppliersCount,
    customersCount,
  ] = await Promise.all([
    CustomersCollection.find().limit(5),
    TransactionsCollection.find().merge(transactionsQuery).countDocuments(),
    transactionsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
    ProductsCollection.find().countDocuments(),
    SuppliersCollection.find().countDocuments(),
    CustomersCollection.find().countDocuments(),
  ]);

  const paginationData = calculatePaginationData(
    transactionsCount,
    perPage,
    page,
  );

  return {
    customers: customers,
    transactions: transactions,
    ...paginationData,
    productsCount: productsCount,
    suppliersCount: suppliersCount,
    customersCount: customersCount,
  };
};
