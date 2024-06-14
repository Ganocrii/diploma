import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ConfigShow.css';

const ConfigurationResult = ({ products, configurationType, sectors, performanceType }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/criteria', { state: { criteria: { configurationType, sectors, performanceType }, reset: false } });
  };

  const categories = {
    os: 'Операционные системы',
    office: 'Офисные пакеты',
    antivirus: 'Антивирусное ПО',
    special: 'Специальное ПО',
    pc: 'Персональные компьютеры',
    server: 'Серверы',
    storage: 'Системы хранения данных',
    router: 'Маршрутизаторы',
    switch: 'Коммутаторы'
  };

  const categorizedProducts = {
    os: [],
    office: [],
    antivirus: [],
    special: [],
    pc: [],
    server: [],
    storage: [],
    router: [],
    switch: []
  };

  if (Array.isArray(products)) {
    products.forEach(product => {
      if (configurationType === 'software' && product.type === 'software') {
        categorizedProducts[product.equipmentType].push(product);
      } else if (configurationType === 'hardware' && product.type === 'hardware') {
        if (product.performance === performanceType) {
          categorizedProducts[product.equipmentType].push(product);
        }
      } else if (configurationType === 'both') {
        if (product.type === 'software') {
          categorizedProducts[product.equipmentType].push(product);
        } else if (product.type === 'hardware' && product.performance === performanceType) {
          categorizedProducts[product.equipmentType].push(product);
        }
      }
    });
  } else {
    console.error('Products is not an array:', products);
  }

  return (
    <div className="configuration-result">
      <div className="config-background"></div>
      <button className="back-button" onClick={handleBackClick}>Изменить критерии</button>
      {Object.keys(categories).map(category => (
        categorizedProducts[category].length > 0 && (
          <div key={category} className="category">
            <h2 className="category-title">{categories[category]}</h2>
            {categorizedProducts[category].map(product => (
              <div key={product._id} className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                {product.type === 'hardware' && product.specs && (
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
        )
      ))}
    </div>
  );
};

export default ConfigurationResult;
