import { SORT_ORDER } from '../constants/index.js';
import { OrdersCollection } from '../db/models/order.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllOrders = async ({
  page = 1,
  perPage = 5,
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'name',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const ordersQuery = OrdersCollection.find();

  if (filter.type) {
    ordersQuery.where('name').equals(filter.type);
  }

  const [ordersCount, orders] = await Promise.all([
    OrdersCollection.find().merge(ordersQuery).countDocuments(),
    ordersQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(ordersCount, perPage, page);

  return { orders, ...paginationData };
};