import React from 'react'
import Card from '../../components/card/card.component'
import Loader from '../../views/loader/loader'
import './navbar.styles.css'

const SearchVideogame = ({ videogames }) => {

  return (
      <div id="searchVideogame">
          {
              videogames.length > 0 
                  ? videogames.map( ( game, i ) => ( 
                          <Card games={ game } key={ i }/> 
                  ))
                  : <Loader/>
          }
      </div>
  )
}

export default SearchVideogame