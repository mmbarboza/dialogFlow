import React from 'react';
import BotUI from 'botui';
require("@babel/polyfill");
import axios from 'axios';




export default class ChatBot extends React.Component{
  constructor(){
    super();
    this.state = {
      userMessage: '',
      conversation: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    event.preventDefault();
    this.setState({userMessage: event.target.value});
  }

  async handleSubmit(event){
    event.preventDefault();
    this.setState({
      conversation: [...this.state.conversation, this.state.userMessage]
    })
    const chatReply = await axios.post(`/runSample/${this.state.userMessage}`);
    console.log("user message", this.state.userMessage)
    console.log("robot response", chatReply)
    this.setState({
      conversation: [...this.state.conversation, chatReply.data],
      userMessage: ''
    })
  }

  render(){

    return (
      <div>
        <div>{this.state.conversation}</div>
        <form onSubmit={this.handleSubmit}>

          <input type="text" value = {this.state.userMessage} onChange={this.handleChange} placeholder="Type your message and hit enter" />
        </form>
      </div>
    );
  }
}

