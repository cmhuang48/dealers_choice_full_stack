import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const LOAD_ORCHESTRAS = 'LOAD_ORCHESTRAS';
export const LOAD_MUSICIANS = 'LOAD_MUSICIANS';
export const CREATE_MUSICIAN = 'CREATE_MUSICIAN';
export const DESTROY_MUSICIAN = 'DESTROY_MUSICIAN';
export const UPDATE_MUSICIAN = 'UPDATE_MUSICIAN';

const orchestrasReducer = (state = [], action) => {
  if (action.type === LOAD_ORCHESTRAS) {
    state = action.orchestras;
  }
  return state;
};

const musiciansReducer = (state = [], action) => {
  if (action.type === LOAD_MUSICIANS) {
    state = action.musicians;
  }
  if (action.type === CREATE_MUSICIAN) {
    state = [...state, action.musician];
  }
  if (action.type === DESTROY_MUSICIAN) {
    state = state.filter(musician => musician.id !== action.musician.id);
  }
  if (action.type === UPDATE_MUSICIAN) {
    state = state.map(musician => musician.id !== action.musician.id ? musician : action.musician);
  }
  return state;
};

const reducer = combineReducers({
  orchestras: orchestrasReducer,
  musicians: musiciansReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export const loadOrchestras = () => {
  return async (dispatch) => {
    const orchestras = (await axios.get('/api/orchestras')).data;
    dispatch({
      type: LOAD_ORCHESTRAS,
      orchestras
    });
  };
};

export const loadMusicians = () => {
  return async (dispatch) => {
    const musicians = (await axios.get('/api/musicians')).data;
    dispatch({
      type: LOAD_MUSICIANS,
      musicians
    });
  };
};

export const createMusician = (name, instrument, phone, history) => {
  return async (dispatch) => {
    const musician = (await axios.post('/api/musicians', { name, instrument, phone })).data;
    dispatch({
      type: CREATE_MUSICIAN,
      musician
    });
    history.push(`/musicians/${musician.id}`);
  };
};

export const destroyMusician = (musician, history) => {
  return async (dispatch) => {
    await axios.delete(`/api/musicians/${musician.id}`);
    dispatch({
      type: DESTROY_MUSICIAN,
      musician
    });
    history.push('/musicians');
  };
};

export const updateMusician = (id, name, instrument, phone, history) => {
  return async (dispatch) => {
    const musician = (await axios.put(`/api/musicians/${id}`, { name, instrument, phone })).data;
    dispatch({
      type: UPDATE_MUSICIAN,
      musician
    });
    history.push('/musicians');
  };
};

export default store;