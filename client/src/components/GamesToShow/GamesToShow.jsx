import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './GamesToShow.css';
import GameCard from '../GameCard/GameCard.jsx';

export default function GamesToShow() {

  let orig = useSelector(state => state.searchOrig);
  let inits = useSelector(state => state.initsearch);
  let titFiltGames = useSelector(state => state.gamestoshow); // juegos para mostrar
  let orderchoice = useSelector(state => state.ordering);

  let [ordarr, setOrdarr] = useState(null);

  let [pageCount, setPageCount] = useState(null);
  let [currentPage, setCurrentPage] = useState(0); //inicialmente la primer página
  let [currentPageArr, setCurrentPArr] = useState([]);
  let [pages, setPages] = useState(null);
  let PER_PAGE = 6;

  useEffect(() => {
  },[inits])
  useEffect(() => {
    function letsorder(arr, op) {
      if ((op === 'abcCreciente') || (op === 'abcDecreciente')) {
        arr.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          return 0;
        });
        if (op === 'abcDecreciente') arr.reverse();
        return arr;
      } else if ((op === 'nroCreciente') || (op === 'nroDecreciente')) {
        arr.sort((a, b) => a.rating - b.rating);
        if (op === 'nroDecreciente') arr.reverse();
        return arr;
      }
    }
    setOrdarr(null); //limpia

    if (titFiltGames) {
      let arr = titFiltGames;
      if (orderchoice) {
        letsorder(arr, orderchoice);
      }
      setOrdarr(arr);
    }
  }, [titFiltGames, orderchoice])

  useEffect(() => {
    if (ordarr) {
      let n = ordarr.length; // Nro total de juegos a mostrar
      let pc = Math.ceil(n / PER_PAGE); // Nro de páginas a mostrar
      setPageCount(pc);
    }
  }, [ordarr, PER_PAGE])

  useEffect(() => {
    if (pageCount) {
      // Función que crea botones para cáda página
      function pagesNumArr(pageCount) {
        let arr = [];
        for (let i = 1; i <= pageCount; i++) {
          arr.push(i);
        }
        return arr;
      }
      let pages = pagesNumArr(pageCount);
      setPages(pages);
    }
  }, [pageCount])

  useEffect(() => {
    if (pages) {
      // Función que obtiene el subarreglo de juegos a mostrar según la pagina
      // en la que se encuentre.
      function inpageshow(currentPage, perpage, ordarr) {
        let offset = currentPage * perpage;
        let currentPageArr = ordarr.slice(offset, offset + PER_PAGE)
        // console.log(currentPageArr);
        setCurrentPArr([...currentPageArr]);
      }

      if (ordarr) {
        inpageshow(currentPage, PER_PAGE, ordarr);
      }
    }
  }, [currentPage, PER_PAGE, ordarr, pages])

  function handlePrev() {
    if (currentPage !== 0) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleNext = (e) => {
    console.log(currentPage);
    console.log(pageCount);
    if (currentPage < pageCount - 1) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handlePage(e) {
    setCurrentPage(e.target.value - 1);
    console.log('current page is' + currentPage);
  }

  return (
    <div className="cards_area">
      {inits && <>
        <button className="p_button" onClick={handlePrev}>&#8249;</button>
        <div className="cardcont1" >
          <div className="cardcont" >
            {currentPageArr && currentPageArr.map((g, i) => (//source
              <GameCard key={i} orig={orig} id={g.id} name={g.name} rating={g.rating} img={g.img_url} genres={g.genres} />
            ))}
          </div>
          <div className="p_btn_area">
            {pages && pages.map((p, i) => (
              <button key={i} className="one_button" onClick={handlePage} value={p}> {p} </button>
            ))}
          </div>
        </div>
        <button className="p_button" onClick={handleNext}>&#8250;</button>
      </>}

    </div>
  )
}
