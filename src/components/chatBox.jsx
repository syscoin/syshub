import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
const style = {
  height: '80vh',
  width: '86%',
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  chatHeader:{
    backgroundColor:"#009fff",
    height:'35px',
    padding:'5px'
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
    return(
        <div>
         <Paper style={style} zDepth={2}>
             <div className="chatHeader" style={style.chatHeader}>
             {/* <Icon class="material-icons">chat_bubble_outline</Icon> */}
             <span>CHATBOX</span>
      </div>     
      <List> 
          {
              this.state.chats.map((data, index)=>(
                <ListItemText
                    style={{padding:'5px'}}
                      primary={data.user}
                      secondary={data.text}
                    />
              ))
          }  
              </List>  
         </Paper>
        </div>
    )
}


}

export default ChatBox;