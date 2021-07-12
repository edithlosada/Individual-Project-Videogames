import React, { useState , useEffect} from 'react';
import { useDispatch , useSelector} from 'react-redux';
import './SearchBar.css';
import { titleSearch ,cleansearch } from '../../actions/actions';

export default function SearchBar() {

  let dispatch = useDispatch();
  let inits = useSelector(state => state.initsearch);
  let cleans = useSelector(state => state.cleansearch);
  let sgenre = useSelector(state => state.searchgenre);
  // let st = useSelector(state => state.stitle);
  let [gname,setGname] = useState('');// game name

  // Registra cambios en el input de búsqueda 
  // y lo guarda en el estado local del componente
  const handleChange = (e) => {
    console.log(e.target.value);
    setGname(e.target.value);
  }

  // Cada vez que presione buscar, state.initsearch/inits = true
  // y manda el titulo al store (state.stitle).
  useEffect(() => {
    if(inits){
      // console.log(`buscaste ${gname}`);
      dispatch(titleSearch(gname));
    }
  },[inits,gname,dispatch]);

  // Cada vez que presione "Otra búsqueda", state.initsearch/inits = false
  // y state.cleansearch/cleans = true. Limpia el input, la búsqueda en el store
  // y vuelve a setear state.cleansearch/cleans = false.
  useEffect(() => {
    if(!!cleans||!!sgenre){
      setGname('');
      // console.log(`buscaste ${gname}`);
      dispatch(titleSearch(''));
      dispatch(cleansearch(false));
    }
  },[cleans,sgenre,dispatch]);
 
  return (
    <>
      <input className="search_input"
        type="text" 
        placeholder="Enter title filter text..." 
        value = {gname}
        onChange = {handleChange}
      />
    </>
  )
};

