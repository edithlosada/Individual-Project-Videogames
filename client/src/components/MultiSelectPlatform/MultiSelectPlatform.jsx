import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './MultiSelectPlatform.css';
import platfopt from '../Platforms/Platforms';
import { saveNgPlatfSel, sendedForm } from '../../actions/actions';

export function MultiSelectPlatform(props) {

  const dispatch = useDispatch();

  // Estado de plataformas seleccionadas
  let [splatforms, setSplatforms] = useState([]); // selected platforms

  // Quita plataforma de la selección y guarda en store
  function removeItem(item) {
    let newItems = splatforms.filter(e => e !== item);
    setSplatforms(newItems);
    dispatch(saveNgPlatfSel(splatforms));
  }

  // Cuando hace selección en desplegable lo seleciona/deselecciona y guarda en store
  function handleChange(e) {
    let itemP = e.target.value;
    let hasItem = splatforms.includes(itemP);
    if (!hasItem) {
      setSplatforms([...splatforms, itemP]);
      dispatch(saveNgPlatfSel(splatforms));
    } else {
      removeItem(itemP);
    }
  }

  // Cuando hace click en el botón lo saca
  function handleClick(e) {
    let itm = e.target.value;
    removeItem(itm);
  }

  //Cada vez que cambia una plataforma guarda el estado en el store
  useEffect(() => {
    dispatch(saveNgPlatfSel(splatforms));
  }, [splatforms,dispatch]);

  const sended = useSelector(state => state.sended);
  useEffect(() => {
    setSplatforms([]);
    dispatch(sendedForm(false));
  }, [sended,dispatch]);

  return (
    <div className="selplatfom">
      <select
        name="platforms"
        placeholder="Platforms..."
        className="multselectpf"
        value={''}
        onChange={handleChange}
      >
        <option defaultValue className="selectpfT">Platforms: </option>
        {platfopt.map((item, index) => (
          <option key={index} value={item.value}>{item.label}</option>
        ))}
      </select>
      <div className="platfcont">
        {splatforms.map((item, index) => (
          <button className="selplatfbtn" value={item}
            onClick={handleClick} key={index}>
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MultiSelectPlatform;
