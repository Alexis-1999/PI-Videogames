const { Router } = require('express');

// Routers;
const videogamesRouter = require('./videoGamesRouter')
const genresRouter = require('./genreRouter')

const router = Router();

// Configuracion de los routers
router.use( '/games', videogamesRouter )
router.use( '/genres', genresRouter )


module.exports = router;