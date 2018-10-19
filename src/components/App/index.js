import React from 'react';
import { hot } from 'react-hot-loader';
import axios from 'axios';
import io from 'socket.io-client';

import './app.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io('http://localhost:3000'),
      input: '',
      messages: [],
    };
    this.inputChange = this.inputChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.state.socket.on('connect', () => console.log('ok socket'));
    this.state.socket.on('new-message', data => {
      this.updateMessages([...this.state.messages, data]);
    });
    axios.get('http://localhost:3000/messages')
      .then(result => {
        this.updateMessages(result.data.messages);
      })
      .catch(err => console.log(err));
  }

  updateMessages(messages) {
    this.setState({
      messages,
    });
  }

  getMessages() {
    return this.state.messages.map(message => <div key={message._id}>{message.text}</div>);
  }

  inputChange(e) {
    this.setState({
      input: e.target.value,
    });
  }

  sendMessage(e) {
    e.preventDefault();
    this.state.socket.emit('send', { message: this.state.input }, (result) => {
      this.setState({
        messages: [...this.state.messages, result],
        input: '',
      })
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="header">
          header
        </div>
        <div className="messages">
          {this.getMessages()}
        </div>
        <form
          className="message-input"
          onSubmit={this.sendMessage}
        >
          <input
            className="message-input-input"
            type="text"
            value={this.state.input}
            onChange={this.inputChange}
          />
          <button type="submit">envoyer</button>
        </form>
      </React.Fragment>
    );
  }
}

export default hot(module)(App);
