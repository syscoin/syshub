import palette from './palette';

const primary = palette.primary;
const greyLight = palette.greyLight;
const grey = palette.grey;

export default {
  wraper: {
    display: 'flex',
    flexDirection: 'column',
    justifyAlign: 'flex-start',
    flex: '2 1 auto',
    padding: '24px',
    background: greyLight,
    minWidth: '100%',
    padding:'0px',
  }
  ,
  contentWraper: { 
    marginTop: '40px'
   }
};
