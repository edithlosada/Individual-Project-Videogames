import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './HLinks.css';
import {setShowmsg, setOrigOpt} from '../../actions/actions';

// Links de la página "/home".
export default function HLinks() {

  const dispatch = useDispatch();

  

  function handleClick(){
    dispatch(setShowmsg(true));
    dispatch(setOrigOpt(''));
  }
  return (
    <div className="hlinks_cont">
      <Link to='/newgame' onClick={handleClick} className="hlink">
        <h3 className="hlink">New game</h3>
      </Link>
      <Link to='/' className="hlink">
        <h3 className="hlink">Exit</h3>
      </Link>
    </div>
  )
}
