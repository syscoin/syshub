import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { Input } from 'antd';
import swal from 'sweetalert';
import { Send } from 'material-ui-icons';
import { Form } from 'antd';

import { messages, fire } from '../../API/firebase';

import List, { ListItemText } from 'material-ui/List';
import { chatBoxStyle } from './styles';
import { withStyles } from 'material-ui';


class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],

      message: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentWillMount() {
    messages.limitToLast(100).on('value', snap => {
      const updated = [];
      snap.forEach(message => {
        updated.push(message.val());
      });
      this.setState({
        messages: updated
      });
    });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  loginAlert() {
    swal({
      title: 'Oops...',
      text: 'Must be signed in to chat',
      icon: 'warning'
    });
  }
  blankMessageAlert() {
    swal({
      title: 'Oops...',
      text: 'Must write something to chat',
      icon: 'warning'
    });
  }

  addMessage(message) {
    const { currentUser } = this.props.app;
    const newKey = fire
      .database()
      .ref()
      .push().key;

    if (!currentUser) {
      this.loginAlert();
      return;
    } else if (message === null || message === '') {
      this.blankMessageAlert();
    } else {
      const updated = {
        body: message,
        key: newKey,
        user: {
          displayName: currentUser.displayName,
          id: currentUser.uid,
          email: currentUser.email
        }
      };

      messages.child(newKey).set(updated);
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const message = this.state.message;
    this.addMessage(message);
    this.setState({ message: '' });
  }

  render() {
    const { currentUser } = this.props.app;
    const { TextArea } = Input;
    const { classes, deviceType } = this.props;
    const chat_icon = require('../../assets/img/png_menu_chat.png');
    const FormItem = Form.Item;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;
    return (
      <div className={style}>
        {/* chat box container */}
        <div className="chat_box_container">
          <Paper className="paper-style">
            <div className="chatbox-Header">
              <span>
                <img alt="a" src={chat_icon} className="chatBox-headerIcon" />
              </span>
              <span className="chatBox-headerText">CHATBOX</span>
            </div>
            {/* chat list */}
            <List className="list">
              <div
                ref={el => {
                  this.messagesContainer = el;
                }}
                id="chat-messages-container"
                className="chat-list"
              >
                {this.state.messages.map((message, index) => (
                  <ListItemText
                    key={index}
                    className="chatContent-listItemText"
                    primary={
                      <span className="chatContent-primaryText">{message.user.displayName}</span>
                    }
                    secondary={<span className="chatContent-secondaryText">{message.body}</span>}
                  />
                ))}
              </div>
            </List>

            {/* input field for chat */}
            <Form className="form" onSubmit={this.onSubmit}>
              <FormItem>
                <TextArea
                  value={this.state.message}
                  name="message"
                  onChange={this.onChange}
                  onClick={() => {
                    return !currentUser ? this.loginAlert() : null;
                  }}
                  onPressEnter={this.onSubmit}
                  placeholder={currentUser ? 'Tell something' : 'login to send message'}
                />
              </FormItem>
              <Send className="send-button" onClick={this.onSubmit} />
            </Form>
          </Paper>
        </div>
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    app: state.app
  };
};

export default connect(stateToProps)(withStyles(chatBoxStyle)(ChatBox));
