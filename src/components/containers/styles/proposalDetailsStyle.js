import palette from './palette';

const grey = palette.grey;

export default {
  root: {
    background: 'white',
    paddingTop: '10px',
    overflowY: 'auto',
    height: '80vh',
    boxShadow: '0px 3px 3px 3px ' + grey,
    overflowX: 'hidden',
    '& .div': {
      margin: 0
    }
  },
  proposalDetailsRoot: {
    margin: 0,
    marginLeft: 15,
    paddingTop: 70,
    paddingLeft: '0.4%',
    maxWidth: '98%',
  },
  proposalDetailsMRoot: {
    extend: 'proposalDetailsRoot',
    maxWidth: '100%',
    padding: '25px 10px',
    margin: 'auto',
    width: '100%',
  },
  proposalTitle: {
    fontWeight: 'normal',
    color: '#1991CC',
    padding: '15px 0px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',

  }
};
