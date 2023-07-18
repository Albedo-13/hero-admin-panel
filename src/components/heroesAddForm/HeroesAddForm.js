

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uuid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import { heroCreated } from "../../actions";
import { useHttp } from "../../hooks/http.hook";

const HeroesAddForm = () => {
  const dispatch = useDispatch();
  const { request } = useHttp();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('onSubmit');

    const newHero = {
      id: uuidv4(),
      name: e.target.name.value,
      description: e.target.text.value,
      element: e.target.element.value,
    };

    request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
      .then((data) => dispatch(heroCreated(data)))
      .then(() => clearFormFields(e))
      .then(err => console.log(err));
  }

  const clearFormFields = (e) => {
    e.target.name.value = "";
    e.target.text.value = "";
    e.target.element.value = "DEFAULT";
  }

  return (
    <form onSubmit={(e) => onSubmit(e)} className="border p-4 shadow-lg rounded">
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
        <input
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Как меня зовут?" />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">Описание</label>
        <textarea
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{ "height": '130px' }} />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
        <select
          required
          className="form-select"
          id="element"
          name="element"
          defaultValue={"DEFAULT"}>
          <option value="DEFAULT" disabled>Я владею элементом...</option>
          <option value="fire">Огонь</option>
          <option value="water">Вода</option>
          <option value="wind">Ветер</option>
          <option value="earth">Земля</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary">Создать</button>
    </form>
  )
}

export default HeroesAddForm;