const { getAllGenre } = require("../controllers/genreControllers")




const getGenreHandlers= async(req,res)=>{
    try {
        const response = await getAllGenre()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

module.exports ={
    getGenreHandlers,
}