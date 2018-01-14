import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
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
};

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      chats: [
        {
          user: 'abc',
          text: 'khalidadsssss sdsd sddsds sdsds sdsd xsddxd',
        },
        {
          user: 'abca',
          text: 'khalid',
        },
        {
          user: 'abc2',
          text: 'khalidwqeqw',
        },
        {
          user: 'abc',
          text: 'khalideqwe',
        },
        {
          user: 'abc',
          text: 'khalidqwe',
        },
        {
          user: 'abc',
          text: 'khalidadsss sdsds sdsd sdsd xdfsdsdsds sdsd',
        },
        {
          user: 'abca',
          text: 'khalid',
        },
        {
          user: 'abc2',
          text: 'khalidwqeqw',
        },
        {
          user: 'abc',
          text: 'khalideqwe',
        },
        {
          user: 'abc',
          text: 'khalidqwe',
        },
        {
          user: 'abc',
          text: 'khalidadssss sdsd sdsd sdsds asdsdsdsd sdsdsd sdsds sdsd',
        },
        {
          user: 'abca',
          text: 'khalid',
        },
        {
          user: 'abc2',
          text: 'khalidwqeqw',
        },
        {
          user: 'abc',
          text: 'khalideqwe',
        },
        {
          user: 'abc',
          text: 'khalidqwe',
        },
      ],
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    let _tempArra = this.state.chats;
    _tempArra.push({
      user: 'qweer',
      text: this.state.message,
    });
    this.setState(
      {
        chats: _tempArra,
        message: '',
      },
      () => {
        let chatContentContainer = document.getElementById(
          'chat-messages-container'
        );
        chatContentContainer.scrollTop = chatContentContainer.scrollHeight;
      }
    );
  }

  render() {
    const chat_icon = require('../../assets/img/png_menu_chat.png'),
      { classes } = this.props;

    return (
      <div style={chatBoxStyle.chat_box_container}>
        <Paper style={style} zDepth={2}>
          <div style={chatBoxStyle.chatHeader}>
            <span>
              <img src={chat_icon} style={chatBoxStyle.chatIcon} />
            </span>
            <span style={chatBoxStyle.chatHeaderText}>CHATBOX</span>
          </div>
          <List>
            <div id="chat-messages-container" style={chatBoxStyle.chatList}>
              {this.state.chats.map((data, index) => (
                <ListItemText
                  key={index}
                  style={chatBoxStyle.chatContent}
                  primary={
                    <Typography style={chatBoxStyle.primaryText}>
                      {' '}
                      {data.user}{' '}
                    </Typography>
                  }
                  secondary={
                    <Typography style={chatBoxStyle.secondaryText}>
                      {' '}
                      {data.text}{' '}
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
              multiLine=" true"
              placeholder="login to write message"
            />
          </form>
        </Paper>
      </div>
    );
  }
}

export default withStyles(chatBoxStyle)(ChatBox);
