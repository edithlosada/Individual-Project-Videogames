import React from 'react';
import './Home.css';
import Navbar from '../Navbar/Navbar';
import SearchMenu from '../SearchMenu/SearchMenu.jsx';
import GamesGetter from '../GamesGetter/GamesGetter.jsx';

export function Home() {
  
  return (
    <div>
      <Navbar />
      <SearchMenu />
      <div className="harea" >
        <GamesGetter />
      </div>
    </div>
  )
};

export default Home;