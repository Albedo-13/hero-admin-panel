import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";

import { useHttp } from "../../hooks/http.hook";
import { fetchFilters, activeFilterChanged } from "../../actions";
import Spinner from "../spinner/Spinner";

const HeroesFilters = () => {
  const { request } = useHttp();
  const dispatch = useDispatch();
  const { filters, activeFilter, filtersLoadingStatus } = useSelector((state) => state.filters);

  useEffect(() => {
    dispatch(fetchFilters(request));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFilterClick = (name) => {
    dispatch(activeFilterChanged(name));
  };

  if (filtersLoadingStatus === "loading") {
    return <Spinner />;
  } else if (filtersLoadingStatus === "error") {
    return <h5 className="card shadow-lg text-center text-danger p-3 mt-3">Ошибка загрузки</h5>;
  }

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
