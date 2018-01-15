import palette from './palette';

const white = palette.white;
const primary = palette.primary;
const grey = palette.textLignt;

export default {
  root: {
    '& .chat_box_container': {
      padding: '10px',
      wraper: {
        position: 'absolute',
        bottom: '0px',
      },
      '& .paper-style': {
        textAlign: 'center',
        display: 'inline-block',
        position: 'relative',
        minWidth: '95%',
        '& .chatbox-Header': {
          backgroundColor: primary,
          height: '35px',
          paddingTop: '7px',
          textAlign: 'left',
          paddingLeft: '10px',
          '& .chatBox-headerIcon': {
            width: '25px',
            height: '20px',
          },
          '& .chatBox-headerText': {
            color: white,
            marginRight: '52px',
            marginLeft: '6px',
            fontSize: '13px',
          },
        },
        '& .list': {
          maxHeight: '80%',
          '& .chat-list': {
            height: 'calc(100vh - 230px)',
            overflowY: 'auto',
            '& .chatContent-listItemText': {
              padding: '10px',
              textAlign: 'left',
              marginLeft: '10px',
              display: 'block',
            },
            '& .chatContent-primaryText': {
              color: primary,
            },
            '& .chatContent-secondaryText': {
              color: grey,
              padding: '0px 0px 0px 5px',
            },
          },
        },
        '& .form': {
          border: 'thin solid ' + grey,
          backgroundColor: white,
          '&>div': {
            width: 'calc(100% - 60px)',
            // marginLeft: '20px',
          },
          '& ::before': {
            backgroundColor: 'transparent',
          },
          '& .send-button': {
            position: 'absolute',
            marginTop: '3px',
            cursor: 'pointer',
            color: '#a8aba5',
          },
        },
      },
    },
  },
};
