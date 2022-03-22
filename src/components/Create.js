import React from 'react';
import { connect } from 'react-redux';
import { createMusician } from '../store';

class Create extends React.Component {
  constructor () {
    super();
    this.state = {
      name: '',
      instrument: '',
      phone: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  onSave(ev) {
    ev.preventDefault();
    this.props.create(this.state.name, this.state.instrument, this.state.phone);
  }
  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }
  render () {
    const {name, instrument, phone} = this.state;
    const {onChange, onSave} = this;
    return (
      <form onSubmit={onSave}>
        <input name='name' value={name} placeholder='Name' onChange={onChange}/>
        <select name='instrument' value={instrument} onChange={onChange}>
          <option value=''>--Instrument--</option>
          <option value='violin'>Violin</option>
          <option value='viola'>Viola</option>
          <option value='cello'>Cello</option>
          <option value='bass'>Bass</option>
        </select>
        <input name='phone' value={phone} placeholder='Phone' onChange={onChange}/>
        <button disabled={!name || !instrument || !phone}>Save</button>
      </form>
    );
  };
};

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    create: (name, instrument, phone) => {
      dispatch(createMusician(name, instrument, phone, history));
    }
  };
};

export default connect(null, mapDispatchToProps)(Create);