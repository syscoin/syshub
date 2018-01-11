import Palette from './palette'

const white = Palette.white;
const primary = Palette.primary;
const grey = Palette.textLignt;
const lightColor = Palette.textDark;

export default {
    chat_box_container:{
        height:'80vw'
    },
  footerWraper: {
    position:'absolute',
    bottom:"0px"


  },
  chatHeader:{
    backgroundColor:primary,
    height:'35px',
    paddingTop:'7px',
    textAlign:'left',
    paddingLeft:'10px'
  },
  chatIcon:{
    width:'25px',
    height:'20px'
  },
  chatHeaderText:{
    color:white,
    marginRight: '52px',
    marginLeft: '6px',
    fontSize: '13px'  
  },
  chatList:{
    height: '75.5vh',
    overflowY: 'auto',
  },
  chatContent:{
    padding:'10px',
    textAlign: 'left',
    marginLeft: '10px',
    display:'block'
  },
  primaryText:{
      color: primary
  },
  secondaryText:{
      color: grey
  }
};
