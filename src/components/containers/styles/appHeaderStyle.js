import palette from './palette';

const primary = palette.primary;

export default {
  container: {},
  appbar:{
    backgroundColor: primary
  },
  header: {
    backgroundColor: primary,
  },
  wrapper: {
    // border: '1px solid red',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: '100%',
    padding: '0 20px 0 0',
  },
};
