const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  specs: {
    cpu: String,
    ram: String,
    storage: String,
    ports: String,
    wifi: Boolean
  },
  price: Number, // Это свойство для оборудования
  cost: { // Это для ПО
    type: { type: String, enum: ['free', 'paid'] }, // Бесплатное или платное ПО
    paymentModel: String // Модель оплаты: подписка, ключ и т.д.
  },
  sectors: [String], // Список сфер деятельности, для которых подходит продукт
  type: { type: String, enum: ['software', 'hardware'] }, // Тип продукта: software или hardware
  performance: { type: String, enum: ['low', 'high'] }, // Производительность: low или high
  description: String, // Описание продукта
  link: String, // Ссылка на продукт
  equipmentType: { type: String, enum: [
    'os', 'office', 'antivirus', 'special', 'pc', 'server', 'storage', 'router', 'switch'
  ] } // Категории продуктов
});

module.exports = mongoose.model('Product', productSchema);
