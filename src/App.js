import React from 'react';
import axios from 'axios';
import Companies from './components/Companies';

export default class App extends React.Component {
  constructor () {
    super();
    this.state = {
      companies: []
    };
  }
  async componentDidMount () {
    const companies = (await axios.get('/api/companies')).data;
    this.setState({ companies });
  }
  render () {
    const { companies } = this.state;
    return (
      <div>
        <h1>Acme Companies</h1>
        <Companies companies={companies}/>
      </div>
    )
  }
};