const express = require('express');
const Product = require('../models/Product');

module.exports = (db) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const { businessType, sectors, selectionType, configType } = req.query;
      console.log('Query:', req.query);

      const collection = db.collection('products');

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

      console.log('Software Query:', softwareQuery);
      console.log('Hardware Query:', hardwareQuery);

      const softwareProducts = await collection.find(softwareQuery).toArray();
      const hardwareProducts = await collection.find(hardwareQuery).toArray();
      const products = [...softwareProducts, ...hardwareProducts];

      console.log('Products:', products);
      //console.log('Sending response:', JSON.stringify(products));
      res.json(products);
    } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).send(err);
    }
  });

  return router;
};