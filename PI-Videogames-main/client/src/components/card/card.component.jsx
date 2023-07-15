import { Link } from "react-router-dom"
import './card.styles.css';

function Card({game}) {

  const { background_image, name, genres, id } = game
    return (
      <div className='card-container'> 
        <Link to={`/home/${id}`}>
          {/* Aquí voy a colocar los datos del model de base de datos, nombres de los atributos */}
          <img className="imgCard" src={background_image} alt={name}/>
          <p>{name}</p>
          <p>{genres}</p>
        </Link>
      </div>
    );
  }
  
  export default Card;