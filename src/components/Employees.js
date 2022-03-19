import React from 'react';
import { connect } from 'react-redux';

const Employees = ({employees}) => {
  return (
    <div>
      <h2>Employees ({employees.length})</h2>
      <ul>
        {employees.map(employee => <li key={employee.id}>{employee.name}</li>)}
      </ul>
    </div>
  )
}

export default connect(state => state)(Employees);