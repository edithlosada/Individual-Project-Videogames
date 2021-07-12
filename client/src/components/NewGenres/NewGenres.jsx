import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './NewGenres.css';
import { addNgGen } from '../../actions/actions';

export default function NewGenres() {
  let dispatch = useDispatch();

  let [newgenre, setNewgenre] = useState('');
  let [newgenres, setNewgenres] = useState([]);

  let sended = useSelector(state => state.sended);
  let addedg = useSelector(state => state.addedgenres);

  // Cuando envía el formulario manda el arreglo de nuevos géneros al store.
  useEffect(() => {
    if (sended) {
      dispatch(addNgGen(newgenres));
    }
  }, [sended, newgenres, dispatch]);

  // Una vez que el store recibe los géneros limpia el input y arreglo.
  useEffect(() => {
    if (addedg) {
      setNewgenres([]);
      setNewgenre('');
    }
  }, [addedg]);

  function handleChange(e) {
    setNewgenre(e.target.value);
  }

  function handleClickPlus(e) {
    if (newgenre) {
      setNewgenres([...newgenres, newgenre]);//ojo
      setNewgenre('');
    }
  }

  // Quita género de la selección
  function removeItem(item) {
    let newItems = newgenres.filter(e => e !== item);
    setNewgenres(newItems);
  }

  // Cuando hace click en el botón lo saca
  function handleClick(e) {
    let itm = e.target.value;
    removeItem(itm);
  }

  return (
    <div >
      <div className="nggenfom">
        <input
          id="input_name"
          type="text"
          className="angforminput"
          value={newgenre}
          name='newgenre'
          placeholder="New genre"
          onChange={handleChange}>
        </input>
        <input type="button" onClick={handleClickPlus} value={'+'} />
        <div className="ngencont">
          {newgenres && newgenres.map((item, index) => (
            <button className="selgenbtn" value={item}
              onClick={handleClick} key={index}>
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
