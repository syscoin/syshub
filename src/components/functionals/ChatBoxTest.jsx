import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';

import { fire, messages } from '../../firebase';
import { MessageTest, MessageEditorTest } from '../layouts';

class ChatBoxTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };

    this.addMessage = this.addMessage.bind(this);
  }

  componentWillMount() {
    messages.limitToLast(5).on('value', snap => {
      const updated = [];
      snap.forEach(message => {
        updated.push(message.val());
      });

      this.setState({
        messages: updated,
      });
    });
  }

  addMessage(message) {
    const { currentUser } = this.props.app;

    if (!currentUser) {
      swal({
        title: 'Oops...',
        text: 'Must be signed in to chat',
        icon: 'warning',
      });
      return;
    }

    const updated = {
      body: message,
      user: {
        displayName: currentUser.displayName,
        id: currentUser.uid,
        email: currentUser.email,
      },
    };

    messages.push(updated);
  }

  render() {
    return (
      <div>
        <h2>Chatbox</h2>
        <div>
          {this.state.messages.map((message, i) => {
            return <MessageTest key={i} message={message} />;
          })}
          <MessageEditorTest addMessage={this.addMessage} />
        </div>
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    app: state.app,
  };
};

export default connect(stateToProps)(ChatBoxTest);
