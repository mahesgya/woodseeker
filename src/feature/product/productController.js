const {getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct} = require('./productService');

const getAllProductsController = async (req, res) => {
  try {
    const products = await getAllProducts();
    return res.json({ success: true, products });
  } catch (error) {
    console.error('Error getting products:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const createProductController = async (req, res) => {
  try {
    const { name, price, image, description, listed, category, colors } = req.body;
    const result = await createProduct({ name, price, image, description, listed, category, colors });
    
    return res.json({
      success: true,
      message: 'Product added successfully',
      id: result.id
    });
  } catch (error) {
    console.error('Error adding product:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateProductController = async (req, res) => {
  try {
    const { id, name, price, image, description, listed, category, colors } = req.body;

    if (!id) {
      return res.json({ success: false, message: 'Product ID is required' });
    }

    await updateProduct({ id, name, price, image, description, listed, category, colors });
    return res.json({ success: true, message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.json({ success: false, message: 'Product ID is required' });
    }

    const result = await deleteProduct(id);
    
    if (result.success) {
      return res.json({ success: true, message: 'Product moved to trash' });
    } else {
      return res.json({ success: false, message: result.message });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getAllProductsController,
  createProductController,
  updateProductController,
  deleteProductController
};