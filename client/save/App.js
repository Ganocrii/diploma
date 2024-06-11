import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import CriteriaForm from './CriteriaForm';
import ConfigShow from './ConfigShow';

function Home() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/criteria');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Конфигуратор ИТ инфраструктуры в условиях импортозамещения</h1>
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
  return (
    <Router>
      <Routes>
        <Route path="/criteria" element={<CriteriaForm />} />
        <Route path="/result" element={<ConfigShow />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;


