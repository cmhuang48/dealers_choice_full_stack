import React from 'react';
import Nav from './Nav';
import Companies from './components/Companies';
import Employees from './components/Employees';
import Employee from './components/Employee';
import { loadCompanies, loadEmployees, SET_VIEW } from './store';
import { connect } from 'react-redux'; 
import { HashRouter as Router, Route } from 'react-router-dom';

const Home = () => {
  return (
    <hr />
  )
}

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
      <Router>
        <div>
          <h1>Acme Companies</h1>
          <Route component={Home} path='/' exact />
          <Route component={Nav} />
          <Route component={Companies} path='/companies' exact />
          <Route component={Employees} path='/employees' exact />
          <Route component={Employee} path='/employees/:id' exact />
        </div>
      </Router>
    )
  }
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  return {
    bootstrap: async () => {
      dispatch(loadCompanies());
      dispatch(loadEmployees());
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