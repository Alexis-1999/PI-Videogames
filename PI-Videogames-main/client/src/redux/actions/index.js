import axios from "axios";

export const GET_VIDEO_GAMES = "GET_VIDEO_GAMES";
export const GET_BY_NAME = "GET_BY_NAME";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const RESET_GAMES = "RESET_GAMES";
export const SORT_BY_ALPHABET = "SORT_BY_ALPHABET";
export const SORT_BY_RATING = "SORT_BY_RATING";
export const GET_GENRES = "GET_GENRES";

export function getGames() {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/videogames/");

    return dispatch({
      type: GET_VIDEO_GAMES,
      payload: response.data.slice(0, 100), // Obtener los primeros 100 videojuegos
    });
  };
}

export function getGenres() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/genre"); // Endpoint para obtener los géneros
      dispatch({
        type: GET_GENRES,
        payload: response.data,
      });
    } catch (error) {
      console.log("Error fetching genres:", error);
    }
  };
}

export function getByName(name) {
  return async function (dispatch) {
    const response = await axios.get(
      `http://localhost:3001/videogames/?name=${name}`
    );

    return dispatch({
      type: GET_BY_NAME,
      payload: response.data,
    });
  };
}

export function filterByGenre(genre) {
  return {
    type: FILTER_BY_GENRE,
    payload: genre,
  };
}

export function filterByOrigin(origin) {
  return {
    type: FILTER_BY_ORIGIN,
    payload: origin,
  };
}

export function resetGames() {
    return {
      type: RESET_GAMES,
    };
  }

export const sortByAlphabet = () => {
    return {
      type: SORT_BY_ALPHABET
    };
  };
  
  export const sortByRating = () => {
    return {
      type: SORT_BY_RATING
    };
  };
