import React from 'react';
import Nav from './Nav';
import Orchestras from './components/Orchestras';
import Orchestra from './components/Orchestra';
import Musicians from './components/Musicians';
import Musician from './components/Musician';
import Create from './components/Create';
import Update from './components/Update';
import { loadOrchestras, loadMusicians } from './store';
import { connect } from 'react-redux'; 
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

const Home = () => {
  return (
    <hr />
  )
}

class _App extends React.Component {
  componentDidMount () {
    this.props.bootstrap();
  }
  render () {
    return (
      <Router>
        <div>
          <h1>Music World</h1>
          <Route component={Home} path='/' exact />
          <Route component={Nav} />
          <Route component={Orchestras} path='/orchestras' exact />
          <Route component={Orchestra} path='/orchestras/:id' exact />
          <Route component={Musicians} path='/musicians' exact />
          <Switch>
            <Route component={Create} path='/musicians/create' exact />
            <Route component={Musician} path='/musicians/:id' exact />
          </Switch>
          <Route component={Update} path='/musicians/:id/update' exact />
        </div>
      </Router>
    )
  }
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  return {
    bootstrap: async () => {
      dispatch(loadOrchestras());
      dispatch(loadMusicians());
    }
  };
};

const App = connect(mapStateToProps, mapDispatchToProps)(_App);

export default App;