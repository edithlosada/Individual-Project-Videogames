import React from 'react';
import { Link } from 'react-router-dom';
import './GDLinks.css';

// Links del navbar para la página "/gamedetail/:source/:id"
export default function GDLinks() {
  return (
    <div className="gdlinks_cont">
      <Link to='/home' className="gdlink">
        <h3 className="gdlink">Home</h3>
      </Link>
      <Link to='/newgame' className="gdlink">
        <h3 className="gdlink">New game</h3>
      </Link>
      <Link to='/' className="gdlink">
        <h3 className="gdlink">Exit</h3>
      </Link>
    </div>
  )
}