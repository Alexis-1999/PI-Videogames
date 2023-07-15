import {
  GET_VIDEO_GAMES,
  GET_BY_NAME,
  //   FILTER_BY_GENRE,
  FILTER_BY_ORIGIN,
  RESET_GAMES,
  GET_GENRES,
  SORT_BY_RATING,
  SORT_BY_ALPHABET,
} from "../actions";

let initialState = {
  allGames: [],
  //   filteredGenres: [],
  gamesCopy: [],
  genres: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEO_GAMES:
      return {
        ...state,
        allGames: action.payload,
        gamesCopy: action.payload,
      };
    case GET_BY_NAME:
      return {
        ...state,
        allGames: action.payload,
        gamesCopy: action.payload,
      };
    // case FILTER_BY_GENRE:
    //   const genre = action.payload;
    //   const filteredByGenre = state.gamesCopy.filter((game) =>
    //     game.genres.includes(genre)
    //   );
    //   return {
    //     ...state,
    //     allGames: filteredByGenre,
    //   };
    case FILTER_BY_ORIGIN:
      const origin = action.payload;
      const filteredByOrigin = state.gamesCopy.filter(
        (game) => game.origin === origin
      );
      return {
        ...state,
        filteredGenres: filteredByOrigin,
      };
    case RESET_GAMES:
      return {
        ...state,
        allGames: state.gamesCopy,
      };

    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    case SORT_BY_ALPHABET:
      const sortedAlphabetically = [...state.allGames].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      return {
        ...state,
        allGames: sortedAlphabetically,
      };

    case SORT_BY_RATING:
      const sortedByRating = [...state.allGames].sort(
        (a, b) => b.rating - a.rating
      );
      return {
        ...state,
        allGames: sortedByRating,
      };

    default:
      return state;
  }
}

export default rootReducer;
