import fetch from 'node-fetch';
export const SET_NG_GEN_SEL = "SET_NG_GEN_SEL";
export const SET_NG_PTF_SEL = "SET_NG_PTF_SEL";
export const SEND_FORM = "SEND_FORM";
export const INIT_SEARCH = "INIT_SEARCH";
export const CLEAN_SEARCH = "CLEAN_SEARCH";
export const SET_ORIG = "SET_ORIG";
export const SHOW_MSG = "SHOW_MSG";
export const SET_ORDER_OPT = "SET_ORDER_OPT";
export const SET_SEARCH_GEN = "SET_SEARCH_GEN";
export const DB_GEN_OP_SEARCH = "DB_GEN_OP_SEARCH";
export const API_GEN_OP_SEARCH = "API_GEN_OP_SEARCH";
export const TITLE_SEARCH = "TITLE_SEARCH";
export const GET_API_GAMES = "GET_API_GAMES";
export const GET_DB_GAMES = "GET_DB_GAMES";
//export const CLEAN_CARDS = "CLEAN_CARDS";//bORRAR
export const SET_GAMES_TO_SHOW = "SET_GAMES_TO_SHOW";
export const ADD_NG_GEN = "ADD_NG_GEN";
export const ADD_NG_PLTF = "ADD_NG_PLTF,";

//---------New Game -----------
export function saveNgGenSel(arr) {
  return { type: SET_NG_GEN_SEL, payload: arr };
}

export function saveNgPlatfSel(arr) {
  return { type: SET_NG_PTF_SEL, payload: arr };
}

export function sendedForm(boolean) {
  return { type: SEND_FORM, payload: boolean };
}

//---------Search Game -----------

export function initsearch(boolean) {
  return { type: INIT_SEARCH, payload: boolean };
}

export function cleansearch(boolean) {
  return { type: CLEAN_SEARCH, payload: boolean };
}

export function setOrigOpt(str) {
  return { type: SET_ORIG, payload: str };
}

export function setShowmsg(boolean) {
  return { type: SHOW_MSG, payload: boolean };
}

export function searchGenre(str) {
  return { type: SET_SEARCH_GEN, payload: str };
}

export function setOrderOpt(str) {
  return { type: SET_ORDER_OPT, payload: str };
}

export function dbGenOpSearch() {
  return async function (dispatch) {
    return fetch(" http://localhost:3001/genres")
      .then(response => response.json()) 
      .then(arr => {
        let newarr = arr.map(e => e.name);
        return newarr;
      })
      .then(arr => {
        // console.log(arr);
        dispatch({ type: DB_GEN_OP_SEARCH, payload: arr })
      })
  }
}

// Request a la API para traerse los géneros desde el back.
export function apiGenOpSearch() {
  return async function (dispatch) {
    return fetch("http://localhost:3001/apigenres")
      .then(response => response.json()) 
      .then(arr => {
        // console.log(arr);
        dispatch({ type: API_GEN_OP_SEARCH, payload: arr })
      })
  }
}

export function titleSearch(str) {
  return { type: TITLE_SEARCH, payload: str };
}

// Request a la API para traer los 100 primeros videojuegos desde el back.
export function getApiGames() {
  return async function (dispatch) {
    return fetch("http://localhost:3001/videogames/")
      .then(response => response.json()) 
      .then(arr => {
        //console.log(arr);
        dispatch({ type: GET_API_GAMES, payload: arr });
      })
  }
}

// Request a la DB para traer los videojuegos.
export function getDbGames() {
  return async function (dispatch) {
    return fetch("http://localhost:3001/dbvideogames")
      .then(response => response.json()) 
      .then(arr => {
        // console.log(arr);
        dispatch({ type: GET_DB_GAMES, payload: arr });
      })
  }
}

// export function cleancards(boolean) { // Borrar!!!
//   return { type: CLEAN_CARDS, payload: boolean };
// }

export function setGamesToShow(arr) { // Borrar!!!
  return { type: SET_GAMES_TO_SHOW, payload: arr };
}

export function addNgGen(arr) {
  return { type: ADD_NG_GEN, payload: arr };
}

export function addNgPltf(arr) {
  return { type: ADD_NG_PLTF, payload: arr };
}

// Request a la API para traer las plataformas de videojuegos desde el front..
// export function getApiPlatforms() {
//   return function (dispatch) {
//     return fetch("https://api.rawg.io/api/platforms") //url de api con plataformas
//       .then(response => response.json()) //aplica json y retorna
//       .then(json => {
//         let data = json.results;
//         let apiPlatfs = data.map(e => e.name);
//         return apiPlatfs;
//       })
//       .then(platfs => {
//         dispatch({ type: GET_API_PLATFORMS, payload: platfs }) // lo manda al reducer
//       });
//   };
// }
//----------------------------------------------------------
// Request a la API para traerse los géneros desde el front.
// export function apiGenOpSearch() {

//   const genObjFromArr = (arreglo) => {
//     let arr = arreglo;
//     let gen = [];
//     for (let i = 0; i < arr.length; i++) {
//       let obj = { value: arr[i].name, label: arr[i].name };
//       gen.push(obj);
//     }
//     return gen;
//   }

//   return function (dispatch) {
//     fetch("https://api.rawg.io/api/genres?key=bb129cbd5b1b4968a7aec68ed0a7b91d")
//       .then(response => {
//         return response.json();
//       })
//       .then(json => {
//         return json.results;
//       })
//       .then(async jarr => {
//         let narr = await genObjFromArr(jarr);
//         return narr; //<---
//       })
//       .then(arr => {
//         dispatch({ type: API_GEN_OP_SEARCH, payload: arr })
//       })
//   }
// }
