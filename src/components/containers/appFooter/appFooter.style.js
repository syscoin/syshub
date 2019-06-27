import palette from '../../../styles/palette';
import { ImportantDevices } from '@material-ui/icons';

const greyDark = palette.greyDark;
const white = palette.white;

export default {
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridTemplateRows: 'auto',
    justifyItems: 'center',
    alignItems: 'center',
    position: 'fixed',
    left: '0px',
    bottom: '0px',
    height: '60px',
    width: '100%',
    padding: '10px',
    backgroundColor: greyDark,
    fontWeight: 'semibold'
  },
  footerTxt: {
    color: white
  },
  footerVersion: {
    alignSelf: 'end',
    fontSize: '8px',
    color: white
  }
};
