import React, { Component } from 'react';
import './Chatbot.css';
import ReactDOM from 'react-dom';
import App from './App.js';

class Chatbot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotels: this.props.hotels,
            lastRequest: [],
            indexRequest: 0
        }
        this.handleRequest = this.handleRequest.bind(this);
        this.IsEnterKeyPressed = this.IsEnterKeyPressed.bind(this);
    }

    handleRequest() {
        const matcher = require('./matcher/index');
        var request = document.getElementById("input-chatbot").value;
        this.state.lastRequest.push(request);
        this.setState({ indexRequest: this.state.lastRequest.length });
        var response = "Chatbot > ";
        document.getElementById("input-chatbot").value = null;
        document.getElementById("input-chatbot-confirm").value = "Utilisateur > " + request;

        matcher(request, cb => {
            switch (cb.intent) {
                case "Bonjour":
                    response += "Bonjour !";
                    break;
                case "Sortie":
                    response += "Au revoir !";
                    break;
                case "Etat":
                    response += "Bien merci !";
                    break;
                case "Tri":
                    response += "Voici les résultats triés par " + cb.entities.Critere;
                    var critere = cb.entities.Critere.toLowerCase()
                    switch (critere) {
                        case "prix":
                            this.state.hotels.sort(function (a, b) { return a.price - b.price; });
                            break;
                        case ("region" || "région"):
                            this.state.hotels.sort(function (a, b) {
                                var x = a.place.toLowerCase();
                                var y = b.place.toLowerCase();
                                return x < y ? -1 : x > y ? 1 : 0;
                            })
                            break;
                        case "nom":
                            this.state.hotels.sort(function (a, b) {
                                var x = a.name.toLowerCase();
                                var y = b.name.toLowerCase();
                                return x < y ? -1 : x > y ? 1 : 0;
                            })
                            break;
                        default:
                            response = "Chatbot > Je suis désolé. Je n'ai pas pu identifié le critère de tri de votre recherche.";
                    }

                    break;
                case "PlusMoinsPrix":
                    response += "Voici les destinations qui coûtent " + cb.entities.PlusMinus + " de " + cb.entities.Prix + " €.";
                    switch (cb.entities.PlusMinus.toLowerCase()) {
                        case "moins":
                            var temp = this.state.hotels.filter(function (a) {
                                var x = a.price;
                                return x <= Number(cb.entities.Prix);
                            })
                            this.state.hotels = temp;
                            console.log(this.state.hotels);
                            break;
                        default:;
                    }
                    break;

                case "Réinitialisation":
                    response += "Très bien. J'ai réinitialisé tous les filtres de la recherche.";
                    this.state.hotels = this.props.hotels;
                    break;

                case "DestinationRegion":
                    response += "Voici les destinations se trouvant dans la région " + cb.entities.Region;
                    var temp = this.state.hotels.filter(function(a){
                        var x = a.place.toLowerCase();
                        return (x === cb.entities.Region.toLowerCase());
                    })
                    this.state.hotels = temp;
                    break;

                default:
                    response += "Je suis désolé. Je n'ai pas compris ce que vous venez de dire.";
            }
        })

        document.getElementById("output-chatbot").value = response;
        ReactDOM.render(<App hotels={this.state.hotels} />, document.getElementById('main'));
    }

    IsEnterKeyPressed(event) {
        switch (event.key) {
            case "Enter":
                this.handleRequest();
                break;
            case "ArrowUp":
                if (this.state.indexRequest > 0) {
                    document.getElementById("input-chatbot").value = this.state.lastRequest[this.state.indexRequest - 1];
                    this.setState({ indexRequest: this.state.indexRequest - 1 });
                }
                break;
            case "ArrowDown":
                if (this.state.indexRequest < this.state.lastRequest.length - 1) {
                    document.getElementById("input-chatbot").value = this.state.lastRequest[this.state.indexRequest + 1];
                    this.setState({ indexRequest: this.state.indexRequest + 1 });
                }
                break;
            default:
        }
    }

    componentDidMount() {
        document.getElementById("input-chatbot-confirm").value = "Utilisateur > ";
        document.getElementById("output-chatbot").value = "Chatbot > ";
    }

    render() {
        return (
            <div id="root-chatbot">
                <h3>Chatbot</h3>
                <div id="displayArea">
                    <div class="row">
                        <div class="col">
                            <input type="text" id="input-chatbot-confirm" disabled style={{ backgroundColor: "ghostWhite" }}></input>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col">
                            <input type="text" id="output-chatbot" disabled style={{ backgroundColor: "white" }}></input>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <input type="text" id="input-chatbot" placeholder="Entrez votre requête" onKeyDown={this.IsEnterKeyPressed}></input>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <button onClick={this.handleRequest}>Envoyer</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Chatbot;