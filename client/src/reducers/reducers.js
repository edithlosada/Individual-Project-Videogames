import {
  SET_NG_GEN_SEL, SET_NG_PTF_SEL, SEND_FORM,
  INIT_SEARCH, CLEAN_SEARCH, SET_ORIG, SHOW_MSG, SET_SEARCH_GEN, SET_ORDER_OPT,
  DB_GEN_OP_SEARCH, API_GEN_OP_SEARCH, TITLE_SEARCH, GET_API_GAMES,
  GET_DB_GAMES, //CLEAN_CARDS ,//<--BORRAR
  SET_GAMES_TO_SHOW, ADD_NG_GEN , ADD_NG_PLTF
} from '../actions/actions';

const initialState = {
  //------New game------
  nggensel: [],
  ngplatfsel: [],
  sended: false,
  //-----Search game----
  initsearch: false,
  cleansearch: false,
  searchOrig: '',
  showmsg: true,
  searchgenre: '',
  ordering: '',
  dbgenopts: null,
  apigenopts: null,
  stitle: '',
  apigames: null,
  dbgames: null,
  // cleancards: true, // borrar
  gamestoshow: null,
  addedgenres: [],
  addedplatfms: [],
};

function reducer(state = initialState, action) {

  switch (action.type) {
    //------New game------
    case SET_NG_GEN_SEL:
      return {
        ...state,
        nggensel: action.payload
      }
    case SET_NG_PTF_SEL:
      return {
        ...state,
        ngplatfsel: action.payload
      }
    case SEND_FORM:
      return {
        ...state,
        sended: action.payload
      }
    //-----Search game----
    case INIT_SEARCH:
      return {
        ...state,
        initsearch: action.payload
      }
    case CLEAN_SEARCH:
      return {
        ...state,
        cleansearch: action.payload
      }
    case SET_ORIG:
      return {
        ...state,
        searchOrig: action.payload
      }
    case SHOW_MSG:
      return {
        ...state,
        showmsg: action.payload
      }
    case SET_SEARCH_GEN:
      return {
        ...state,
        searchgenre: action.payload
      }
    case SET_ORDER_OPT:
      return {
        ...state,
        ordering: action.payload
      }
    case DB_GEN_OP_SEARCH:
      return {
        ...state,
        dbgenopts: action.payload
      }
    case API_GEN_OP_SEARCH:
      return {
        ...state,
        apigenopts: action.payload
      }
    case TITLE_SEARCH:
      return {
        ...state,
        stitle: action.payload
      }
    case GET_API_GAMES:
      return {
        ...state,
        apigames: action.payload
      }
    case GET_DB_GAMES:
      return {
        ...state,
        dbgames: action.payload
      }
    // case CLEAN_CARDS:
    //   return {
    //     ...state,
    //     cleancards: action.payload
    //   }
    case SET_GAMES_TO_SHOW:
      return {
        ...state,
        gamestoshow: action.payload
      }
    case ADD_NG_GEN:
      return {
        ...state,
        addedgenres: action.payload
      }
    case ADD_NG_PLTF:
      return {
        ...state,
        addedplatfms: action.payload
      }


    default:
      return state;
  }
};

export default reducer;
