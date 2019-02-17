import React, { Component } from 'react';
import './App.css';
import Card from './Card';

class App extends Component {
  constructor(props)
  {
    super(props);
    this.state =
    {
      hotel: this.props.hotels
    };
  }

  renderHotels()
  {
    return (
      <table>
        {this.props.hotels.map((hotel,i) => <Card key = {i} data = {hotel} />)}
      </table>
    )
  }

  render() {
    return (
      <div className="cardHolder">
        <p id="number-results">{this.state.hotel.length} résultat(s)</p>
        {this.renderHotels()}
      </div>
    );
  }
}

export default App;