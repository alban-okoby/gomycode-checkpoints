const express = require('express');
const dotenv = require('dotenv');
const connectMongoDB = require('./config/mongodb');
// const { connectMySQL } = require('./config/mysql');
const NoSQLController = require('./controllers/NoSQLcontroller');
// const SQLController = require('./controllers/SQLcontroller');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize controllers
const noSQLController = new NoSQLController();
// const sqlController = new SQLController();

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  const mongoState = mongoose.connection.readyState;
  const mongoStatus = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  res.json({
    status: 'OK',
    mongodb: mongoStatus[mongoState] || 'unknown',
    timestamp: new Date().toISOString()
  });
});

// ============= MONGODB ROUTES (NoSQL) =============
app.post('/nosql/products', (req, res) => noSQLController.createProduct(req, res));
app.get('/nosql/products', (req, res) => noSQLController.getAllProducts(req, res));
app.get('/nosql/products/:id', (req, res) => noSQLController.getProductById(req, res));
app.put('/nosql/products/:id', (req, res) => noSQLController.updateProduct(req, res));
app.delete('/nosql/products/:id', (req, res) => noSQLController.deleteProduct(req, res));
app.post('/nosql/products/bulk', (req, res) => noSQLController.bulkCreateProducts(req, res));

// Additional MongoDB endpoints
app.get('/nosql/products/category/:category', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============= MYSQL ROUTES (SQL) - Optional =============
// Only add MySQL routes if you have MySQL configured
if (process.env.MYSQL_HOST) {
  app.post('/sql/products', (req, res) => sqlController.createProduct(req, res));
  app.get('/sql/products', (req, res) => sqlController.getAllProducts(req, res));
  app.get('/sql/products/:id', (req, res) => sqlController.getProductById(req, res));
  app.put('/sql/products/:id', (req, res) => sqlController.updateProduct(req, res));
  app.delete('/sql/products/:id', (req, res) => sqlController.deleteProduct(req, res));
  app.get('/sql/products/stats', (req, res) => sqlController.getProductStats(req, res));
}

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Product CRUD API - MongoDB Implementation',
    version: '1.0.0',
    database: 'MongoDB (Authenticated)',
    endpoints: {
      mongodb: {
        create: 'POST /nosql/products',
        getAll: 'GET /nosql/products',
        getOne: 'GET /nosql/products/:id',
        update: 'PUT /nosql/products/:id',
        delete: 'DELETE /nosql/products/:id',
        bulk: 'POST /nosql/products/bulk',
        byCategory: 'GET /nosql/products/category/:category'
      }
    },
    docker: {
      container: 'mongodbcrud',
      port: '27017',
      auth: 'enabled'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
  console.log('Error stack trace:', err.message);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.url}`
  });
});

// Import mongoose for health check
const mongoose = require('mongoose');

// Start server after database connection
const startServer = async () => {
  try {
    // Connect to MongoDB (required)
    await connectMongoDB();
    
    // Optional: Connect to MySQL if configured
    if (process.env.MYSQL_HOST) {
      await connectMySQL();
    }
    
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`MongoDB endpoints: http://localhost:${PORT}/nosql/products`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log(`Docker container: mongodbcrud\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();