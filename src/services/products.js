import { SORT_ORDER } from '../constants/index.js';
import { ProductsCollection } from '../db/models/product.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllProducts = async ({
  page = 1,
  perPage = 5,
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'name',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const productsQuery = ProductsCollection.find();

  if (filter.name) {
    const nameRegex = new RegExp(filter.name, 'i');
    productsQuery.where('name').regex(nameRegex);
  }

  const [productsCount, products] = await Promise.all([
    ProductsCollection.find().merge(productsQuery).countDocuments(),
    productsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(productsCount, perPage, page);

  return { products: products, ...paginationData };
};

export const createProduct = async (payload) => {
  const product = await ProductsCollection.create({ ...payload });
  return product;
};

export const updateProduct = async (productId, payload, options = {}) => {
  const rawResult = await ProductsCollection.findOneAndUpdate(
    {
      _id: productId,
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

export const deleteProduct = async (productId) => {
  const product = await ProductsCollection.findOneAndDelete({
    _id: productId,
  });
  return product;
};
