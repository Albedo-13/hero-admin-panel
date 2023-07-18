// Дополнительно:
// TODO: Валидация полей формы
// TODO: Анимации

import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { heroCreated } from "../../actions";
import { useHttp } from "../../hooks/http.hook";

const HeroesAddForm = () => {
  const dispatch = useDispatch();
  const { request } = useHttp();
  const { filters } = useSelector((state) => state);

  const onSubmit = (e) => {
    e.preventDefault();

    const newHero = {
      id: uuidv4(),
      name: e.target.name.value,
      description: e.target.text.value,
      element: e.target.element.value,
    };

    request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
      .then((data) => dispatch(heroCreated(data)))
      .then(() => clearFormFields(e))
      .then((err) => console.log(err));
  };

  const clearFormFields = (e) => {
    e.target.name.value = "";
    e.target.text.value = "";
    e.target.element.value = "DEFAULT";
  };

  const renderSelectList = (filters) => {
    console.log(filters);

    const optionsList = filters.map(({ name, label }) => {
      // eslint-disable-next-line array-callback-return
      if (name === "DEFAULT") return;
      return (
        <option key={name} value={name}>
          {label}
        </option>
      );
    });

    return (
      <select required className="form-select" id="element" name="element" defaultValue={"DEFAULT"}>
        <option value="DEFAULT" disabled>Я владею элементом...</option>
        {optionsList}
      </select>
    );
  };

  return (
    <form onSubmit={(e) => onSubmit(e)} className="border p-4 shadow-lg rounded">
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
        <input required type="text" name="name" className="form-control" id="name" placeholder="Как меня зовут?" />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">Описание</label>
        <textarea
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{ height: "130px" }}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
        {renderSelectList(filters)}
      </div>

      <button type="submit" className="btn btn-primary">Создать</button>
    </form>
  );
};

export default HeroesAddForm;
