import React from 'react';
import { connect } from 'react-redux';

const Orchestra = ({orchestra}) => {
  if (!orchestra || !orchestra.musicians) {
    return null;
  }
  return (
    <div>
      <h2>{orchestra.name}</h2>
      <ul>
        <h4>Catch Phrase</h4>
        <li>{orchestra.catchPhrase}</li>
        <h4>Description</h4>
        <li>{orchestra.description}</li>
        <h4>Phone</h4>
        <li>{orchestra.phone}</li>
        <h4>Musicians</h4>
        {orchestra.musicians.map(musician => {
          return (
            <li key={musician.id}>{musician.name}</li>
          )
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = (state, otherProps) => {
  const orchestra = state.orchestras.find(orchestra => orchestra.id === otherProps.match.params.id*1) || {};
  return {
    orchestra
  };
};


export default connect(mapStateToProps)(Orchestra);