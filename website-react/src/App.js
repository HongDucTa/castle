import React, { Component } from 'react';
import './App.css';
import Card from './Card';
import hotelList from './hotelAndRestaurantOnly.json';


class App extends Component {
  constructor()
  {
    super();
    this.state =
    {
      hotel:hotelList
    };
  }

  render() {
    return (
      <div className="cardHolder">
        <table>
          {this.state.hotel.map((hotel, i) => <Card key = {i} data = {hotel} />)}
        </table>
      </div>
    );
  }
}

export default App;