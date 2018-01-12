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
import { chatBox } from './styles';

const style = {
  height: '80vh',
  width: '86%',
  margin: 20,
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
    console.log(this.state.message, 'asdasdas');
  }
  onSubmit(e) {
    e.preventDefault();
    let _tempArra = this.state.chats;
    _tempArra.push({
      user: 'qweer',
      text: this.state.message,
    });
    this.setState({
      chats: _tempArra,
      message: '',
    });
  }

  render() {
    const chat_icon = require('../../assets/img/png_menu_chat.png');
    return (
      <div style={chatBox.chat_box_container}>
        <Paper style={style} zDepth={2}>
          <div style={chatBox.chatHeader}>
            <span>
              <img src={chat_icon} style={chatBox.chatIcon} />
            </span>
            <span style={chatBox.chatHeaderText}>CHATBOX</span>
          </div>
          <List>
            <div style={chatBox.chatList}>
              {this.state.chats.map((data, index) => (
                <ListItemText
                  key={index}
                  style={chatBox.chatContent}
                  primary={
                    <Typography style={chatBox.primaryText}>
                      {' '}
                      {data.user}{' '}
                    </Typography>
                  }
                  secondary={
                    <Typography style={chatBox.secondaryText}>
                      {' '}
                      {data.text}{' '}
                    </Typography>
                  }
                />
              ))}
            </div>
          </List>
          <form style={chatBox} onSubmit={this.onSubmit}>
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

export default ChatBox;
