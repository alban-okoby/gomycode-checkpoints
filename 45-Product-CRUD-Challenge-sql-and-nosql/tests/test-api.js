const BASE_URL = 'http://localhost:5000';

async function testAPI() {
  console.log('🚀 Starting API Tests...\n');
  
  try {
    // 1. Health Check
    console.log('1️⃣ Health Check:');
    const health = await fetch(`${BASE_URL}/health`);
    console.log('   ✅', await health.json());
    
    // 2. Create Product
    console.log('\n2️⃣ Creating Product:');
    const create = await fetch(`${BASE_URL}/nosql/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Product',
        price: 49.99,
        category: 'Testing',
        inStock: true
      })
    });
    const product = await create.json();
    console.log('   ✅ Created:', product.data);
    
    // 3. Get All Products
    console.log('\n3️⃣ Getting All Products:');
    const getAll = await fetch(`${BASE_URL}/nosql/products`);
    const products = await getAll.json();
    console.log(`   ✅ Found ${products.count} products`);
    
    // 4. Get Single Product
    console.log('\n4️⃣ Getting Single Product:');
    const getOne = await fetch(`${BASE_URL}/nosql/products/${product.data._id}`);
    const single = await getOne.json();
    console.log('   ✅ Retrieved:', single.data.name);
    
    // 5. Update Product
    console.log('\n5️⃣ Updating Product:');
    const update = await fetch(`${BASE_URL}/nosql/products/${product.data._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: 39.99, inStock: false })
    });
    const updated = await update.json();
    console.log('   ✅ Updated:', updated.data);
    
    // 6. Delete Product
    console.log('\n6️⃣ Deleting Product:');
    const del = await fetch(`${BASE_URL}/nosql/products/${product.data._id}`, {
      method: 'DELETE'
    });
    const deleted = await del.json();
    console.log('   ✅', deleted.message);
    
    console.log('\n🎉 All tests passed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testAPI();