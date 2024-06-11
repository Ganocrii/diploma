import React, { useState } from 'react';
import axios from 'axios';
import './CriteriaForm.css';
import { useNavigate } from 'react-router-dom';

const CriteriaForm = ({ setProducts }) => {
  const [criteria, setCriteria] = useState({
    businessType: '',
    sectors: [],
    selectionType: '',
    configType: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'sectors') {
      setCriteria((prevState) => ({
        ...prevState,
        sectors: checked
          ? [...prevState.sectors, value]
          : prevState.sectors.filter((sector) => sector !== value)
      }));
    } else {
      setCriteria({
        ...criteria,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.get('/api/products', {
      params: criteria
    });
    setProducts(response.data);
    navigate('/result');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Вид бизнеса:
          <select name="businessType" value={criteria.businessType} onChange={handleChange}>
            <option value="">Выбрать</option>
            <option value="small">Проект/Малый бизнес (1-20 человек, 1-3 офиса)</option>
            <option value="medium">Средний бизнес (20-50 человек, 3-10 офисов)</option>
            <option value="large">Группа компаний/Корпорация (&gt;50 человек, &gt;10 офисов)</option>
          </select>
        </label>

        <fieldset>
          <legend>Сферы деятельности</legend>
          <ul>
            <li>
          <label>
            <input type="checkbox" name="sectors" value="IT и Телекоммуникации" onChange={handleChange} />
            IT и Телекоммуникации
          </label></li>
          <li>
          <label>
            <input type="checkbox" name="sectors" value="Финансы и Банкинг" onChange={handleChange} />
            Финансы и Банкинг
          </label>
          </li>
          <li>
          <label>
            <input type="checkbox" name="sectors" value="Образование и Наука" onChange={handleChange} />
            Образование и Наука
          </label>
          </li>
          <li>
          <label>
            <input type="checkbox" name="sectors" value="Здравоохранение" onChange={handleChange} />
            Здравоохранение
          </label>
          </li>
          <li>
          <label>
            <input type="checkbox" name="sectors" value="Производство и Промышленность" onChange={handleChange} />
            Производство и Промышленность
          </label>
          </li>
          <li>
          <label>
            <input type="checkbox" name="sectors" value="Розничная торговля и E-commerce" onChange={handleChange} />
            Розничная торговля и E-commerce
          </label>
          </li>
          <li>
          <label>
            <input type="checkbox" name="sectors" value="Логистика и Транспорт" onChange={handleChange} />
            Логистика и Транспорт
          </label>
          </li>
          <li>
          <label>
            <input type="checkbox" name="sectors" value="Маркетинг и Реклама" onChange={handleChange} />
            Маркетинг и Реклама
          </label>
          </li>
          <li>
          <label>
            <input type="checkbox" name="sectors" value="Туризм и Гостиничный бизнес" onChange={handleChange} />
            Туризм и Гостиничный бизнес
          </label>
          </li>
          <li>
          <label>
            <input type="checkbox" name="sectors" value="Юридические услуги" onChange={handleChange} />
            Юридические услуги
          </label>
          </li>
          <li>
          <label>
            <input type="checkbox" name="sectors" value="Строительство и Недвижимость" onChange={handleChange} />
            Строительство и Недвижимость
          </label>
          </li>
          <li>
          <label>
            <input type="checkbox" name="sectors" value="Медиа и Развлечения" onChange={handleChange} />
            Медиа и Развлечения
          </label>
          </li>
          </ul>
        </fieldset>

        <label>
          Тип подбора:
          <select name="selectionType" value={criteria.selectionType} onChange={handleChange}>
            <option value="">Выбрать</option>
            <option value="software">Только ПО</option>
            <option value="hardware">Только оборудование</option>
            <option value="both">ПО и оборудование</option>
          </select>
        </label>

        <label>
          Тип конфигурации:
          <select name="configType" value={criteria.configType} onChange={handleChange}>
            <option value="">Выбрать</option>
            <option value="low">Минимальный бюджет</option>
            <option value="high">Максимальная производительность</option>
          </select>
        </label>

        <button type="submit">Поиск</button>
      </form>
    </div>
  );
};

export default CriteriaForm;
