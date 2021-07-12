import React from 'react';
import Title from '../Title/Title.jsx';
import PLinks from '../PLinks/PLinks.jsx';
import './Navbar.css';

export default function Navbar() {
  return (
    <div  className="nvcont"> 
      <Title/>
      <PLinks/>
    </div>
  )
};
