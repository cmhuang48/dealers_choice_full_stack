import { createStore, combineReducers } from 'redux';

export const LOAD_COMPANIES = 'LOAD_COMPANIES';
export const LOAD_EMPLOYEES = 'LOAD_EMPLOYEES';
export const SET_VIEW = 'SET_VIEW';

const companiesReducer = (state = [], action) => {
  if (action.type === LOAD_COMPANIES) {
    state = action.companies;
  }
  return state;
}

const employeesReducer = (state = [], action) => {
  if (action.type === LOAD_EMPLOYEES) {
    state = action.employees;
  }
  return state;
}

const viewReducer = (state = '', action) => {
  if (action.type === SET_VIEW) {
    state = action.view;
  }
  return state;
}

const store = createStore(combineReducers({
  companies: companiesReducer,
  employees: employeesReducer,
  view: viewReducer
}));

export default store;