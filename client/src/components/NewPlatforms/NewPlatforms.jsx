import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './NewPlatforms.css';
import { addNgPltf } from '../../actions/actions';

export default function NewPlatforms() {
  let dispatch = useDispatch();

  let [newplatform, setNewplatform] = useState('');
  let [newplatforms, setNewplatforms] = useState([]);

  let sended = useSelector(state => state.sended);
  let addeptf = useSelector(state => state.addedplatfms);

  // Cuando envía el formulario manda el arreglo de nuevos géneros al store.
  useEffect(() => {
    if (sended) {
      dispatch(addNgPltf(newplatforms));
    }
  }, [sended, newplatforms, dispatch]);

  // Una vez que el store recibe las plataformas limpia el input y arreglo.
  useEffect(() => {
    if (addeptf) {
      setNewplatforms([]);
      setNewplatform('');
    }
  }, [addeptf]);

  function handleChange(e) {
    setNewplatform(e.target.value);
  }

  function handleClickPlus(e) {
    if (newplatform) {
      setNewplatforms([...newplatforms, newplatform]);
      setNewplatform('');
    }
  }

  // Quita género de la selección
  function removeItem(item) {
    let newItems = newplatforms.filter(e => e !== item);
    setNewplatforms(newItems);
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
          className="angpforminput"
          value={newplatform}
          name='newplatform'
          placeholder="New platform"
          onChange={handleChange}>
        </input>
        <input type="button" onClick={handleClickPlus} value={'+'} />
        <div className="ngencont">
          {newplatforms && newplatforms.map((item, index) => (
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
