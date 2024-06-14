const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const productsRouter = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3001;

const uri = process.env.MONGODB_URI;
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
    productsRouter(db);
    app.use('/api/products', productsRouter);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
  }
}

connectDB().catch(console.dir);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
