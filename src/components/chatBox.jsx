import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import './style/Styles.css'

const style = {
  height: '80vh',
  width: '86%',
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  chatHeader:{
    backgroundColor:"#009fff",
    height:'35px',
    paddingTop:'5px'
  }
};

class ChatBox extends Component{
    constructor(props){
        super(props)
        this.state={
            chats:[
                {
                    user:"abc",
                    text:"khalid"
                },
                {
                    user:"abca",
                    text:"khalid"
                },
                {
                    user:"abc2",
                    text:"khalidwqeqw"
                },
                {
                    user:"abc",
                    text:"khalideqwe"
                },
                {
                    user:"abc",
                    text:"khalidqwe"
                },

            ]
        }
    }

render(){
const chat_icon = require('../assets/PNG/png_menu_chat.png')
    return(
        <div className="chat_box_container">
         <Paper style={style} zDepth={2}>
             <div className="chatHeader" style={style.chatHeader}>
             <span className="chat-icon" >
                    <img src={chat_icon} style={{width:'25px',height:'20px'}} />
                  </span>
             <span style={{color:'#FFFFFF',marginRight: '52px',marginLeft: '6px',fontSize: '13px'}}>CHATBOX</span>
      </div>     
      <List className="chat_list"> 
          {
              this.state.chats.map((data, index)=>(
                <ListItemText
                key={index}
                className="chat_content"
                style={{padding:'5px'}}
                primary={data.user}
                secondary={data.text}
                    />
              ))
          }  
              </List>  
        <form>
                <TextField
            id="full-width"
            InputLabelProps={{
                shrink: true,
            }}
            style={{border:'1px solid grey'}}
            placeholder="login to write message"
            margin="normal"
        />
      </form>
         </Paper>
        </div>
    )
}


}

export default ChatBox;