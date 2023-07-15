const { Videogame } = require('../models/Videogame')


const createPostGames = async (req,res)=>{
    try {
        const {nombre, decripcion, plataforma, imagen, fecha_de_lanzamiento, rating} = req.body
        const newVideoGames = await Videogame.create({ nombre, decripcion, plataforma, imagen, fecha_de_lanzamiento, rating});
        
        res.status(200).json(newVideoGames)
    } catch (error) {
       return res.status(400).json(error.message)
    }

}

module.exports = createPostGames;