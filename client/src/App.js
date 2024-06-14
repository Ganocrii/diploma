import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import CriteriaForm from './CriteriaForm';
import ConfigurationResult from './ConfigShow';

function Home() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/criteria');
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-title">
          <h1>Конфигуратор ИТ инфраструктуры в условиях импортозамещения</h1>
        </div>
      </header>
      <div className="App-body">
        <button onClick={handleStartClick} className="Start-button">
          Старт
        </button>
      </div>
    </div>
  );
}

function App() {
  const [criteria, setCriteria] = useState({
    businessType: '',
    sectors: [],
    selectionType: '',
    configType: ''
  });
  const [products, setProducts] = useState([]);

  const handleCriteriaSubmit = (data) => {
    setProducts(data.products || []);  // Ensure products is an array
    setCriteria({
      businessType: data.businessType,
      sectors: data.sectors,
      selectionType: data.selectionType,
      configType: data.configType
    });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/criteria"
          element={<CriteriaForm criteria={criteria} onSubmit={handleCriteriaSubmit} />}
        />
        <Route
          path="/result"
          element={
            <ConfigurationResult
              products={products}
              configurationType={criteria.selectionType}
              sectors={criteria.sectors}
              performanceType={criteria.configType}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
