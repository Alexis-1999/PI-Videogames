const axios = require('axios')
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
}