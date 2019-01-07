import palette from '../../../styles/palette';

const white = palette.white;

export default {
  root: {
    '& .headingView': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
      backgroundColor: '#1991CC',
      height: '70px',
      margin: '10px',
      fontSize: '20px',
      '& .headingRow': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: white,
        padding: '0 7px',
      },
      '& .titleWrapper': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 0 0 10px'
      },
      '& .headingDiv': {
        display: 'initial',
        fontSize: '1.4em',
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
        padding: '0 5px',
        fontSize: '26px',
        fontWeight: 'bold',
        color: white
      }
    },
    '& .TxtRegular': {
      padding: '0 5px',
      fontSize: '16px',
      color: white,
    },
    '& .headingRight': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      color: 'inherit',
    },
    '& .headingLeft': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
      color: white,
      padding: '5px',
    },
    '& .governanceDate': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'inherit',
    },
    '& .loading': {
      margin: '8px 20px 0 20px',
      '&>div>svg>circle': {
        stroke: `${white} !Important`
      }
    },
    '& .proposalDetailHeadingView': {
      backgroundColor: '#1991CC',
      height: '50px',
      margin: '10px 0 0 20px',
      fontSize: '20px',
      maxWidth: 'calc(100% - 20px)',
      /* '& .headingRow': {
        color: white,
        paddingLeft: '7px'
      }, */
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
      height: '80px',
      margin: 0,
      fontSize: '20px',
      width: '100%',
      maxWidth: '100%',
      '& .headingRow': {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        color: white,
        padding: '10px 7px 0 7px',
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
    '& .governanceDate': {
      padding: '5px 0',
    },


  },
};