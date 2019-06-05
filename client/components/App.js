import React from 'react';
import BotUI from 'botui';



export default class ChatBot extends React.Component{
  constructor(){
    super()
    this.state = {
      userMessage: '',
      conversation: [],
    };
  }

  handleChange(event){
    event.preventDefault();
    this.setState({userMessage: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    this.setState({
      conversation: [...this.state.conversation, this.state.userMessage]
    })
  }

  render(){

    return (
      <div>
        <form onSubmit={this.handleSubmit}>

          <input value = {this.state.userMessage} onChange={this.handleChange}/>
        </form>
      </div>
    );
  }
}

