const express = require('express');
const router = express.Router();

module.exports = (db) => {
  const Product = db.collection('products');

  router.get('/', async (req, res) => {
    try {
      const { businessType, sectors, selectionType, configType } = req.query;
      console.log('Query:', req.query);

      const softwareQuery = {
        sectors: { '$in': [sectors, 'all'] },
        type: 'software'
      };

      const hardwareQuery = {
        sectors: { '$in': [sectors, 'all'] },
        type: 'hardware',
        performance: configType
      };

      console.log('Software Query:', softwareQuery);
      console.log('Hardware Query:', hardwareQuery);

      const softwareProducts = await Product.find(softwareQuery).toArray();
      const hardwareProducts = await Product.find(hardwareQuery).toArray();

      const products = [...softwareProducts, ...hardwareProducts];
      console.log('Products:', products);
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Server error');
    }
  });

  return router;
};
