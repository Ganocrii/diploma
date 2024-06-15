import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CriteriaForm.css';
import { useNavigate} from 'react-router-dom';

const CriteriaForm = ({ criteria, onSubmit }) => {
  const [currentCriteria, setCurrentCriteria] = useState({
    businessType: '',
    sectors: [],
    selectionType: '',
    configType: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (criteria) {
      setCurrentCriteria(criteria);
    }
  }, [criteria]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'sectors') {
      setCurrentCriteria((prevState) => ({
        ...prevState,
        sectors: checked
          ? [...prevState.sectors, value]
          : prevState.sectors.filter((sector) => sector !== value)
      }));
    } else {
      setCurrentCriteria({
        ...currentCriteria,
        [name]: value
      });
    }
  };

  const handleBusinessTypeChange = (value) => {
    setCurrentCriteria({
      ...currentCriteria,
      businessType: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`, {
        params: currentCriteria
      });
      console.log('Fetched products:', response.data);
      onSubmit({ ...currentCriteria, products: response.data });
      navigate('/result');
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-background"></div>
      <form onSubmit={handleSubmit}>
        <div className="business-type">
          <label>Вид бизнеса:</label>
          <div className="business-type-buttons">
            <button
              type="button"
              className={currentCriteria.businessType === 'small' ? 'active' : ''}
              onClick={() => handleBusinessTypeChange('small')}
            >
              Проект/Малый бизнес (1-20 человек, 1-3 офиса)
            </button>
            <button
              type="button"
              className={currentCriteria.businessType === 'medium' ? 'active' : ''}
              onClick={() => handleBusinessTypeChange('medium')}
            >
              Средний бизнес (20-50 человек, 3-10 офисов)
            </button>
            <button
              type="button"
              className={currentCriteria.businessType === 'large' ? 'active' : ''}
              onClick={() => handleBusinessTypeChange('large')}
            >
              Группа компаний/Корпорация (&gt;50 человек, &gt;10 офисов)
            </button>
          </div>
        </div>

        <fieldset>
          <legend>Сферы деятельности</legend>
          <ul>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="sectors"
                  value="IT и Телекоммуникации"
                  checked={currentCriteria.sectors.includes("IT и Телекоммуникации")}
                  onChange={handleChange}
                />
                IT и Телекоммуникации
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="sectors"
                  value="Финансы и Банкинг"
                  checked={currentCriteria.sectors.includes("Финансы и Банкинг")}
                  onChange={handleChange}
                />
                Финансы и Банкинг
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="sectors"
                  value="Образование и Наука"
                  checked={currentCriteria.sectors.includes("Образование и Наука")}
                  onChange={handleChange}
                />
                Образование и Наука
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="sectors"
                  value="Здравоохранение"
                  checked={currentCriteria.sectors.includes("Здравоохранение")}
                  onChange={handleChange}
                />
                Здравоохранение
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="sectors"
                  value="Производство и Промышленность"
                  checked={currentCriteria.sectors.includes("Производство и Промышленность")}
                  onChange={handleChange}
                />
                Производство и Промышленность
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="sectors"
                  value="Розничная торговля и E-commerce"
                  checked={currentCriteria.sectors.includes("Розничная торговля и E-commerce")}
                  onChange={handleChange}
                />
                Розничная торговля и E-commerce
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="sectors"
                  value="Логистика и Транспорт"
                  checked={currentCriteria.sectors.includes("Логистика и Транспорт")}
                  onChange={handleChange}
                />
                Логистика и Транспорт
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="sectors"
                  value="Маркетинг и Реклама"
                  checked={currentCriteria.sectors.includes("Маркетинг и Реклама")}
                  onChange={handleChange}
                />
                Маркетинг и Реклама
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="sectors"
                  value="Туризм и Гостиничный бизнес"
                  checked={currentCriteria.sectors.includes("Туризм и Гостиничный бизнес")}
                  onChange={handleChange}
                />
                Туризм и Гостиничный бизнес
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="sectors"
                  value="Юридические услуги"
                  checked={currentCriteria.sectors.includes("Юридические услуги")}
                  onChange={handleChange}
                />
                Юридические услуги
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="sectors"
                  value="Строительство и Недвижимость"
                  checked={currentCriteria.sectors.includes("Строительство и Недвижимость")}
                  onChange={handleChange}
                />
                Строительство и Недвижимость
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="sectors"
                  value="Медиа и Развлечения"
                  checked={currentCriteria.sectors.includes("Медиа и Развлечения")}
                  onChange={handleChange}
                />
                Медиа и Развлечения
              </label>
            </li>
          </ul>
        </fieldset>

        <label>
          Тип подбора:
          <select name="selectionType" value={currentCriteria.selectionType} onChange={handleChange}>
            <option value="">Выбрать</option>
            <option value="software">Только ПО</option>
            <option value="hardware">Только оборудование</option>
            <option value="both">ПО и оборудование</option>
          </select>
        </label>

        <label>
          Тип конфигурации:
          <select name="configType" value={currentCriteria.configType} onChange={handleChange}>
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
