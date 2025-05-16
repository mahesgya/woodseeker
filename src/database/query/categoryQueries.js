
const { getConnection } = require('../connection');

const findAllCategories = async () => {
  try {
    const conn = await getConnection();
    const [rows] = await conn.query('SELECT * FROM categories ORDER BY name');
    
    await conn.end();
    return rows;
  } catch (error) {
    console.error('Database error finding categories:', error);
    throw error;
  }
};

const findCategoryByName = async (name) => {
  try {
    const conn = await getConnection();
    const [rows] = await conn.execute('SELECT id FROM categories WHERE name = ?', [name]);
    
    await conn.end();
    return rows.length === 1 ? rows[0] : null;
  } catch (error) {
    console.error('Database error finding category by name:', error);
    throw error;
  }
};

const insertCategory = async (name) => {
  try {
    const conn = await getConnection();
    const [result] = await conn.execute('INSERT INTO categories (name) VALUES (?)', [name]);
    
    await conn.end();
    return result.insertId;
  } catch (error) {
    console.error('Database error inserting category:', error);
    throw error;
  }
};

module.exports = {
  findAllCategories,
  findCategoryByName,
  insertCategory
};