import React from 'react';
import { connect } from 'react-redux';
import { createEmployee } from '../store';
import { Link } from 'react-router-dom';
import faker from 'faker';

const Employees = ({employees, createEmployee}) => {
  return (
    <div>
      <h2>Employees ({employees.length})</h2>
      <ul>
        {employees.map(employee => {
          return (
            <li key={employee.id}>
              <Link to={`/employees/${employee.id}`}>
                {employee.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <button onClick={() => createEmployee(`${faker.name.firstName()} ${faker.name.lastName()}`)}>Create Employee</button>
    </div>
  )
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    createEmployee: (name) => {
      dispatch(createEmployee(name, history));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Employees);