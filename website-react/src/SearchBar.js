import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './SearchBar.css';
import App from './App.js';
import Chatbot from './Chatbot';

//import hotelList from './hotelAndRestaurantOnly.json';

class SearchBar extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            name: '',
            place: '',
            sortBy: ''
        };

        this.handleChangeSort = this.handleChangeSort.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePlace = this.handleChangePlace.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        ReactDOM.render(<App hotels={this.getHotels()}/>, document.getElementById('main'));
    }

    componentDidMount() {
        ReactDOM.render(
            <Chatbot hotels={this.getHotels()}></Chatbot>,
            document.getElementById('chatbot')
        );

}

    getHotels()
    {
        var cleanHotelsName = [];
        if (this.state.name !== '')
        {
            for (var i=0;i < this.props.hotelList.length;i++)
            {
                if (this.props.hotelList[i].name.toUpperCase().includes(this.state.name.toUpperCase()))
                {
                    cleanHotelsName.push(this.props.hotelList[i]);
                }
            }
        }
        else
        {
            cleanHotelsName = this.props.hotelList;
        }
        var cleanHotelsPlace = [];
        if (this.state.place !== '')
        {
            for (var j=0;j < cleanHotelsName.length;j++)
            {
                if (cleanHotelsName[j].place.toUpperCase().includes(this.state.place.toUpperCase()))
                {
                    cleanHotelsPlace.push(cleanHotelsName[j]);
                }
            }
        }
        else
        {
            cleanHotelsPlace = cleanHotelsName;
        }

        switch (this.state.sortBy)
        {
            case 'price':
            cleanHotelsPlace.sort(function(a,b){return a.price-b.price;})
            break;
            case 'name':
            cleanHotelsPlace.sort(function(a,b){
                var x = a.name.toLowerCase();
                var y = b.name.toLowerCase();
                return x < y ? -1 : x > y ? 1 : 0;
            })
            break;
            case 'place':
            cleanHotelsPlace.sort(function(a,b){
                var x = a.place.toLowerCase();
                var y = b.place.toLowerCase();
                return x < y ? -1 : x > y ? 1 : 0;
            })
            break;
            default:
            break;
        }

      return cleanHotelsPlace;
    }

    handleChangeSort(event)
    {
        this.setState({sortBy: event.target.value}, () => { ReactDOM.render(<App hotels={this.getHotels()}/>, document.getElementById('main'));});
    }

    handleChangePlace(event)
    {
        this.setState({place: event.target.value}, () => { ReactDOM.render(<App hotels={this.getHotels()}/>, document.getElementById('main'));});
    }

    handleChangeName(event)
    {
        this.setState({name: event.target.value}, () => { ReactDOM.render(<App hotels={this.getHotels()}/>, document.getElementById('main'));});
    }

    handleSubmit(event)
    {
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
                </form>
                <div id="chatbot">
                </div>
            </div>
        )
    }
}

export default SearchBar;