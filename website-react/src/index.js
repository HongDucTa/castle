import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './Header';
import SearchBar from './SearchBar';
import Chatbot from './Chatbot';
import hotelList from './hotelAndRestaurantOnly.json';

/*
const castle = require('./castle.js');

var promise = new Promise(function()
{
    castle();
});
promise.then(function()
{
    ReactDOM.render(<Header />, document.getElementById('header'));
    ReactDOM.render(<SearchBar />, document.getElementById('searchBar'));
});
*/
ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<SearchBar hotelList={hotelList}/>, document.getElementById('searchBar'));
//ReactDOM.render(<Chatbot />, document.getElementById('chat'));

