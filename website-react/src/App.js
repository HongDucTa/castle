import React, { Component } from 'react';
import './App.css';
import Card from './Card';
import hotelList from './hotelAndRestaurantOnly.json';


class App extends Component {
  constructor(props)
  {
    super(props);
    this.state =
    {
      hotel: this.getHotels(),
      timestamp: Date.now()
    };
  }

  getHotels()
  {
    switch (this.props.sortBy)
    {
      case 'price':
        hotelList.sort(function(a,b){return a.price-b.price;})
        break;
      case 'name':
        hotelList.sort(function(a,b){
          var x = a.name.toLowerCase();
          var y = b.name.toLowerCase();
          return x < y ? -1 : x > y ? 1 : 0;
        })
        break;
      case 'place':
        hotelList.sort(function(a,b){
          var x = a.place.toLowerCase();
          var y = b.place.toLowerCase();
          return x < y ? -1 : x > y ? 1 : 0;
        })
        break;
      default:
        break;
    }
    return hotelList;
  }

  render() {
    return (
      <div className="cardHolder">
        <p id="number-results">{this.state.hotel.length} résultat(s) {this.props.sortBy}</p>
        <table>
          {this.state.hotel.map((hotel) => <Card key = {this.state.timestamp} data = {hotel} />)}
        </table>
      </div>
    );
  }
}

export default App;