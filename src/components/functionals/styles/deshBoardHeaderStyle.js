import palette from './palette';
import { colors } from 'material-ui/styles';

const primaryDark = palette.primaryDark;
const primaryLight = palette.primaryLight;
const white = palette.white;


export default {
  root:{
     "& .headingView" : {
      backgroundColor: '#1991CC',
      height: "50px",
      marginLeft: "30px",
      marginTop: "20px",
      marginBottom: "30px",

      "& .headingRow" : {
        color: white,
        paddingLeft: "7px",
      },
      "& .headingDiv" : {
        display: "initial",
        color: white,
        marginLeft: "20px",
      },
      "& .activeText" : {
        fontSize: "26px",
        color: white,
      }



    }
  }
 };
