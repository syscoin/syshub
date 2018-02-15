import palette from './palette';

const white = palette.white;
const primary = palette.primary;
const primaryLight = palette.primaryLight
const grey = palette.textLignt;
const greyDark = palette.greyDark;

export default {
  root: {
    marginTop: 20,
    '& .chat_box_container': {
      wraper: {
        position: 'absolute',
        bottom: '0px',
      },
      '& .paper-style': {
        textAlign: 'center',
        display: 'inline-block',
        position: 'relative',
        width: '100%',
        '& .chatbox-Header': {
          backgroundColor: primaryLight,
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
            height: 'calc(100vh - 245px)',
            overflowY: 'auto',
            '& .chatContent-listItemText': {
              padding: '10px',
              textAlign: 'left',
              marginLeft: '10px',
              display: 'block',
            },
            '& .chatContent-primaryText': {
              display:'block',
              padding:'8px 0px',
              color: primary,
            },
            '& .chatContent-secondaryText': {
              display:'block',              
              color: greyDark,
              padding: '0px 0px 0px 5px',
              fontWeight: '100',
            },
          },
        },
        '& .form': {
          border: 'thin solid ' + grey,
          backgroundColor: white,
          '& TextArea': {
            height: '0px !important'
          },
          '&>div': {
            width: 'calc(100% - 60px)',
            // marginLeft: '20px',
          },
          '& ::before': {
            backgroundColor: 'transparent',
          },
          '& .send-button': {
            position: 'absolute',
            marginTop: '4px',
            cursor: 'pointer',
            color: '#a8aba5',
            right: 6
          },
        },
      },
    },
  },
  mRoot: {
    extend: 'root',
    height: '100%',
    marginTop: 0,
    ' & .chat_box_container': {
      height: '100%',
      '& .paper-style': {
        height: '100%',
        '& .chatbox-Header': {
          textAlign: 'center !important',
          height: '50px  !important',
          padding: 10,
          '& .chatBox-headerText': {
            fontSize: '22px !important',
            fontWeight: 'lighter',
            marginRight: '0px !important',
            marginLeft: '0px !important',
          },
          '&>span>img': {
            display: 'none'
          },
        },
        '& .list': {
          '& .chat-list': {
            height: 'calc(100vh - 230px) !important',
          }
        }
      }
    }

  },
};
