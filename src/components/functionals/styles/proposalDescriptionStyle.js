import palette from './palette';
import { colors } from 'material-ui/styles';

const primaryDark = palette.primaryDark;
const primaryLight = palette.primaryLight;
const white = palette.white;
const gray = palette.grey;
const greyDark = palette.greyDark;

export default {
  proposalDescriptionRoot: {
    marginTop: 40,
    '& .approvalStatus': {
      '& .heading': {
        fontSize: 20,
        color: greyDark
      },
    },
    '& .no-margin': {
      margin: 0,
      '& .heading': {
        fontSize: 20,
        color: greyDark,

      },
    },


    "& .proposalView": {
      margin: 0,
      marginTop: 15,
      "& .proposalDetails": {
        marginLeft: "4%",
        padding: 0,
        color: gray,
        maxWidth: "89.6667%",
        fontSize: 15
      },

    },

    "& .commentSectionslView": {
      margin: 0,
      marginLeft: "4%",
      marginTop: 40,
      borderRadius: 5,
      background: "rgb(240, 242, 245)",
      height: "30%",
      "& .commentHeading": {
        color: greyDark,
        padding:"10px 28px",
        fontWeight: 500,
      },
      "& .proposalDetails": {
        marginLeft: 8,
        padding: 0,
        color: gray,
        maxWidth: "89.6667%",
        fontSize: 15,
        background: white,
        maxWidth: "100%",
        padding: "10px 20px",
        height: "70%",

      },

    },


  }
};
