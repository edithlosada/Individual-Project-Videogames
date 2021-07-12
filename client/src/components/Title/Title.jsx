import React from 'react';
import './Title.css';
import Logo from '../../imgs/mariom.png';

export default function Title(props) {
  return (
        <div className="title">
          <img className="logo" src={Logo} alt="mario.png" />
          <h2>Henry Videogames</h2>
        </div>
  )
};
