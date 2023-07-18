import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createGame, getPlatforms } from "../../redux/actions";
import { useEffect} from "react";
import "./create.style.css"

function Create() {
  const platforms = useSelector((state) => state.platforms);
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    platforms: [],
    image: "",
    launch_date: "",
    rating: 0,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlatformsChange = (e) => {
    const platforms = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({
      ...formData,
      platforms,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar los datos del juego al servidor utilizando la función createGame de las acciones
      dispatch(createGame(formData));

      // Redirigir a la página de detalle del juego creado
      //history.push(`/detail/${createdGame.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(getPlatforms());
  }, [dispatch]);

  return (
    <div>
      <h2>Create Game</h2>
      <form onSubmit={handleSubmit}>
        {/* Nombre */}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Imagen */}
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Plataformas */}
        <div>
          <label htmlFor="platforms">Platforms:</label>
          <select
            multiple
            id="platforms"
            name="platforms"
            value={formData.platforms}
            onChange={handlePlatformsChange}
          >
            {platforms.map((platform) => (
              <option key={platform.name} value={platform.name}>
                {platform.name}
              </option>
            ))}
          </select>
        </div>

        {/* Fecha de lanzamiento */}
        <div>
          <label htmlFor="launch_date">Release Date:</label>
          <input
            type="date"
            id="launch_date"
            name="launch_date"
            value={formData.launch_date}
            onChange={handleChange}
          />
        </div>

        {/* Rating */}
        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Create</button>
      </form>
      <Link to="/home">Back</Link>
    </div>
  );
}

export default Create;
