const { getConnection } = require("../connection");

const findAllProducts = async () => {
  try {
    const conn = await getConnection();
    const [rows] = await conn.query(`
      SELECT p.*, c.name as category_name 
      FROM products p
      JOIN categories c ON p.category_id = c.id
      ORDER BY p.updated_at DESC
    `);

    await conn.end();
    return rows;
  } catch (error) {
    console.error("Database error finding products:", error);
    throw error;
  }
};

const findProductById = async (id) => {
  try {
    const conn = await getConnection();
    const [rows] = await conn.query(
      `
      SELECT p.*, c.id as category_id 
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `,
      [id]
    );

    await conn.end();
    return rows.length === 1 ? rows[0] : null;
  } catch (error) {
    console.error("Database error finding product by id:", error);
    throw error;
  }
};

const findProductColors = async (productId) => {
  try {
    const conn = await getConnection();
    const [rows] = await conn.query(
      `SELECT color_name, color_value 
       FROM product_colors 
       WHERE product_id = ?`,
      [productId]
    );

    await conn.end();
    return rows;
  } catch (error) {
    console.error("Database error finding product colors:", error);
    throw error;
  }
};

const insertProduct = async (name, price, image, description, listed, colors, categoryId) => {
  try {
    const conn = await getConnection();
    const [result] = await conn.execute("INSERT INTO products (name, price, image, description, listed, colors, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)", [name, price, image, description, listed, colors, categoryId]);

    await conn.end();
    return result.insertId;
  } catch (error) {
    console.error("Database error inserting product:", error);
    throw error;
  }
};

const updateProductQuery = async (id, name, price, description, listed, categoryId) => {
  try {
    const conn = await getConnection();
    await conn.execute("UPDATE products SET name = ?, price = ?, description = ?, listed = ?, category_id = ? WHERE id = ?", [name, price, description, listed, categoryId, id]);

    await conn.end();
    return true;
  } catch (error) {
    console.error("Database error updating product:", error);
    throw error;
  }
};

const updateProductImage = async (id, image) => {
  try {
    const conn = await getConnection();
    await conn.execute("UPDATE products SET image = ? WHERE id = ?", [image, id]);

    await conn.end();
    return true;
  } catch (error) {
    console.error("Database error updating product image:", error);
    throw error;
  }
};

const insertProductColor = async (productId, colorName, colorValue) => {
  try {
    const conn = await getConnection();
    await conn.execute("INSERT INTO product_colors (product_id, color_name, color_value) VALUES (?, ?, ?)", [productId, colorName, colorValue]);

    await conn.end();
    return true;
  } catch (error) {
    console.error("Database error inserting product color:", error);
    throw error;
  }
};

const deleteProductColors = async (productId) => {
  try {
    const conn = await getConnection();
    await conn.execute("DELETE FROM product_colors WHERE product_id = ?", [productId]);

    await conn.end();
    return true;
  } catch (error) {
    console.error("Database error deleting product colors:", error);
    throw error;
  }
};

const deleteProductQuery = async (id) => {
  try {
    const conn = await getConnection();
    await conn.execute("DELETE FROM products WHERE id = ?", [id]);

    await conn.end();
    return true;
  } catch (error) {
    console.error("Database error deleting product:", error);
    throw error;
  }
};

const insertProductIntoTrash = async (originalId, name, price, image, description, categoryId) => {
  try {
    const conn = await getConnection();
    await conn.execute("INSERT INTO trashed_products (original_product_id, name, price, image, description, category_id) VALUES (?, ?, ?, ?, ?, ?)", [originalId, name, price, image, description, categoryId]);

    await conn.end();
    return true;
  } catch (error) {
    console.error("Database error inserting product into trash:", error);
    throw error;
  }
};

module.exports = {
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
};
