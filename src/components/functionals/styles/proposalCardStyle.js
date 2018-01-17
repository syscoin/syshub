import palette from './palette';
import { colors } from 'material-ui/styles';

const primaryDark = palette.primaryDark;
const primaryLight = palette.primaryLight;
const white = palette.white;

export default {
  proposalRoot: {
    height: "90%",
    "& .proposalRow": {
      height: "15%",
      marginLeft: "50px",
      backgroundColor: "white",
      padding:"15px",
      borderRadius: "10px",
      border: "2px solid ghostwhite",

        "& .proposalInfoView": {
          borderRight: "1px solid gray",
          borderLeft: "1px solid gray",
          paddingLeft:"20px",
          "& .proposalHeading": {
            color: "#1991CC",
            margin:"0px",

          },
          "& .proposalDetail": {
            color: 'gray',

          },
        },
        "& .VotesView": {
          marginTop:"30px",
          "& .voteNumber": {
            color: 'gray',
            fontSize:"20px"

          },
          "& .upVoteIcon": {
            width: "20px",
            height: '25px',
            marginLeft:"50px",
            marginRight:"10px"

          },
          "& .downVoteIcon": {
            width: "20px",
            height: '25px',
            marginLeft:"40px",
            marginRight:"10px"

          },
        }

      }


  }
};
