const axios = require('axios');
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;

// Filtramos los datos
const infoFilter = (arr) => arr.map(game => {
  return {
    id: Videogame.id,
    name: game.name,
    description: game.description,
    platforms: game.platforms.map(platform => platform.platform.name),
    background_image: game.background_image,
    genres: game.genres.map(genre => genre.name),
    released: game.released,
    rating: game.rating
  };
});

// Traer todos los juegos
const mapData2 = async () => {
  try {
    const promises = [];
    for (let page = 1; page <= 5; page++) {
      promises.push(axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}&page_size=20&ordering=id`));
    }
    const responses = await Promise.all(promises);
    const gameData = responses.flatMap(response => response.data.results);
    const games = gameData.map(game => {
      return {
        id: game.id,
        name: game.name,
        description: game.description,
        platforms: game.platforms.map(platform => platform.platform.name),
        background_image: game.background_image,
        genres: game.genres.map(genre => genre.name),
        released: game.released,
        rating: game.rating
      };
    });
    console.log(games.length);
    return games;
  } catch (error) {
    throw new Error("Error al obtener todos los juegos");
  }
};

//Traigo los datos de la Base de datos
const dataDb = async()=>{
    const userDb = (await Videogame.findAll(
        {
            include: {
                model: Genre,
                attributes: ["name"],
                // Para que no aparezca la tabla intermedia o Tabla " detalle "
                // Dice: De la tabla intermedia(through) que atributos quiero? Ninguno(attributes: [])
                through: {
                    attributes: [],
                },
            },
    }))
    return userDb;
}
const getAllGames = async ()=>{
    const userDb = await dataDb()
    const mapData = await mapData2()
    const allGames = userDb.concat(mapData)

    //Unificamos los datos
    // const gamesApi = infoFilter(infoApi)
    // console.log(gamesApi);
    // const allGames = [...mapData, ...userDb]
    // return [...mapData,...userDb]
    return allGames
}



// Buscar por nombre
const getGameByName = async(name)=>{

    // CASO PARA EL API
    // const apiGames = (await axios.get('https://api.rawg.io/api/games?key=29b8690a22c54d81b8ae2364390ae5b9')).data

    // const gamesApi = infoFilter(apiGames)

    const gameName = await getAllGames(name)

    const gameFiltered = gameName.filter(game => game.name.toLowerCase().includes(name.toLowerCase()))


    // CASO PARA EL BASE DE DATOS
    //const gameDb = await Videogame.findAll({where: {name: name}})


    // return [...gameFiltered, ...userDb]
    return gameFiltered;
    
}

/*const getGameById = async(id, source)=>{
    // const infoApi = (await axios.get(`https://api.rawg.io/api/games/${id}?key=29b8690a22c54d81b8ae2364390ae5b9`)).data   mapData2(id)
    
    const user = source === "api" ? (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data.results : await Videogame.findByPk(id,
    // Desde mi búsqueda "getUserId" yo quiero que incluya los post que se hayan creado
    {
        include: {
            model: Genre,
            attributes: ["name"],
            // Para que no aparezca la tabla intermedia o Tabla " detalle "
            // Dice: De la tabla intermedia(through) que atributos quiero? Ninguno(attributes: [])
            through: {
                attributes: [],
            },
        },
    })
    return user


    // const data = await getAllGames(id)
    // if(id){
    //     const dataA = data.find((a)=>{ a.id === +id})
    //     return dataA
    // }


    // const full = data.addGenre(game1)

    // if(!game) throw Error("Videojuego no existe")
    // return game;
}*/
const getGameById = async (id, source) => {
  if (source === "api") {
    try {
      const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
      const game = response.data;
      const filteredGame = infoFilter([game]); // Aplicar el filtro al juego de la API
      return filteredGame[0]; // Devolver el juego filtrado
    } catch (error) {
      throw new Error("Error al obtener los datos de la API");
    }
  } else {
    const game = await Videogame.findByPk(id, {
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return game;
  }
};


const createGameDb =async(name, description, platforms, image, launch_date, rating)=>{
    return await Videogame.create({name, description, platforms, image, launch_date, rating})
}



module.exports = {
    getGameByName,
    getAllGames,
    getGameById,
    createGameDb
}