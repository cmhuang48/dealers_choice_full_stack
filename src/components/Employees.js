import React from 'react';
import { connect } from 'react-redux';
import { createEmployee } from '../store';

const Employees = ({employees, createEmployee}) => {
  return (
    <div>
      <h2>Employees ({employees.length})</h2>
      <ul>
        {employees.map(employee => <li key={employee.id}>{employee.name}</li>)}
      </ul>
      <button onClick={() => createEmployee(Math.random())}>Create Employee</button>
    </div>
  )
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  return {
    createEmployee: (name) => {
      dispatch(createEmployee(name));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Employees);