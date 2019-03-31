import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './Header';
import SearchBar from './SearchBar';
import hotelList from './hotelAndRestaurantOnly.json';


ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<SearchBar hotelList={hotelList}/>, document.getElementById('searchBar'));

