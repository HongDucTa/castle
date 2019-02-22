import React, { Component } from 'react';
import './Chatbot.css';

class Chatbot extends Component
{
    displayChatbot()
    {
        if (document.getElementById("btn-display").textContent === "X")
        {
            document.getElementById("Chat-overlay").style.height = '15%';
            document.getElementById("Chat-overlay").style.opacity = '0.8';
            document.getElementById("btn-display").textContent = "/\\";
        }
        else
        {
            document.getElementById("Chat-overlay").style.height = '40%';
            document.getElementById("Chat-overlay").style.opacity = '1.0';
            document.getElementById("btn-display").textContent = 'X';
        }
    }

    render()
    {
        return(
            <div id="Chat-overlay">
                <button id="btn-display" onClick={this.displayChatbot}>X</button>
                <input type="text" style={{width: '100%'}}></input>
                <div id="Conversation">
                    <p>Bonjour ! Comment puis-je vous aider ?</p>
                </div>
            </div>
        )
    }
}

export default Chatbot;