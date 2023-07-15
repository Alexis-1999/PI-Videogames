import React from "react";
import Card from '../card/card.component';
import './cards.styles.css';

function Cards({ allGames }) {
  if (!Array.isArray(allGames)) {
    return <div>No games available.</div>;
  }

  return (
    <div className='card-list'>
      {allGames.map((game, id) => (
        <Card 
          game={game}
          key={id}
        />
      ))}
    </div>
  );
}

export default Cards;