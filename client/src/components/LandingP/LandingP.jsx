import React from 'react';
import './LandingP.css';
import { Link } from 'react-router-dom';

export default function LandingP() {
    return (
      <div className="base">
        <h1 className="lp_title"> Henry Videogames</h1>
        <Link to='/home' className="link_ng">
          <button className="enter_btn"> Enter </button>
        </Link>
      </div>
    )
}

