import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './GenreSelect.css';
import { dbGenOpSearch, apiGenOpSearch, searchGenre } from '../../actions/actions';

//used on SearchMenu

export default function GenreSelect() {

  let dispatch = useDispatch();
  let orig = useSelector(state => state.searchOrig);// <--Busca el origen del store.
  let apigop = useSelector(state => state.apigenopts);
  let dbgop = useSelector(state => state.dbgenopts);

  let [genOp, setGenOp] = useState([]); // opciones de géneros
  let [sgenre, setSgenre] = useState(''); // género seleccionado

  // Cada vez que cambie el origen guarda el estado en el store
  // y setea genreopts con los valores correspondientes
  useEffect(() => {
    // Que limpie 1ro cualquier selección anterior de género
    dispatch(searchGenre(''));
    setSgenre('');
    if (orig) {
      if (orig === 'API') {
        dispatch(apiGenOpSearch());
      }
      if (orig === 'DB') {
        dispatch(dbGenOpSearch());
      }
    }
    // console.log(`(1) ${genOp}`);
  }, [orig, dispatch]);

  useEffect(() => {
   if (orig) {
      if (orig === 'API') {
        if(apigop){
          setGenOp(apigop);//setea localmente los géneros
        }
      }
      if (orig === 'DB') {
        if(dbgop){
          setGenOp(dbgop); 
        }
      }
   }
  }, [orig,apigop,dbgop,setGenOp]); 

  //Carga el componente nuevamente cuando recibe los géneros
  useEffect(() => {
  }, [genOp]);

  // Manda al store el género a buscar
  function handleChange(e) {
    dispatch(searchGenre(e.target.value));
    setSgenre(e.target.value);
  }

  // Cuando cambie el género seleccionado lo manda al store.
  useEffect(() => {
    dispatch(searchGenre(sgenre));
  }, [sgenre, dispatch]);

  return (
    <div className="gcont">
      <select
        name="genres"
        className="gselect"
        value={sgenre}
        onChange={handleChange}
      >
        <option className="gselect2" defaultValue hidden={true} >Genre:</option>
        {genOp && genOp.map((option, index) => (
          <option className="gselect2" key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}

