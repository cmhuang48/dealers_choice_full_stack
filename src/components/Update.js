import React from 'react';
import { connect } from 'react-redux';
import { updateMusician } from '../store';

class Update extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: this.props.musician.id ? this.props.musician.name : '',
      instrument: this.props.musician.id ? this.props.musician.instrument : '',
      phone: this.props.musician.id ? this.props.musician.phone : ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  componentDidUpdate (prevProps) {
    if (!prevProps.musician.id && this.props.musician.id) {
      this.setState({name: this.state.name, instrument: this.state.instrument, phone: this.state.phone});
    }
  }
  onSave(ev) {
    ev.preventDefault();
    this.props.update(this.props.musician.id, this.state.name, this.state.instrument, this.state.phone);
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
        <input name='name' value={name} onChange={onChange}/>
        <input name='instrument' value={instrument} onChange={onChange}/>
        <input name='phone' value={phone} onChange={onChange}/>
        <button>Save</button>
      </form>
    );
  };
};

const mapStateToProps = (state, otherProps) => {
  const musician = state.musicians.find(musician => musician.id === otherProps.match.params.id*1) || {};
  return {
    musician
  };
};

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    update: (id, name, instrument, phone) => {
      dispatch(updateMusician(id, name, instrument, phone, history));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);