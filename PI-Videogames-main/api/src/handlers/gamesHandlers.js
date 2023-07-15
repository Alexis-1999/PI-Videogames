const { getGameByName, getAllGames, getGameById, createGameDb } = require("../controllers/gamesControllers")

// Traer por nombre y todos los games
const getGamesHandlers= async(req,res)=>{
    const { name } = req.query;

    try {
        if(name){
            const gameByName = await getGameByName(name)
            return res.status(200).json(gameByName)
        }else{
            const response = await getAllGames()
            return res.status(200).json(response)
        }
    } catch (error) {
        return res.status(400).json({error: error.message})
    }

}

// const getGamesHandlers= async(req,res)=>{
//     try {
//         const allGames = await getAllGames()
//         return res.status(200).json(allGames)
//     } catch (error) {
//         return res.status(400).json({error: error.message})
//     }
// }


const getDetailHandler = async (req, res) => {
    const { id } = req.params;
    const source = id !== "" && Number.isNaN(Number(id)) ? "bdd" : "api";
  
    try {
      const response = await getGameById(id, source);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }


const createGamesHandler =async(req, res)=>{
    const { name, description, platforms, image, launch_date, rating } = req.body

    try {
        const response = await createGameDb(name, description, platforms, image, launch_date, rating)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}



module.exports ={
    getGamesHandlers,
    getDetailHandler,
    createGamesHandler
}