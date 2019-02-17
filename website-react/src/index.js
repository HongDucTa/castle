import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Header from './Header';
import SearchBar from './SearchBar';

ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<SearchBar />, document.getElementById('searchBar'));