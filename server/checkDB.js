const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('MONGODB_URI is not defined in the .env file.');
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");

    const db = client.db('projectdb');
    const collection = db.collection('products');

    const products = await collection.find({}).toArray();
    console.log('Products:', products);

    if (products.length === 0) {
      console.log('No products found in the collection.');
    } else {
      console.log('Products found in the collection:', products);
    }
  } catch (error) {
    console.error('Error connecting to MongoDB or fetching products:', error);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
