const axios = require('axios');
const { Genre } = require('../db.js');
const { Op } = require('sequelize');
const { apiGenresCleaner } = require('./utils/utilsGames.js');

// .env
require('dotenv').config();
const { API_KEY } = process.env;

// Posts
const apiGenres = async () => {
    const url = `https://api.rawg.io/api/genres?key=${API_KEY}`;
    return await axios
        .get( url )
        .then( dataApi =>  apiGenresCleaner(dataApi.data) )
        .then( genres =>  {
            genres.forEach( genreName => {
                createGenres({ name: genreName });
            });
            return 'Temperaments of the Api saved in BD';
        });
};

const createGenres = async ( name ) => {
    const newGenre = await Genre.create( name );
    return newGenre;
};
// const getApiGenres = async () => {
//     const url = `https://api.rawg.io/api/genres?key=${API_KEY}`; // Reemplaza con la URL correcta de la API de géneros
  
//     try {
//       const response = await axios.get(url);
//       const apiGenres = response.data.genres.map(genre => ({
//         id: genre.id,
//         name: genre.name,
//       }));
  
//       return apiGenres;
//     } catch (error) {
//       throw new Error('Failed to fetch genres from API');
//     }
//   };

  const getAllGenres = async () => {
    // const getGenresDB = await Genre.findAll();
    // const getGenresAPI = await apiGenres()
    // const allGenres = [...getGenresDB, ...getGenresAPI]
    // if( !allGenres.length ) throw Error( 'The database is empty' );  
    // return allGenres ;





    let genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)

    genresApi.data.results.map((genre)=>{
        Genre.findOrCreate({
            where :{
                name: genre.name
            }
        })
    })

    let genres = await Genre.findAll()
    return genres
}
const getGenresByName = async ( name ) => {
    const getGenres = await Genre.findAll({
        where: {
            name: { [Op.iLike]: `%${name}%` }
        }
    });
    if( !getGenres.length ) throw Error( 'This genre is not in the database' );
    return getGenres ;
}
const getGenreById = async ( id ) => {
    const getGenres = await Genre.findByPk( id );
    if( !getGenres ) throw Error( `The id: ${id} does not exist` );
    return getGenres ;
}

// Put
const updateGenre = async ( id, name ) => {
    const genre = await Genre.findByPk( id );
    if( !genre ) throw Error( `The id: ${id} does not exist` );
    if ( !name  ) throw Error('Missing Data');
    await Genre.update(
        { name},
        {
            where: { id }
        }
    )
    return `${name} has been updated`;
};

// Delete
const deleteGenre = async ( id ) => {
    const genreToDelete = await Genre.findByPk( id );
    if( !genreToDelete ) throw Error( `The id: ${id} does not exist` );
    await genreToDelete.destroy();
    return `${genreToDelete.name} has been successfully removed`;
};

module.exports = {
    apiGenres,
    createGenres,
    getAllGenres,
    getGenresByName,
    getGenreById,
    updateGenre,
    deleteGenre
}
















/*const axios = require('axios')
const { Genre } = require('../db')






// const infoFilter = (arr)=> arr.map(user=>{
//     return{
//         id: user.id,
//         name:user.name,
//     }
// })



const getAllGenre = async()=>{
    // const genres = await Genre.findAll()
    // const infApi = (await axios.get('https://api.rawg.io/api/genres?key=29b8690a22c54d81b8ae2364390ae5b9')).data

    // const usersApi = infoFilter(infApi)
    // const alldata =  [...genres, ...infApi]
    // return alldata
    
    const infoApiGenre = await axios.get('https://api.rawg.io/api/genres?key=29b8690a22c54d81b8ae2364390ae5b9')

    const mapGenre = infoApiGenre.data.results.map((genre=>{
        return{
            id: genre.id,
            name: genre.name
        }
    }))
    return mapGenre

}

module.exports ={
    getAllGenre,
}*/