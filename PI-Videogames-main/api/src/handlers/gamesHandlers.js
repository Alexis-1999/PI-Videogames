const { 
    createGame, 
    getGamesByName, 
    getAllGames, 
    getGameById, 
    updateGame, 
    deleteGame 
} = require("../controllers/gamesControllers");


// Posts
const createGameHandler = async ( req, res ) => {
    const { name, description, image, releaseDate, rating, genres, parent_platforms } = req.body;
    try {
        const newGame = await createGame( name, description, image, releaseDate, rating, genres, parent_platforms );
        res.status(201).json( newGame );
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Gets
const getGamesHandler = async ( req, res ) => {
    const { name } = req.query;
    try {
        const response = name ? await getGamesByName( name ) : await getAllGames();
        res.status(200).json( response );
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
const getGameHandler = async ( req, res ) => {
    const { id } = req.params;
    const source = isNaN(id) ? "db" : "api";
    try {
        const response = await getGameById( id, source );
        res.status(200).json( response );
    } catch (error) {
        res.status(404).json({ error: `The id: ${id} does not exist` });
    }
};


// Put
const putGameHandler = async ( req, res ) => {
    const { id } = req.params;
    const { name, description, image, releaseDate, rating, genres, parent_platforms } = req.body;
    try {
        const response = await updateGame( id, name, description, image, releaseDate, rating, genres, parent_platforms );
        res.status( 200 ).json( response );
    } catch (error) {
        res.status( 400 ).json({ error: error.message });
    }
};


// Delete
const deleteGameHandler = async ( req, res ) => {
    const { id } = req.params;
    try {
        const response = await deleteGame( id );
        res.status( 200 ).json( response )
    } catch (error) {
        res.status( 400 ).json({ error: error.message });
    }
};

module.exports ={
    createGameHandler,
    getGamesHandler,
    getGameHandler,
    putGameHandler,
    deleteGameHandler,
};
















/*const { getGameByName, getAllGames, getGameById, createVideogame } = require("../controllers/gamesControllers")

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


  const createGamesHandler = async (req, res) => {
    let videoGameNew = {
        id,
        name,
        description,
        platforms,
        image,
        released,
        rating,
        createdInDb, // por defecto viene en true, de da de alta en la DB con valor true
        genres,
    } = req.body;

    try {
        console.log(videoGameNew)
        result = await createVideogame(videoGameNew);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).send('New Video Game NOT created');
    }


  


    
    
    
    
    // const { name, description, platforms, image, launch_date, rating } = req.body

    // try {
    //     const response = await createGameDb(name, description, platforms, image, launch_date, rating)
    //     return res.status(200).json(response)
    // } catch (error) {
    //     return res.status(400).json({error: error.message})
    // }
}



module.exports ={
    getGamesHandlers,
    getDetailHandler,
    createGamesHandler
}*/