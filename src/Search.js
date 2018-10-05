import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };

    this.updatequery = this.updatequery.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updatequery(e) {
    this.setState({query: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.search(this.state);
    this.setState({ query: '' });
    console.log("search completed");
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type= "text"
            value={this.state.query}
            onChange={this.updatequery}
          />
        </form>
      </div>
    )
  }
}
export default Search
