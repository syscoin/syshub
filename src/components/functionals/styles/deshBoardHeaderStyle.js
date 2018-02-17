import palette from './palette';

const white = palette.white;

export default {
  root: {
    // margin: 0,
    '& .headingView': {
      backgroundColor: '#1991CC',
      height: '50px',
      marginTop: '10px',
      marginLeft: '10px',
      // marginBottom: "20px",
      fontSize: '20px',
      '& .headingRow': {
        color: white,
        paddingLeft: '7px'
      },
      '& .headingDiv': {
        display: 'initial',
        color: white,
        marginLeft: '20px'
      },
      '& .ownerDetails': {
        float: 'right',
        color: white,
        fontWeight: 'bold',
        '& .ownerName': {
          fontWeight: 'normal',
          display: 'inline',
          marginLeft: '10px',
          color: white
        }
      },
      '& .activeText': {
        fontSize: '26px',
        color: white
      }
    },
    '& .proposalDetailHeadingView': {
      backgroundColor: '#1991CC',
      height: '50px',
      margin: '10px 0 0 20px',
      fontSize: '20px',
      maxWidth: 'calc(100% - 20px)',
      '& .headingRow': {
        color: white,
        paddingLeft: '7px'
      },
      '& .headingDiv': {
        display: 'initial',
        color: white,
        marginLeft: '20px'
      },
      '& .ownerDetails': {
        float: 'right',
        color: white,
        fontWeight: 'bold',
        '& .ownerName': {
          fontWeight: 'normal',
          display: 'inline',
          marginLeft: '10px',
          color: white
        }
      },
      '& .activeText': {
        fontSize: '26px',
        color: white
      }
    },
    '& .no-margin': {
      margin: 0
    }
  },
  mRoot: {
    extend: 'root',
    margin: 'auto',
    '& .headingView': {
      backgroundColor: '#1991CC',
      height: '50px',
      marginLeft: 0,
      marginTop: 0,
      fontSize: '20px',
      width: '100%',
      maxWidth: '100%',
      '& .headingRow': {
        color: white,
        paddingLeft: '7px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
      '& .headingDiv': {
        display: 'initial',
        color: white,
        marginLeft: 0,
        fontSize: 17,
      },
      '& .ownerDetails': {
        float: 'right',
        color: white,
        fontWeight: 'bold',
        '& .ownerName': {
          fontWeight: 'normal',
          display: 'inline',
          marginLeft: '10px',
          color: white,
        },
      },
      '& .activeText': {
        fontSize: '26px',
        color: white,
      },
    },


  },
};
