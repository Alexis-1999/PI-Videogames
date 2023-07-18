import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createGame } from "../../redux/actions";

function Create() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    platforms: [],
    releaseDate: "",
    rating: 0,
    genres: [],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlatformsChange = (e) => {
    const platforms = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({
      ...formData,
      platforms,
    });
  };

  const handleGenresChange = (e) => {
    const genres = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({
      ...formData,
      genres,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar los datos del juego al servidor utilizando la función createGame de las acciones
      const createdGame = await createGame(formData);

      // Redirigir a la página de detalle del juego creado
      history.push(`/detail/${createdGame.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create Game</h2>
      <form onSubmit={handleSubmit}>
        {/* Nombre */}
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>

        {/* Imagen */}
        <div>
          <label htmlFor="image">Image:</label>
          <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} />
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
        </div>

        {/* Plataformas */}
        <div>
          <label htmlFor="platforms">Platforms:</label>
          <select multiple id="platforms" name="platforms" value={formData.platforms} onChange={handlePlatformsChange}>
            <option value="PC">PC</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Xbox">Xbox</option>
            {/* Agrega más opciones de plataformas según tus necesidades */}
          </select>
        </div>

        {/* Fecha de lanzamiento */}
        <div>
          <label htmlFor="releaseDate">Release Date:</label>
          <input type="date" id="releaseDate" name="releaseDate" value={formData.releaseDate} onChange={handleChange} />
        </div>

        {/* Rating */}
        <div>
          <label htmlFor="rating">Rating:</label>
          <input type="number" id="rating" name="rating" value={formData.rating} onChange={handleChange} />
        </div>

        {/* Géneros */}
        <div>
          <label htmlFor="genres">Genres:</label>
          <select multiple id="genres" name="genres" value={formData.genres} onChange={handleGenresChange}>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="RPG">RPG</option>
            {/* Agrega más opciones de géneros según tus necesidades */}
          </select>
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default Create;

