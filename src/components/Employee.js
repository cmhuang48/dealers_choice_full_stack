import React from 'react';
import { connect } from 'react-redux';
import { destroyEmployee } from '../store';

const Employee = ({employee, destroyEmployee}) => {
  if (!employee) {
    return null;
  }
  return (
    <div>
      Employee details for {employee.name}
      <button onClick={() => destroyEmployee(employee)}>Delete Employee</button>
    </div>
  )
}

const mapStateToProps = (state, otherProps) => {
  const employee = state.employees.find(employee => employee.id === otherProps.match.params.id*1) || {};
  return {
    employee
  };
}

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    destroyEmployee: (employee) => {
      dispatch(destroyEmployee(employee, history));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Employee);