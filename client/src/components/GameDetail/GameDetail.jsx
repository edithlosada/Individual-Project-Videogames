import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import './GameDetail.css';
import Navbar from '../Navbar/Navbar';
import star from '../../imgs/star.png';

export default function GameDetail() {

  let { id } = useParams(); // <-- Retorna un objeto, acá es {id: Nro}

  let urlQuery = new URLSearchParams(useLocation().search);  //<-- Retorna un objeto
  let orig = urlQuery.get('orig'); //obtiene el query cuya key es 'orig'.
  // console.log(id, orig)

  useEffect(() => {
    async function getGameinfo(id, orig) {
      if (orig === 'API') {
        await fetch(`http://localhost:3001/videogame/${id}`)
          .then(response => response.json())
          .then(obj => {
            setGobj(obj);
          })
          .catch(error => console.log(error))

      } else if (orig === 'DB') {
        await fetch(`http://localhost:3001/dbvideogame/${id}`)
          .then(response => response.json())
          .then(obj => {
            setGobj(obj);
          })
          .catch(error => console.log(error))
      }
    }

    getGameinfo(id, orig);
  }, [id, orig])

  let [gobj, setGobj] = useState(null);
  let [ggstr, setGgstr] = useState(null);
  let [gpstr, setGpstr] = useState(null);

  useEffect(() => {
    if (gobj) {
      let gstr = gobj.genres.toString().replace(/,/g, ' - ');
      setGgstr(gstr);
      let pstr = gobj.platforms.toString().replace(/,/g, ' - ');
      setGpstr(pstr);
    }
  }, [gobj])

  useEffect(() => {
  }, [ggstr,gpstr])


  return (
    <div className="ng_page">
      <Navbar />
      {gobj && <div className="gd_area">
        <h1 className="gd_title"  >{gobj.name} </h1>
        <img className="gd_picture" src={gobj.img_url} alt="game_img" />
        <div className="gd_picture-info">
          <div className="star">
            <img className="star_img" src={star} alt="star" />
            <p className="gdpT"><b className="gdt">{gobj.rating}</b></p>
          </div>
          <p className="gdpT"><b className="gdt">Released:</b>{gobj.released}</p>
          <p className="gdpT"><b className="gdt">Genres:</b></p>
          {ggstr&&<p className="gdpTdesc"> {ggstr}</p>}
          <p className="gdpT"><b className="gdt">Platforms:</b></p>
          {gpstr&&<p className="gdpTdesc"> {gpstr}</p>}
          <p className="gdpT"><b className="gdt">Description:</b></p>
          <p className="gdpTdesc">{gobj.description}</p>
          <div>
          </div>
        </div>
      </div>}
    </div>
  )
}
