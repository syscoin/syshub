import Palette from './palette';

const primary = Palette.primary;

export default {
  wraper: {},
  header: {
    backgroundColor: primary,
  },
  container: {
    // border: '1px solid red',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: '100%',
    padding: '0 20px 0 0',
  },
};
