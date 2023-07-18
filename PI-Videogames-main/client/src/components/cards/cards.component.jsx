import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
// import Loader from '../../pages/Loader/Loader';
import { getGames } from '../../redux/actions/index'
import Pagination from '../Pagination/pagination.component';
import Card from '../card/card.component';
import Loader from '../../views/loader/loader';
import './cards.styles.css';

function Cards({ currentPage, setCurrentPage, gamesPerPage, indexOfFirstGame, indexOfLastGame }) {
    const dispatch = useDispatch();
    
    // Ejecuta getgames para traer los datos y guardarlos en el estado games
    const games = useSelector(state => state.games);
    
    useEffect( () => {
        dispatch( getGames() );
    }, [ dispatch ]);
    
    // //                  Paginado
    // Devuelve una copia de una parte de los datos guardados en el estado
    const currentGame = games.slice( indexOfFirstGame, indexOfLastGame );
    
    const paginate = ( page ) => {
        setCurrentPage( page );
    };
    
    // Cards
    const cards = () => {
        return (
            currentGame.map( ( game, i ) => (
                    <Card 
                        games = { game }
                        key = { i }
                    /> 
            ))
        );
    };
    
    //  Renderiza 
    return(
        <div className='Cards_component'>
            <div className='Cards'>
                { 
                    games.includes( 'Not found' ) 
                        ? <div className="notFoundGames"> { games } </div> 
                        : games.length !== 0 ? cards() : <Loader/>
                }
            </div>
            <Pagination 
                gamesPerPage={ gamesPerPage } 
                totalPosts={ Array.isArray( games ) ? games.length : 0 } 
                paginate={ paginate } 
                currentPage={ currentPage }
                setCurrentPage={ setCurrentPage }
            />
        </div>
    );
};

export default Cards;












/*import React from "react";
import Card from "../card/card.component";
import "./cards.styles.css";

function Cards({ allGames }) {
  if (!Array.isArray(allGames)) {
    return <div>No games available.</div>;
  }

  return (
    <div className="card-list">
      {allGames.map((game, id) => (
        <Card game={game} key={id} />
      ))}
    </div>
  );
}

export default Cards;*/