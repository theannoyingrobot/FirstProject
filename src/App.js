import React, { Component } from 'react';
import './App.css';
import Search from './Search';
import styled, { css } from 'styled-components';

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
    if (typeof query === 'string') {
      query = query.toLowerCase();
    }

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
         });
       }).catch(err => this.setState({
           error: 'Error Occured: Try Again',
           data: [],
           query: '',
       }));
  }

  toggleForward = () => {
    let searchQuery = this.state.data.id;
    let newQuery = null;

    if (searchQuery === 802) {
      newQuery = 1;
    } else {
      newQuery = searchQuery + 1;
    }

    this.setState({query: newQuery})
    this.search({query: newQuery})
 }

 toggleBackward = () => {
    let searchQuery = this.state.data.id;
    let newQuery = null;

    if (searchQuery === 1) {
      newQuery = 802;
    } else {
      newQuery = searchQuery - 1;
    }

    this.setState({query: newQuery});
    this.search({query: newQuery})
  }

  render() {
    let data = this.state.data;
    let name = data.name;
    let error = this.state.error;
    let id = data.id;
    const sprites = this.state.data.sprites;
    let sprite = null;
    let shinysprite = null;
    let spritefemale = null;
    let shinyspritefemale = null;
    let spriteButton = null;
    let spriteButton2 = null;
    let forwardbutton = null;
    let backwardbutton = null;

    const toggleSprite = () => {
      if (document.getElementById('sprite1').hidden === false){
        console.log("sprite 1 shows")
        document.getElementById('sprite1').hidden = true;
        document.getElementById('sprite2').hidden = false;
        document.getElementById('sprite3').hidden = true;
        document.getElementById('sprite4').hidden = true;
      } else if (document.getElementById('sprite3').hidden === false){
        console.log("Sprite 3 shows")
        document.getElementById('sprite1').hidden = true;
        document.getElementById('sprite2').hidden = true;
        document.getElementById('sprite3').hidden = true;
        document.getElementById('sprite4').hidden = false;
      } else if (document.getElementById('sprite4').hidden === false) {
        console.log("sprite 4 shows")
        document.getElementById('sprite1').hidden = true;
        document.getElementById('sprite2').hidden = true;
        document.getElementById('sprite3').hidden = false;
        document.getElementById('sprite4').hidden = true;
      } else {
        console.log("sprite 2 shows")
        document.getElementById('sprite1').hidden = false;
        document.getElementById('sprite2').hidden = true;
        document.getElementById('sprite3').hidden = true;
        document.getElementById('sprite4').hidden = true;
      }
    }
    const toggleSprite2 = () => {
      if (document.getElementById('sprite3').hidden === false){
        document.getElementById('sprite1').hidden = false;
        document.getElementById('sprite2').hidden = true;
        document.getElementById('sprite3').hidden = true;
        document.getElementById('sprite4').hidden = true;
      } else {
        document.getElementById('sprite1').hidden = true;
        document.getElementById('sprite2').hidden = true;
        document.getElementById('sprite3').hidden = false;
        document.getElementById('sprite4').hidden = true;
      }
    }

    if (sprites !== undefined) {
      sprite = <img src={this.state.data.sprites.front_default} height="150" width="150" />
      shinysprite = <img src={this.state.data.sprites.front_shiny} height="150" width="150" />
      spritefemale = <img src={this.state.data.sprites.front_female} height="150" width="150" />
      shinyspritefemale = <img src={this.state.data.sprites.front_shiny_female} height="150" width="150" />
      spriteButton = <button type="button" onClick={toggleSprite}>Make Shiny</button>
      spriteButton2 =  <button type="button" onClick={toggleSprite2}>Switch</button>
      forwardbutton = <button type="button" onClick={this.toggleForward}>next</button>
      backwardbutton = <button type="button" onClick={this.toggleBackward}>back</button>
    }

    return (
      <div className="center">
        <h1>Enter a number between 1 - 802</h1>
        <Search search={this.search} />
        {
          (!!!this.state.error) ? (
            <div>
              <p>name: {name}</p>
              <p>id: {id}</p>
              <p>height: {this.state.data.height} ft</p>
              <p>weight: {this.state.data.weight} lbs</p>
               <p id="sprite1"> {sprite} </p>
               <p id="sprite2" hidden="true"> {shinysprite}</p>
               <p id="sprite3" hidden="true">{spritefemale}</p>
               <p id="sprite4" hidden="true">{shinyspritefemale}</p>
               <p>{spriteButton}{spriteButton2}</p>
              <p>{backwardbutton} {forwardbutton} </p>
            </div>
          ) :
          (<p>{error}</p>)
        }
      </div>
    )
  }
}

export default App;
