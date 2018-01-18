import palette from './palette';
import { colors } from 'material-ui/styles';

const primaryDark = palette.primaryDark;
const primaryLight = palette.primaryLight;
const white = palette.white;
const gray = palette.grey;
const greyDark = palette.greyDark;

export default {
  proposalCommentRoot: {
    '& .commentHeadingDiv': {
     margin:0,
    },
    '& .no-margin': {
      margin: 0,
      '& .heading': {
        fontSize: 20,
        color: greyDark
      },
    },
    "& .commentSectionslView": {
      margin: 0,
      marginLeft: "4%",
      marginTop: 40,
      borderRadius: 5,
      background: "rgb(240, 242, 245)",
      // height: "30%",
      height: 175,
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
        // height: "70%",
        height: 135,
        "& .proposalDetailsHr": {
          marginTop:30,
        },
        "& .formSubmiButton": {
          margin: "0 10px",
          borderRadius: "10px",
          backgroundColor: primaryLight,
          color:white,
          float:'right',
        },

      },


    },
    "& .proposalHr": {
      marginTop:30,
      marginLeft:"6%",
    },

    "& .topCommentWithReplyView": {
      margin: 0,
      marginLeft: "4%",
      marginTop: 40,
      borderRadius: 5,
      border:"1px solid" + gray,
      height: 175,

      "& .commentHeading": {
        color: greyDark,
        padding:"10px 28px",
        fontWeight: 500,
      },
      "& .userView": {
        padding:0,
        marginTop:10,
      },
      "& .votesView": {
        marginTop:10,
        padding:0,
        textAlign:'right',

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
        // height: "70%",
        height: 135,
        "& .proposalDetailsHr": {
          marginTop:30,
        },
        "& .formSubmiButton": {
          margin: "0 10px",
          borderRadius: "10px",
          backgroundColor: primaryLight,
          color:white,
          float:'right',
        },

      },


    },


  }
};
