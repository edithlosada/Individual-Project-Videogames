import React from 'react';
import { Link } from 'react-router-dom';
import './NGLinks.css';

// Links de la página "/newgame".
export default function NGLinks() {
  return (
    <div className="nglinks_cont">
      <Link to='/home' className="nglink">
        <h3 className="nglink">Home</h3>
      </Link>
      <Link to='/' className="nglink">
        <h3 className="nglink">Exit</h3>
      </Link>
    </div>
  )
}