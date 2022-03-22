import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = ({orchestras, musicians, location: { pathname }}) => {
  return (
    <nav>
      <Link to='/' className={pathname === '/' ? 'selected' : ''}>Home</Link>
      <Link to='/orchestras' className={pathname === '/orchestras' ? 'selected' : ''}>Orchestras ({orchestras.length})</Link>
      <Link to='/musicians' className={pathname === '/musicians' ? 'selected' : ''}>Musicians ({musicians.length})</Link>
      <Link to='/musicians/create' className={pathname === '/musicians/create' ? 'selected' : ''}>Create Custom Musician</Link>
    </nav>
  )
};

export default connect(state => state)(Nav);