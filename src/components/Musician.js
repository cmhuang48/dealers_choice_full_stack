import React from 'react';
import { connect } from 'react-redux';
import { destroyMusician } from '../store';
import { Link } from 'react-router-dom';

const Musician = ({musician, destroy}) => {
  if (!musician) {
    return null;
  }
  return (
    <div>
      <h2>{musician.name}</h2>
      <h4>Instrument: {musician.instrument}</h4>
      <h4>Phone: {musician.phone}</h4>
      <br />
      <button onClick={() => destroy(musician)}>Delete</button>
      <br />
      <Link to={`/musicians/${musician.id}/update`}>Update</Link>
    </div>
  );
};

const mapStateToProps = (state, otherProps) => {
  const musician = state.musicians.find(musician => musician.id === otherProps.match.params.id*1) || {};
  return {
    musician
  };
};

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    destroy: (musician) => {
      dispatch(destroyMusician(musician, history));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Musician);