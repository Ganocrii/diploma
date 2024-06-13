const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Подключение к MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const User = require('./models/User');
const Product = require('./models/Product');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/data', (req, res) => {
  res.json({ message: "This is data from the server" });
});

app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(200).send('User created successfully');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(200).send('Product created successfully');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const { businessType, sectors, selectionType, configType } = req.query;
    console.log('Query:', req.query);

    const parsedSectors = Array.isArray(sectors) ? sectors : [sectors];
    const softwareQuery = {
      sectors: { $in: [...parsedSectors, 'all'] },
      type: 'software'
    };
    const hardwareQuery = {
      sectors: { $in: [...parsedSectors, 'all'] },
      type: 'hardware'
    };

    if (configType) {
      hardwareQuery.performance = configType === 'low' ? 'low' : 'high';
    }

    console.log('Software Query:', softwareQuery);  // Логирование запроса для отладки
    console.log('Hardware Query:', hardwareQuery);  // Логирование запроса для отладки

    const softwareProducts = await Product.find(softwareQuery);
    const hardwareProducts = await Product.find(hardwareQuery);
    const products = [...softwareProducts, ...hardwareProducts];
    console.log('Products:', products);
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);  // Логирование ошибки
    res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
