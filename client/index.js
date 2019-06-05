import React from 'react';
import ReactDOM from 'react-dom';
import ChatBot from './components/App';

console.log("in index.js")
ReactDOM.render(

  // <div>Hello, world!</div>,
<ChatBot />,
  document.getElementById('app') // make sure this is the same as the id of the div in your index.html
);
