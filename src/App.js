import React from 'react';
import axios from 'axios';
import Nav from './Nav';
import Companies from './components/Companies';
import Employees from './components/Employees';
import { LOAD_COMPANIES, LOAD_EMPLOYEES, SET_VIEW } from './store';
import { connect } from 'react-redux'; 

class _App extends React.Component {
  componentDidMount () {
    this.props.bootstrap();
    window.addEventListener('hashchange', () => {
      this.props.setView(window.location.hash.slice(1));
    });
    this.props.setView(window.location.hash.slice(1));
  }
  render () {
    const { view } = this.props;
    return (
      <div>
        <h1>Acme Companies</h1>
        <Nav />
        { view === 'companies' && <Companies /> }
        { view === 'employees' && <Employees /> }
      </div>
    )
  }
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  return {
    bootstrap: async () => {
      const companies = (await axios.get('/api/companies')).data;
      dispatch({
        type: LOAD_COMPANIES,
        companies
      });
      const employees = (await axios.get('/api/employees')).data;
      dispatch({
        type: LOAD_EMPLOYEES,
        employees
      });
    },
    setView: function (view) {
      dispatch({
        type: SET_VIEW,
        view
      });
    }
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(_App);

export default App;