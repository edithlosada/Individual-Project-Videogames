import React from 'react';
import './GameCard.css';
import star from '../../imgs/star.png';

export default function GameCard({orig, id, name, rating, img, genres }) {
  //console.log(props.game); 

  function handleClick(e) {
    // Función que me abre una nueva pestaña con el detalle del juego elegido
    const win = window.open(`/gamedetail/${id}?orig=${orig}`, "_blank");
    win.focus();
  }

  return (
    <div className="gcardcont" >
      <div className="gcname" onClick={handleClick}>
        <p className="gcnamep" >{name}</p>
      </div>
      <div className="gcrating">
        <img className="gcstar_img" src={star} alt="star" />
        <p className="prating_n"><b >{rating}</b></p>
      </div>
      <img className="gImg" src={img} alt="game_image" />
      <p className="pgenre"> {genres} </p>
    </div>
  )
}
