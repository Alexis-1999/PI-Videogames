import React from 'react';
import './navbar.styles.css';

function Navbar({ handleChange, handleSubmit }) {
  // const handleSearchSubmit = (e) => {
  //   e.preventDefault();
  //   handleSubmit();
  // };

  return (
    <div className="search-box">
      {/* <form onSubmit={handleSearchSubmit}> */}
        <input placeholder="Búsqueda" type="search" onChange={handleChange} />
        <button onClick={handleSubmit} type="submit">Buscar</button>
      {/* </form> */}
    </div>
  );
}

export default Navbar;