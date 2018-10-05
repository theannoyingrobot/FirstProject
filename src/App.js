import React, { Component } from 'react';
import './App.css';
import Search from './Search';

class App extends Component {
  constructor() {
    super();

    this.state = {
      query: '',
      data: [],
      error: '',
    };

    this.search = this.search.bind(this);
  }

  search({query}) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${query}/`)
        .then(res => res.json())
        .then(res => {
            return res;
        }).then(json => {
         this.setState({
             query: query,
             data: json,
             error: json.Error,
         }, () => {
           console.log(query);
           console.log(json);
         });
       }).catch(err => this.setState({
           error: 'Error Occured: Try Again',
           data: [],
           query: '',
       }));
  }
  render() {
    let data = this.state.data;
    let name = data.name;
    let error = this.state.error;
    let id = data.id;
    return (
      <div>
        <Search search={this.search} />
        <p>{name}</p>
        <p>{id}</p>
        <p>{error}</p>
      </div>
    );
  }
}

export default App;
