import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            dropDownDefaultValue: 'Trier par'
        };
    }

    render()
    {
        return(
            <div className="search-box">
                <form className="form">
                    <label>
                        <input type="text" placeholder="Nom"></input>
                        <input type="text" placeholder="Ville / Région"></input>
                    </label>
                    <br/>
                    <select>
                        <option value="default">Trier par</option>
                        <option value="name">Nom</option>
                        <option value="price">Prix</option>
                    </select>
                    <input type="submit" value="Recherche"/>
                </form>
            </div>
        )
    }
}

export default SearchBar;