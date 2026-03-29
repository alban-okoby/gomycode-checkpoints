const mongoose = require('mongoose');

const connectMongoDB = async () => {
  try {
    // Use the DATABASE_URI from your .env file
    const mongoURI = process.env.DATABASE_URI || 'mongodb://admin:password@localhost:27017/crud-product?authSource=admin';
    
    // Remove deprecated options - Mongoose v7+ uses them by default
    await mongoose.connect(mongoURI);
    
    console.log('MongoDB connected successfully to database:', mongoose.connection.name);
    console.log('MongoDB connection state:', mongoose.connection.readyState);
    
    //  Test the connection
    const admin = mongoose.connection.db.admin();
    await admin.ping();
    console.log('MongoDB authentication successful');
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('Please check:');
    console.error('  - Docker container is running: docker ps');
    console.error('  - Username/password are correct');
    console.error('  - Database name is correct');
    process.exit(1);
  }
};

module.exports = connectMongoDB;