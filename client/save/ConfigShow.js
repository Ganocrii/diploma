import React from 'react';

const ConfigurationResult = ({ products, configurationType, sector, performanceType }) => {
  // Фильтрация продуктов на основе выбранных критериев
  const filteredProducts = products.filter(product => {
    if (product.type === 'software' && configurationType === 'hardware') return false;
    if (product.type === 'hardware' && configurationType === 'software') return false;
    if (product.sectors.indexOf(sector) === -1 && product.sectors.indexOf('all') === -1) return false;
    if (product.performance.indexOf(performanceType) === -1) return false;
    return true;
  });

  return (
    <div className="configuration-result">
      {filteredProducts.map(product => (
        <div key={product._id} className="product-card">
          <img src={product.image} alt={product.name} className="product-image" />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          {product.type === 'hardware' && (
            <ul className="specs">
              {Object.entries(product.specs).map(([key, value]) => (
                <li key={key}>{key}: {value}</li>
              ))}
            </ul>
          )}
          <a href={product.link} target="_blank" rel="noopener noreferrer" className="details-button">Подробнее</a>
        </div>
      ))}
    </div>
  );
};

export default ConfigurationResult;
