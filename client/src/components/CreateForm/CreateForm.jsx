import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './CreateForm.css';
import MultiSelectPlatform from '../MultiSelectPlatform/MultiSelectPlatform';
import MultiSelectGenre from '../MultiSelectGenre/MultiSelectGenre';
import NewGenres from '../NewGenres/NewGenres';
import NewPlatforms from '../NewPlatforms/NewPlatforms';
import { saveNgGenSel, saveNgPlatfSel,addNgPltf,addNgGen, sendedForm } from '../../actions/actions';
import axios from 'axios';

export default function CreateForm(props) {

  let dispatch = useDispatch();

  let [title, setTitle] = useState('');
  let [released, setReleased] = useState('');
  let [description, setDescription] = useState('');
  let [rating, setRating] = useState('');

  function handleChange(e) {
    let nombre = e.target.name;
    switch (nombre) {
      case 'title':
        setTitle(e.target.value);
        break;
      case 'released':
        setReleased(e.target.value);
        break;
      case 'description':
        setDescription(e.target.value);
        break;
      case 'rating':
        setRating(e.target.value);
        break;
      default:
        break;
    }
  }

  let sended = useSelector(state => state.sended);
  let sgenres = useSelector(state => state.nggensel);
  let splatforms = useSelector(state => state.ngplatfsel);
  let addedg = useSelector(state => state.addedgenres);
  let addeptf = useSelector(state => state.addedplatfms);

  let [gameinfo, setGameinfo] = useState(null);

  // Cuando presione 'Guardar' sended se pone en 'true' y recopila todos los datos.
  useEffect(() => {
    if (sended) {
      let genres = sgenres;
      let platforms = splatforms;
      if (addedg.length !== 0) {
        genres = sgenres.concat(addedg);
      }
      if (addeptf.length !== 0) {
        platforms = splatforms.concat(addeptf);
      }
      let gametoadd = { title, released, description, rating, genres, platforms };
      setGameinfo(gametoadd);
    }
  }, [sended, title, released, description, rating, sgenres, splatforms, addedg, addeptf])

  // Cuando se carga gameinfo lo postea y luego limpia
  useEffect(() => {
    if (gameinfo) {
      console.log(gameinfo);
      alert('juego agregado');
      axios.post('http://localhost:3001/newvideogame', gameinfo)
        .then(resp => {
          console.log(resp.data);
        })

      setTitle('');
      setReleased('');
      setDescription('');
      setRating('');
      dispatch(saveNgGenSel([])); // state.nggensel
      dispatch(saveNgPlatfSel([])); // state.ngplatfsel
      dispatch(addNgGen([])); // state.addedgenres
      dispatch(addNgPltf([])); // state.addedplatfms
      dispatch(sendedForm(false)); // state.sended
    }
  }, [gameinfo,dispatch])


  let handleSubmit = async (event) => {
    event.preventDefault(); //sirve para evitar que refresque la pagina cada vez que apreto una tecla (comportamiento por default)
    dispatch(sendedForm(true)); // state.sended = true
  }



  return (
    <div className="ng_page">
      <div className="ng_container">
        <h1 className="ng_title"  >New game: </h1>
        {/* <form method="post" action="http://localhost:3001/newrecipe" encType = "multipart / form-data" className="ng_formArea" onSubmit={handleSubmit}> */}
        <form method="post" action="http://localhost:3001/newgame" className="ng_formArea" onSubmit={handleSubmit}>
          <input
            id="input_name"
            type="text"
            className="ng_forminput"
            value={title}
            name='title'
            placeholder="Enter the name of the game..."
            onChange={handleChange}>
          </input>
          <input
            id="input_released"
            type="text"
            className="ng_forminput"
            value={released}
            name='released'
            placeholder="Release date..."
            onChange={handleChange}>
          </input>
          <textarea
            id="input_resume"
            className="ng_textinput"
            value={description}
            name='description'
            placeholder="Brief summary..."
            type="text"
            onChange={handleChange}>
          </textarea>
          <input
            id="input_rating"
            type="text"
            className="ng_forminput"
            value={rating}
            name='rating'
            placeholder="Rating..."
            onChange={handleChange}>
          </input>
          <div className="ng_selectArea">
            <MultiSelectPlatform />
            <NewPlatforms />
            <MultiSelectGenre />
            <NewGenres />
          </div>
          <div className="ng_button-area">
            <button className="ng_button" type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
};