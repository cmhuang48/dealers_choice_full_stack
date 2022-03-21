import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const LOAD_COMPANIES = 'LOAD_COMPANIES';
export const LOAD_EMPLOYEES = 'LOAD_EMPLOYEES';
export const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE';
export const DESTROY_EMPLOYEE = 'DESTROY_EMPLOYEE';
export const SET_VIEW = 'SET_VIEW';

const companiesReducer = (state = [], action) => {
  if (action.type === LOAD_COMPANIES) {
    state = action.companies;
  }
  return state;
};

const employeesReducer = (state = [], action) => {
  if (action.type === LOAD_EMPLOYEES) {
    state = action.employees;
  }
  if (action.type === CREATE_EMPLOYEE) {
    state = [...state, action.employee];
  }
  if (action.type === DESTROY_EMPLOYEE) {
    state = state.filter(employee => employee.id !== action.employee.id);
  }
  return state;
};

const viewReducer = (state = '', action) => {
  if (action.type === SET_VIEW) {
    state = action.view;
  }
  return state;
};

const reducer = combineReducers({
  companies: companiesReducer,
  employees: employeesReducer,
  view: viewReducer
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export const loadCompanies = () => {
  return async (dispatch) => {
    const companies = (await axios.get('/api/companies')).data;
    dispatch({
      type: LOAD_COMPANIES,
      companies
    });
  };
};

export const loadEmployees = () => {
  return async (dispatch) => {
    const employees = (await axios.get('/api/employees')).data;
    dispatch({
      type: LOAD_EMPLOYEES,
      employees
    });
  };
};

export const createEmployee = (name, history) => {
  return async (dispatch) => {
    const employee = (await axios.post('/api/employees', { name })).data;
    dispatch({
      type: CREATE_EMPLOYEE,
      employee
    });
    history.push(`/employees/${employee.id}`);
  };
};

export const destroyEmployee = (employee, history) => {
  return async (dispatch) => {
    await axios.delete(`/api/employees/${employee.id}`);
    dispatch({
      type: DESTROY_EMPLOYEE,
      employee
    });
    history.push('/employees');
  }
}

export default store;