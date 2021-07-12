import React , {useEffect }from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SearchMenu.css';
import GenreSelect from '../GenreSelect/GenreSelect';
import OrigSelect from '../OrigSelect/OrigSelect';
import SearchBar from '../SearchBar/SearchBar.jsx';
import Ordering from '../Ordering/Ordering.jsx';
import { initsearch ,cleansearch ,setGamesToShow } from '../../actions/actions';

export default function SearchMenu() {

  useEffect(() => {
  }, [])

  let dispatch = useDispatch();

  let inits = useSelector(state => state.initsearch);
  
  let handleSubmit = (event) => {
    event.preventDefault(); //sirve para evitar que refresque la pagina cada vez que apreto una tecla (comportamiento por default)
    // console.log('iniciaste búsqueda');
    dispatch(initsearch(true));
  }

  let handleClick =(event) => {
    dispatch(initsearch(false));//permite volver a escribir
    dispatch(cleansearch(true));//que limpie title
    dispatch(setGamesToShow(null));
  }

  return (
    <div className="search_area">
      <form  className="sform" onSubmit={handleSubmit}>
        <div className="search_menu">
          <OrigSelect/>
          <GenreSelect/>
          <Ordering/>
          <SearchBar/>
          <input className="search_btn" type="submit" value="Filter"  />
        </div>
      </form>
      <hr className="separate"/>
        {/* {inits && <button className="clean_search_btn" onClick={handleClick}>Clean search</button>} */}
    </div>
  )
};
