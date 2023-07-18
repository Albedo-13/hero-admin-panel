import { useDispatch, useSelector } from 'react-redux';

import { heroDeleted } from '../../actions';

const HeroesListItem = ({ id, name, description, element }) => {
  let elementClassName;

  switch (element) {
    case 'fire':
      elementClassName = 'bg-danger bg-gradient';
      break;
    case 'water':
      elementClassName = 'bg-primary bg-gradient';
      break;
    case 'wind':
      elementClassName = 'bg-success bg-gradient';
      break;
    case 'earth':
      elementClassName = 'bg-secondary bg-gradient';
      break;
    default:
      elementClassName = 'bg-warning bg-gradient';
  }

  const dispatch = useDispatch();
  const { heroes } = useSelector(state => state);

  const handleDeleteButton = (heroes) => {
    const filteredHeroes = heroes.filter((hero) => hero.id !== id);
    dispatch(heroDeleted(filteredHeroes));
  }

  return (
    <li
      className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}>
      <img src="http://www.stpaulsteinbach.org/wp-content/uploads/2014/09/unknown-hero.jpg"
        className="img-fluid w-25 d-inline"
        alt="unknown hero"
        style={{ 'objectFit': 'cover' }} />
      <div className="card-body">

        <h3 className="card-title">{name}</h3>
        <p className="card-text">{description}</p>
      </div>
      <span onClick={() => {
        console.log("deleting");
        handleDeleteButton(heroes);
      }} className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
        <button type="button" className="btn-close btn-close" aria-label="Close"></button>
      </span>
    </li>
  )
}

export default HeroesListItem;