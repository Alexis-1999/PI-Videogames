import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGames,
  getByName,
  getGenres,
  filterByGenre,
  filterByOrigin,
  sortByAlphabet,
  sortByRating,
  resetGames
} from "../../redux/actions";
import Cards from "../../components/cards/cards.component";
import Navbar from "../../components/navbar/navbar.component";
import Pagination from "../../components/Pagination/pagination.component";

import "./home.style.css";

function Home() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.allGames);
  const genres = useSelector((state) => state.genres);
  const [searchString, setSearchString] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filteredGames, setFilteredGames] = useState(allGames);

  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 15;

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame);

  const totalPages = Math.ceil(allGames.length / gamesPerPage);

  function handleChange(e) {
    const value = e.target.value;
    setSearchString(value);

    // Filtrar por nombre si se ingresa un valor de búsqueda
    if (value.trim() !== "") {
      const filteredByName = allGames.filter((game) =>
        game.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredGames(filteredByName);
    } else {
      // Mostrar todos los juegos si no hay valor de búsqueda
      setFilteredGames(allGames);
    }
  }

  function handleGenreChange(e) {
    const genre = e.target.value;
    setSelectedGenre(genre);

    if (genre !== "") {
      const filteredByGenre = allGames.filter((game) =>
        game.genres.includes(genre)
      );
      setFilteredGames(filteredByGenre);
    } else {
      setFilteredGames(allGames);
    }
  }

  function handleOriginChange(e) {
    setSelectedOrigin(e.target.value);
  }

  function handleSortChange(e) {
    setSortBy(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (searchString.trim() !== "") {
      const filteredByName = allGames.filter((game) =>
        game.name.toLowerCase().includes(searchString.trim().toLowerCase())
      );
      setFilteredGames(filteredByName);
    } else {
      handleFilterByGenre();
    }
  }

  function handleFilterByGenre() {
    if (selectedGenre !== "") {
      const filteredByGenre = allGames.filter((game) =>
        game.genres.includes(selectedGenre)
      );
      setFilteredGames(filteredByGenre);
    } else {
      setFilteredGames(allGames);
    }

    handleFilterAndSort();
  }

  function handleFilterByOrigin() {
    handleFilterAndSort();
  }

  function handleFilterByOrigin() {
    dispatch(filterByOrigin(selectedOrigin));
  }

  function handleSortByAlphabet() {
    if (sortBy === "alphabet") {
      setSortBy("");
      setFilteredGames([...allGames]);
    } else {
      setSortBy("alphabet");
      const sortedGames = [...filteredGames].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setFilteredGames(sortedGames);
    }
  }

  function handleSortByRating() {
    if (sortBy === "rating") {
      setSortBy("");
      setFilteredGames([...allGames]);
    } else {
      setSortBy("rating");
      const sortedGames = [...filteredGames].sort(
        (a, b) => b.rating - a.rating
      );
      setFilteredGames(sortedGames);
    }
  }

  function handleFilterAndSort() {
    let filteredAndSortedGames = [...allGames];

    if (selectedGenre !== "") {
      filteredAndSortedGames = filteredAndSortedGames.filter((game) =>
        game.genres.includes(selectedGenre)
      );
    }

    if (selectedOrigin !== "") {
      filteredAndSortedGames = filteredAndSortedGames.filter(
        (game) => game.origin === selectedOrigin
      );
    }

    if (sortBy === "alphabet") {
      filteredAndSortedGames.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "rating") {
      filteredAndSortedGames.sort((a, b) => b.rating - a.rating);
    }

    setFilteredGames(filteredAndSortedGames);
  }

  function handleReset() {
    setSearchString("");
    setSelectedGenre("");
    setSelectedOrigin("");
    setSortBy("");
    dispatch(resetGames());
    setFilteredGames(allGames); 
  }

  useEffect(() => {
    dispatch(getGames());
    dispatch(getGenres());
  }, [dispatch]);
  console.log(filteredGames);
  return (
    <div className="home">
      <h2 className="home-title">Home</h2>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
      <div className="filter-section">
        <div>
          <label htmlFor="genre">Filter by Genre:</label>
          <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
            <option value="">All Genres</option>
            {genres &&
              genres.length > 0 &&
              genres.map((genre) => (
                <option key={genre.id} value={genre.name}>
                  {genre.name}
                </option>
              ))}
          </select>

          <button onClick={handleFilterByGenre}>Apply</button>
        </div>

        <div>
          <label htmlFor="origin">Filter by Origin:</label>
          <select
            id="origin"
            value={selectedOrigin}
            onChange={handleOriginChange}
          >
            <option value="">All Origins</option>
            {/* Aquí debes mapear los orígenes disponibles */}
          </select>
          <button onClick={handleFilterByOrigin}>Apply</button>
        </div>
        <div>
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" value={sortBy} onChange={handleSortChange}>
            <option value="">No Sorting</option>
            <option value="alphabet">Alphabetically</option>
            <option value="rating">By Rating</option>
          </select>
          <button
            onClick={handleSortByAlphabet}
            disabled={sortBy.includes("alphabet")}
          >
            Sort A-Z
          </button>
          <button
            onClick={handleSortByRating}
            disabled={sortBy.includes("rating")}
          >
            Sort by Rating
          </button>
        </div>
        <button onClick={handleReset}>Reset Filters</button>
      </div>
      <Cards className="img" allGames={filteredGames} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Home;
