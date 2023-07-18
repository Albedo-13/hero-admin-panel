// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";

import { useHttp } from "../../hooks/http.hook";
import { filtersFetched, filtersFetching, filtersFetchingError, activeFilterChanged } from "../../actions";

const HeroesFilters = () => {
  const { request } = useHttp();
  const dispatch = useDispatch();
  const { filters, activeFilter } = useSelector((state) => state);

  useEffect(() => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
      .then((data) => dispatch(filtersFetched(data)))
      .catch(() => dispatch(filtersFetchingError()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFilterClick = (name) => {
    dispatch(activeFilterChanged(name));
  };

  const renderFiltersList = () => {
    return filters.map(({ name, label, classname }) => (
      <button
        onClick={() => onFilterClick(name)}
        name={name}
        key={name}
        className={classNames(classname, { active: activeFilter === name })}
      >
        {label}
      </button>
    ));
  };

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">{renderFiltersList()}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;
