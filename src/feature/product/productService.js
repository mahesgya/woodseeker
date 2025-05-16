const {
  findAllProducts,
  findProductById,
  findProductColors,
  insertProduct,
  updateProductQuery,
  updateProductImage,
  insertProductColor,
  deleteProductColors,
  deleteProductQuery,
  insertProductIntoTrash,
} = require("../../database/query/productQueries");

const { findAllCategories, findCategoryByName, insertCategory } = require("../../database/query/categoryQueries");

const getAllProducts = async () => {
  try {
    const products = await findAllProducts();

    return products;
  } catch (error) {
    console.error("Error getting products:", error);
    throw error;
  }
};

const createProduct = async (productData) => {
  try {
    const { name, price, image, description, listed, category, colors } = productData;

    let categoryId = await getCategoryId(category);
    const productId = await insertProduct(name, price, image, description, listed ? 1 : 0, colors, categoryId);

    return { id: productId };
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

const updateProduct = async (productData) => {
  try {
    const { id, name, price, image, description, listed, category, colors } = productData;

    let categoryId = await getCategoryId(category);

    await updateProductQuery(id, name, price, description, listed ? 1 : 0, categoryId);

    if (image) {
      await updateProductImage(id, image);
    }


    return { success: true };
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    const product = await findProductById(id);

    if (!product) {
      return { success: false, message: "Product not found" };
    }

    await deleteProductQuery(id);

    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

const getCategoryId = async (categoryName) => {
  const existingCategory = await findCategoryByName(categoryName);

  if (existingCategory) {
    return existingCategory.id;
  }

  return await insertCategory(categoryName);
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
