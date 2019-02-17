import React, { Component } from 'react';
import './Card.css';

class Card extends Component
{
    render()
    {
        return(
        <div className="Card">
            <div className="image-container">
                <img class="card-img-top img-fluid" alt={this.props.data.name} src={this.props.data.imageHeaderLink}></img>
            </div>
            <div class="card-body">
                <h5 class="card-title">{this.props.data.name}</h5>
                <h6 class="card-subtitle">{this.props.data.place}</h6>
                <p class="card-text">à partir de {this.props.data.price} €</p>
                <a href={this.props.data.link} class="btn btn-primary" target="_blank" rel="noopener noreferrer">En savoir plus</a>
                <a href={this.props.data.michelinStarredRestaurantLink} class="btn btn-primary" target="_blank" rel="noopener noreferrer">Restaurants étoilés à proximité</a>
            </div>
        </div>
        )
    }
}

export default Card;