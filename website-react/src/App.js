import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      /*
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      */
     /*
     <div className="Header">
      <h1>Find your next destination</h1>
      <div class="container-fluid">
        <h1>Test</h1>
      </div>
     </div>
     */
    <div>
      <div className="Header">
        <h1>Pick your next destination</h1>
      </div>
      <div class="CardHolder">
        <div className="Card">
          <img class="card-img-top img-fluid" src="https://img.webnots.com/2017/04/Bootstrap-Card-Image.png"></img>
          <div class="card-body">
            <h4 class="card-title">Card Title</h4>
            <p class="card-text">This is basic card with image on top, title, description and button.</p>
            <a href="#" class="btn btn-primary">Button</a>
          </div>
        </div>
        <div className="Card">
          <img class="card-img-top img-fluid" src="https://img.webnots.com/2017/04/Bootstrap-Card-Image.png"></img>
          <div class="card-body">
            <h4 class="card-title">Card Title</h4>
            <p class="card-text">This is basic card with image on top, title, description and button.</p>
            <a href="#" class="btn btn-primary">Button</a>
          </div>
        </div>
        <div className="Card">
          <img class="card-img-top img-fluid" src="https://img.webnots.com/2017/04/Bootstrap-Card-Image.png"></img>
          <div class="card-body">
            <h4 class="card-title">Card Title</h4>
            <p class="card-text">This is basic card with image on top, title, description and button.</p>
            <a href="#" class="btn btn-primary">Button</a>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
