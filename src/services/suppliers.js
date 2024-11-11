import { SORT_ORDER } from '../constants/index.js';
import { SuppliersCollection } from '../db/models/supplier.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllSuppliers = async ({
  page = 1,
  perPage = 5,
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'name',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const suppliersQuery = SuppliersCollection.find();

  if (filter.name) {
    const nameRegex = new RegExp(filter.name, 'i');
    suppliersQuery.where('name').regex(nameRegex);
  }

  const [suppliersCount, suppliers] = await Promise.all([
    SuppliersCollection.find().merge(suppliersQuery).countDocuments(),
    suppliersQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(suppliersCount, perPage, page);

  return { suppliers: suppliers, ...paginationData };
};

export const createSupplier = async (payload) => {
  const supplier = await SuppliersCollection.create({ ...payload });
  return supplier;
};

export const updateSupplier = async (supplierId, payload, options = {}) => {
  const rawResult = await SuppliersCollection.findOneAndUpdate(
    {
      _id: supplierId,
    },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    product: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
