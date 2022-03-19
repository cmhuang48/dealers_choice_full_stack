import React from 'react';
import { connect } from 'react-redux';

const Nav = ({companies, employees}) => {
  return (
    <nav>
      <a href='#companies'>Companies ({companies.length})</a>
      <a href='#employees'>Employees ({employees.length})</a>
    </nav>
  )
};

export default connect(state => state)(Nav);