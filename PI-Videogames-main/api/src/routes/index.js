const { Router } = require("express");
const {getRouter} = require("./videoGamesRouter")
const { genreRouter } = require("./genreRouter")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", getRouter)
router.use("/genre", genreRouter)


module.exports = router;

