const { Router } = require("express");
const { apiGenresHandler, createGenreHandler, getGenresHandler, getGenreHandler, PutGenreHandler, deleteGenreHandler } = require("../handlers/genreHandlers");

const genresRouter = Router();

// Post 
genresRouter.post( '/api', apiGenresHandler );
genresRouter.post( '/', createGenreHandler );


// Gets
genresRouter.get( '/', getGenresHandler );
genresRouter.get("/:id", getGenreHandler );


// Put
genresRouter.put( '/:id', PutGenreHandler );

// Delete
genresRouter.delete( '/delete/:id', deleteGenreHandler );


module.exports = genresRouter;