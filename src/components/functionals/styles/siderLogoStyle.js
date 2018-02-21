export default {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '0px 45px 25px 45px',
    marginBottom: 50,
    '& .txtArea': {
      //border: '1px solid red',
      padding: '40px 0px 0px 10%',
      fontWeight: '100',
      fontSize: '0.9em',
      textAlign: 'right'
    },
    '& .txtBig': {
      fontSize: '1.2em'
    }
  },
  mRoot: { extend: 'root' }
};
