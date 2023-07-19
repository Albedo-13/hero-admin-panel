// Дополнительно:
// TODO: Анимации
// TODO: error handling
// TODO: Spinners & http hook


import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import classNames from "classnames";

import { heroCreated } from "../../actions";
import { useHttp } from "../../hooks/http.hook";

import "./heroesAddForm.scss";

const HeroesAddForm = () => {
  const dispatch = useDispatch();
  const { request } = useHttp();
  const { filters } = useSelector((state) => state);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const { name, description, element } = data;
    console.log(data);

    const newHero = {
      id: uuidv4(),
      name,
      description,
      element,
    };

    request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
      .then((newHero) => dispatch(heroCreated(newHero)))
      .then(() => reset())
      .catch((err) => console.log(err));
  };

  const renderSelectList = (filters) => {
    const optionsList = filters.map(({ name, label }) => {
      // eslint-disable-next-line array-callback-return
      if (name === "") return;
      return (
        <option key={name} value={name}>
          {label}
        </option>
      );
    });

    return (
      <select
        {...register("element", { required: "Выберите элемент" })}
        className={classNames("form-select", {"error-boundary": errors.element})}
        id="element"
        defaultValue={""}
      >
        <option value="" disabled>Я владею элементом...</option>
        {optionsList}
      </select>
    );
  };

  console.log(errors) //! брать ошибку из formstate
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="hero-add-form border p-4 shadow-lg rounded">
      <div className="mb-4">
        <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
        <input
          {...register("name", { required: "Заполните это поле" })}
          type="text"
          className={classNames("form-control", {"error-boundary": errors.name})}
          id="name"
          placeholder="Как меня зовут?"
        />
        <div className="error-message text-danger">{errors.name ? errors.name.message : null}</div>
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="form-label fs-4">Описание</label>
        <textarea
          {...register("description", { required: "Заполните это поле" })}
          className={classNames("form-control", {"error-boundary": errors.description})}
          id="text"
          placeholder="Что я умею?"
          style={{ height: "130px" }}
        />
        <div className="error-message text-danger">{errors.description ? errors.description.message : null}</div>

      </div>

      <div className="mb-4">
        <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
        {renderSelectList(filters)}
        <div className="error-message text-danger">{errors.element ? errors.element.message : null}</div>
      </div>

      <button type="submit" className="btn btn-primary">Создать</button>
    </form>
  );
};

export default HeroesAddForm;
