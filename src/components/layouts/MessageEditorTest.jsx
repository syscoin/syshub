import React, { Component } from 'react';

class MessageEditorTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    };

    this.updateMessage = this.updateMessage.bind(this);
    this.addMessage = this.addMessage.bind(this);
  }

  updateMessage(event) {
    event.preventDefault;

    this.setState({
      message: event.target.value
    });
  }

  addMessage() {
    this.setState({ message: '' });
    this.props.addMessage(this.state.message);
  }

  render() {
    return (
      <div>
        <textarea onChange={e => this.updateMessage(e)} value={this.state.message} />
        <button onClick={this.addMessage}>Chat</button>
      </div>
    );
  }
}

export default MessageEditorTest;
