import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = ({companies, employees, location: { pathname }}) => {
  return (
    <nav>
      <Link to='/' className={pathname === '/' ? 'selected' : ''}>Home</Link>
      <Link to='/companies'className={pathname === '/companies' ? 'selected' : ''}>Companies ({companies.length})</Link>
      <Link to='/employees'className={pathname === '/employees' ? 'selected' : ''}>Employees ({employees.length})</Link>
    </nav>
  )
};

export default connect(state => state)(Nav);