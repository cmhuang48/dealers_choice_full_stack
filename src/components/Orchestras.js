import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Orchestras = ({orchestras}) => {
  return (
    <div>
      <h2>Orchestras ({orchestras.length})</h2>
      <ul>
        {orchestras.map(orchestra => {
          return (
            <li key={orchestra.id}>
              <Link to={`/orchestras/${orchestra.id}`}>
                {orchestra.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default connect(state => state)(Orchestras);