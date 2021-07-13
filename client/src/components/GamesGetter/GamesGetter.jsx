import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './GamesGetter.css';
import GamesToShow from '../GamesToShow/GamesToShow.jsx';
import { getApiGames, getDbGames, initsearch, setShowmsg, setGamesToShow } from '../../actions/actions';

export default function GamesGetter() {

  let dispatch = useDispatch();

  let inits = useSelector(state => state.initsearch);
  let cleans = useSelector(state => state.cleansearch);
  let orig = useSelector(state => state.searchOrig);
  let show = useSelector(state => state.showmsg);
  let apig = useSelector(state => state.apigames);
  let dbg = useSelector(state => state.dbgames);
  let sgenre = useSelector(state => state.searchgenre);
  let st = useSelector(state => state.stitle);

  let [gettingG, setGettingG] = useState(false);
  let [games, setGames] = useState(null);
  let [genFiltGames, setGenFiltGames] = useState(null);
  let [titFiltGames, setTitFiltGames] = useState(null);

  let [cardnum, setCardnum] = useState(6);

  useEffect(() => {
  }, [show, inits]);

  // Según el origen manda a buscar el arreglo de juegos 
  // donde corresponda y admninistra mjes.
  useEffect(() => {
    if (orig) {
      setGames(null);
      if (orig === 'API') {
        //console.log('cargaste API');
        dispatch(getApiGames());  // <<-- Sacar!!
        dispatch(setShowmsg(false));
        setGettingG(true);
      }
      if (orig === 'DB') {
        dispatch(getDbGames());  // <<-- Sacar!!
        dispatch(setShowmsg(false));
        setGettingG(true);
      }
    }
  }, [orig, dispatch, setGettingG]);


  // Cuando obtiene el arreglo de juegos lo guarda localmente.
  // y administra mjes
  useEffect(() => {
    if (orig) {
      if (orig === 'API') {
        if (apig) {
          setGames(apig);
        }
      }
      if (orig === 'DB') {
        if (dbg) {
          setGames(dbg);
        }
      }
    }
  }, [orig, apig, dbg, setGames]);

  useEffect(() => {
  }, [gettingG])

  // Si se filtra por género reduce la búsqueda y guarda lo obtenido
  // en el estado genFiltGames.
  useEffect(() => {
    if (games) {
      // console.log(games);
      setGettingG(false);
      if (sgenre) {
        let newarr = games.filter(e => e.genres.includes(sgenre));
        setGenFiltGames(newarr);
      }
      setTitFiltGames(null); // Si cambio el género que quite cualquier selección previa guardada por título.
      dispatch(initsearch(false)); // Cancela cualquier búsqueda anterior para poder escribir.
    }
  }, [sgenre, games, dispatch, setGettingG])

  // Cuando presiona "buscar" filtra lo que ya tenía según el título
  useEffect(() => {

    //console.log(genFiltGames); //........
    if (inits) { // Si presionó/está en buscar
      let arr = games; // arreglo obtenido según orígen
      if (!sgenre) {
        console.log('no había género de búsqueda');
      } else {// si filtró x género usa el arreglo ya filtrado
        // console.log(genFiltGames);
        arr = genFiltGames;
      }
      if (!st) {// si no ingreso texto trae todo
        // console.log('no había texto de búsqueda');
        // console.log(genFiltGames); //........
        setTitFiltGames(arr);
      } else {
        // console.log('search title is' + st);
        let newarr = arr.filter(e => e.name.toLowerCase().includes(st.toLowerCase()));
        setTitFiltGames(newarr);
      }
    }
  }, [inits, games, sgenre, genFiltGames, st]) // agregué games and sgenre

  useEffect(() => {
    if (cleans) {
      setTitFiltGames([]);
    }
  }, [cleans])

  useEffect(() => {
    // console.log(titFiltGames);
    dispatch(setGamesToShow(titFiltGames));
  }, [titFiltGames, dispatch])

  function handleChange(e){
    setCardnum(e.target.value)
  }

  useEffect(() => {
  }, [cardnum]);


  return (
    <div className="p_cards_area">
      {show && <h3> At first choose a search origin (API/DB)...</h3>}
      {gettingG && <h3> ...Getting games from {orig}.</h3>}
      {(!show && !gettingG )&& <>
      <form>
        <label htmlFor="ppage" className="perpage_label">Per page: </label>
        <input type="number" id="ppage" className="perpage" defaultValue="6" min="6" max="20" onChange={handleChange}/>
      </form>
      <GamesToShow perpage={cardnum}/>
      </>}
    </div>
  )
}
