import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './OrigSelect.css';
import { setOrigOpt } from '../../actions/actions';

export default function OriginSelect() {
  let dispatch = useDispatch();

  let origarr = [
    { label: 'DB', value: 'DB' }, 
    { label: 'API', value: 'API' }
  ];

  let [orig, setOrig] = useState('');

  let handleChange = (e) => {
    setOrig(e.target.value);
  }

  // //Cada vez que cambie el origen guarda el estado en el store
  useEffect(() => {
    // console.log(orig);
    dispatch(setOrigOpt(orig));
  }, [orig, dispatch]);

  return (
    <div className="ocont">
      <select
        name="origin"
        className="oselect"
        value={orig}
        onChange={handleChange}
      >
        <option className="oselect2" defaultValue hidden={true}>Origin:</option>
        {origarr.map((option, index) => (
          <option className="oselect2"  key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}