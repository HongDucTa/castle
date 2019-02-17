import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './SearchBar.css';
import App from './App.js';

import hotelList from './hotelAndRestaurantOnly.json';

class SearchBar extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            name: 'default',
            place: 'default',
            sortBy: 'default'
        };

        this.handleChangeSort = this.handleChangeSort.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePlace = this.handleChangePlace.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        ReactDOM.render(<App name={this.state.name} place={this.state.place} sortBy={this.state.sortBy} hotels={this.getHotels()}/>, document.getElementById('main'));
    }

    getHotels()
    {
      switch (this.state.sortBy)
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

    handleChangeSort(event)
    {
        this.setState({sortBy: event.target.value});
    }

    handleChangePlace(event)
    {
        this.setState({place: event.target.value});
    }

    handleChangeName(event)
    {
        this.setState({name: event.target.value});
    }

    handleSubmit(event)
    {
        ReactDOM.render(<App name={this.state.name} place={this.state.place} sortBy={this.state.sortBy} hotels={this.getHotels()}/>, document.getElementById('main'));
        event.preventDefault();
    }

    render()
    {
        return(
            <div className="search-box">
                <form className="form" onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" placeholder="Nom" onChange={this.handleChangeName}></input>
                        <input type="text" placeholder="Ville / Région" onChange={this.handleChangePlace}></input>
                    </label>
                    <br/>
                    <select value={this.state.sortBy} onChange={this.handleChangeSort}>
                        <option value="default">Trier par</option>
                        <option value="name">Nom</option>
                        <option value="place">Région</option>
                        <option value="price">Prix</option>
                    </select>
                    <input type="submit" value="Recherche"/>
                </form>
            </div>
        )
    }
}

export default SearchBar;