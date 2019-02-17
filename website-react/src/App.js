import React, { Component } from 'react';
import './App.css';
import Card from './Card';

class App extends Component {
  constructor(props)
  {
    super(props);
  }

  renderHotels()
  {
    return (
      <table style={{width: '100%'}}>
        {this.props.hotels.map((hotel,i) => <Card key = {i} data = {hotel} />)}
      </table>
    )
  }

  render() {
    return (
      <div className="cardHolder">
        <p id="number-results">{this.props.hotels.length} résultat(s)</p>
        {this.renderHotels()}
      </div>
    );
  }
}

export default App;