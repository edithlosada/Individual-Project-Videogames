import React, { useState, useEffect } from 'react';
import './Ordering.css';
import { useDispatch } from 'react-redux';
import { setOrderOpt ,initsearch ,cleansearch ,setGamesToShow  } from '../../actions/actions';

export default function Ordering() {

  const dispatch = useDispatch();

  let orderOp = [
    { label: "Increasing alphabetical", value: "abcCreciente" },
    { label: "Decreasing alphabetical", value: "abcDecreciente" },
    { label: "Increasing rating", value: "nroCreciente" },
    { label: "Decreasing rating", value: "nroDecreciente" },
  ];

  let [order, setOrder] = useState(''); // <---

  // Según selección determina el orden de búsqueda
  function handleChange(e) {
    setOrder(e.target.value);
  }

  //Cada vez que cambie el orden guarda el estado en el store y limpia
  useEffect(() => {
    dispatch(setOrderOpt(order));
    dispatch(initsearch(false));//permite volver a escribir
    dispatch(cleansearch(true));//que limpie title
    dispatch(setGamesToShow(null));
  }, [order, dispatch]);

  return (
    <div className="ord_cont">
      <select
        name="orderO"
        className="ord_select"
        value={order}
        onChange={handleChange}
      >
        <option className="ord_select2" defaultValue hidden={true} >Order:</option>
        {orderOp && orderOp.map((option, index) => (
          <option className="ord_select2" key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}
