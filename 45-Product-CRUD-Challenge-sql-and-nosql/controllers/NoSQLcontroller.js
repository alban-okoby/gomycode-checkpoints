const Product = require('../models/Product');

class NoSQLController {
  // POST /products - Create a new product
  async createProduct(req, res) {
    try {
      const { name, price, category, inStock } = req.body;
      
      // Validate required fields
      if (!name || price === undefined) {
        return res.status(400).json({
          success: false,
          message: 'Name and price are required fields'
        });
      }

      const product = new Product({
        name,
        price,
        category,
        inStock: inStock !== undefined ? inStock : true
      });

      const savedProduct = await product.save();
      
      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: savedProduct
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating product',
        error: error.message
      });
    }
  }

  // GET /products - Read all products with optional filtering
  async getAllProducts(req, res) {
    try {
      const { category, inStock, minPrice, maxPrice } = req.query;
      
      // Build filter object
      let filter = {};
      if (category) filter.category = category;
      if (inStock !== undefined) filter.inStock = inStock === 'true';
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = parseFloat(minPrice);
        if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
      }

      const products = await Product.find(filter).sort({ createdAt: -1 });
      
      res.status(200).json({
        success: true,
        count: products.length,
        data: products
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching products',
        error: error.message
      });
    }
  }

  // GET /products/:id - Read single product
  async getProductById(req, res) {
    try {
      const { id } = req.params;
      
      // Validate MongoDB ObjectId format
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid product ID format'
        });
      }

      const product = await Product.findById(id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }
      
      res.status(200).json({
        success: true,
        data: product
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching product',
        error: error.message
      });
    }
  }

  // PUT /products/:id - Update product
  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      // Validate MongoDB ObjectId format
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid product ID format'
        });
      }

      // Remove id field if present in updates
      delete updates.id;
      delete updates._id;
      
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        updates,
        { 
          new: true,     
          runValidators: true,
          context: 'query'
        }
      );
      
      if (!updatedProduct) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        data: updatedProduct
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating product',
        error: error.message
      });
    }
  }

  // DELETE /products/:id - Delete product
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      
      // Validate MongoDB ObjectId format
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid product ID format'
        });
      }

      const deletedProduct = await Product.findByIdAndDelete(id);
      
      if (!deletedProduct) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
        data: deletedProduct
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting product',
        error: error.message
      });
    }
  }

  // Additional utility methods
  async bulkCreateProducts(req, res) {
    try {
      const products = req.body.products;
      
      if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Please provide an array of products'
        });
      }
      
      const savedProducts = await Product.insertMany(products);
      
      res.status(201).json({
        success: true,
        message: `${savedProducts.length} products created successfully`,
        data: savedProducts
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating products in bulk',
        error: error.message
      });
    }
  }
}

module.exports = NoSQLController;