import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './MultiSelectGenre.css';
import fetch from 'node-fetch';
import {saveNgGenSel , sendedForm} from '../../actions/actions';

export default function MultiSelectGenre() {

  const dispatch = useDispatch();

  function genObjFromArr(arr) {
    let gen = [];
    for (let i = 0; i < arr.length; i++) {
      let obj = { value: arr[i].name, label: arr[i].name };
      gen.push(obj);
    }
    return gen;
  }

  async function getGenreAsync() {
    let response = await fetch("http://localhost:3001/genres");
    let data = await response.json();
    let objArr = genObjFromArr(data);
    return objArr;
  }

  let [show, setShow] = useState(false);
  const genreopt = useRef([]);

  useEffect(() => {
    getGenreAsync()
      .then(gen => {
        genreopt.current = gen;
        //console.log(genreopt);
      })
      .then(() => {
        //console.log(genreopt);
        setShow(true);
      })
      .catch(error => console.log(error))
  })

  // Estado de géneros seleccionados
  let [sgenres, setSgenres] = useState([]);// selected genres

  // Quita género de la selección
  function removeItem(item) {
    let newItems = sgenres.filter(e => e !== item);
    setSgenres(newItems);
  }

  // Cuando hace selección en desplegable lo seleciona/deselecciona
  function handleChange(e) {
    let itemP = e.target.value;
    let hasItem = sgenres.includes(itemP);
    if (!hasItem) {
      setSgenres([...sgenres, itemP]);
    } else {
      removeItem(itemP);
    }
  }

  // Cuando hace click en el botón lo saca
  function handleClick(e) {
    let itm = e.target.value;
    removeItem(itm);
  }

  //Cada vez que cambia un género guarda el estado en el store
  useEffect(() => {
    dispatch(saveNgGenSel(sgenres));
  }, [sgenres,dispatch]);

  const sended = useSelector(state => state.sended);

  // Una vez que guarda el formulario, manda lim
  useEffect(() => {
    setSgenres([]);
    dispatch(sendedForm(false));
  }, [sended,dispatch]);

  return (
    <div className="selgenfom">
      {!show ? '...cargando géneros.' :
        <>
          <select
            name="genres"
            placeholder="Genres..."
            className="multselectgen"
            value={''}
            onChange={handleChange}
          >
            <option defaultValue>Genres:</option>
            {genreopt.current && genreopt.current.map((item, index) => (
              <option key={index} value={item.value}>{item.label}</option>
            ))}
          </select>
          <div className="gencont">
            {sgenres.map((item, index) => (
              <button className="selgenbtn" value={item}
                onClick={handleClick} key={index}>
                {item}
              </button>
            ))}
          </div>
        </>
      }
    </div>
  )
}
