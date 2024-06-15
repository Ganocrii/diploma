const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const productsRouter = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('Error: MONGODB_URI is not defined in .env file');
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    db = client.db('projectdb');
    // Инициализируем маршрутизатор после подключения к базе данных
    app.use('/api/products', productsRouter(db));
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
  }
}

connectDB().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});