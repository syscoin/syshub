import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import swal from 'sweetalert';

import { fire, messages } from '../../firebase';

import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import { chatBoxStyle } from './styles';
import { withStyles } from 'material-ui/styles';

const style = {
  textAlign: 'center',
  display: 'inline-block',
  position: 'relative',
  minWidth: '95%',
};

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],

      message: '',
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
        messages: updated,
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
      icon: 'warning',
    });
  }

  addMessage(message) {
    const { currentUser } = this.props.app;

    if (!currentUser) {
      this.loginAlert();
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

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
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
    const chat_icon = require('../../assets/img/png_menu_chat.png'),
      { classes } = this.props;
    return (
      <div className={classes.chat_box_container}>
        <Paper style={style} zDepth={2}>
          <div className={classes.chatHeader}>
            <span>
              <img src={chat_icon} style={chatBoxStyle.chatIcon} />
            </span>
            <span style={chatBoxStyle.chatHeaderText}>CHATBOX</span>
          </div>
          <List style={{ maxHeight: '80%' }}>
            <div
              ref={el => {
                this.messagesContainer = el;
              }}
              id="chat-messages-container"
              style={chatBoxStyle.chatList}
            >
              {this.state.messages.map((message, index) => (
                <ListItemText
                  key={index}
                  style={chatBoxStyle.chatContent}
                  primary={
                    <Typography style={chatBoxStyle.primaryText}>
                      {message.user.displayName}
                    </Typography>
                  }
                  secondary={
                    <Typography style={chatBoxStyle.secondaryText}>
                      {message.body}
                    </Typography>
                  }
                />
              ))}
            </div>
          </List>
          <form className={classes.textBox} onSubmit={this.onSubmit}>
            <TextField
              value={this.state.message}
              name="message"
              onChange={this.onChange}
              onClick={() => {
                return !currentUser ? this.loginAlert() : null;
              }}
              multiLine=" true"
              placeholder={
                currentUser ? 'Tell something' : 'login to write message'
              }
            />
          </form>
        </Paper>
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    app: state.app,
  };
};

export default connect(stateToProps)(withStyles(chatBoxStyle)(ChatBox));
