import React from 'react';
import { connect } from 'react-redux';
import { createMusician } from '../store';
import { Link } from 'react-router-dom';
import faker from 'faker';

const Musicians = ({musicians, createMusician}) => {
  return (
    <div>
      <h2>Musicians ({musicians.length})</h2>
      <ul>
        {musicians.map(musician => {
          return (
            <li key={musician.id}>
              <Link to={`/musicians/${musician.id}`}>
                {musician.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <button onClick={() => createMusician(`${faker.name.firstName()} ${faker.name.lastName()}`, 'violin', 'XXX-XXX-XXXX')}>Create Random Musician</button>
    </div>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    createMusician: (name, instrument, phone) => {
      dispatch(createMusician(name, instrument, phone, history));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Musicians);