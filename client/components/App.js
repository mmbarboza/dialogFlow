import React from 'react';
require('@babel/polyfill');
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
    //add user's message to the conversation
    this.setState({
      conversation: [...this.state.conversation, {
        text: this.state.userMessage,
        user: 'human'
      }]
    });
    const chatReply = await axios.post(`/runSample/${this.state.userMessage}`);
    console.log('user message', this.state.userMessage);
    console.log('robot response', chatReply);
    //add the chatbot's response to the conversation
    this.setState({
      conversation: [...this.state.conversation, {
        text: chatReply.data,
        user: 'ai'
      }],
      userMessage: ''
    });
  }

  render(){
  const ChatBubble = (text, i, className) => {
    return (
      <div key={`${className}-${i}`} className={`${className} chat-bubble`}>
        <span className="chat-content">{text}</span>
      </div>
    );
  };

  const chat = this.state.conversation.map((message, index) =>
    ChatBubble(message.text, index, message.user)
  );

    return (
    <div>
      <h1>SmallTalk Chatbot</h1>
      <div className="chat-window">
       <div className="conversation-view">{chat}</div>
        <div className="message-box">
          <form onSubmit={this.handleSubmit}>
             <input
              value={this.state.userMessage}
              onChange={this.handleChange}
              className="text-input"
              type="text"
              autoFocus
              placeholder="Type your message and hit enter"
            />
          </form>
        </div>
      </div>
    </div>
    );
  }
}

