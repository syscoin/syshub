import palette from './palette';
import { colors } from 'material-ui/styles';

const primaryDark = palette.primaryDark;
const primaryLight = palette.primaryLight;
const white = palette.white;
const gray = palette.grey;
const greyDark = palette.greyDark;

export default {
  proposalRoot: {
    // height: "90%",
    // height: "515px",
    height: "100%",

    "& .proposalRow": {
      flexBasis: 'calc(100% - 40px)',
      height: 150,
      marginTop: 5,
      marginLeft: 50,
      backgroundColor: "white",
      padding:"15px 0px",
      borderRadius: "10px",
      border: "2px solid ghostwhite",

        "& .proposalView": {
          textAlign: "-webkit-center",
          "& .progress-dial": {
            // width:"100px",
            "& .ant-progress-inner": {
              width: "100px !important",
              height: "92px !important",
              fontSize: "20px !important",
              "& .progressIcon": {
                width:'50px',
                height:'50px'

              },

            },

          },
          "& .proposalStatusNo": {
            color: gray,
            marginTop:"10px"

          },
          "& .proposalStatusActiveNo": {
            color: "red",

          },
        },
        "& .proposalInfoView": {
          borderRight: "1px solid " +gray,
          borderLeft: "1px solid " +gray,
          paddingLeft:"20px",
          "& .voteButton": {
            border: "none",
            textAlign: "right",
            background: primaryDark,
            borderWidth: "1px 0 0 0",
            borderStyle: "solid",
            borderColor: primaryDark,
            float: "right",
            padding: "5px",
            color:primaryLight,
            borderRadius: "5px",
            padding: "5px 10px",
            marginRight:"10px",

          },
          "& .activeVoteButton": {
            border: "none",
            textAlign: "right",
            background: primaryDark,
            borderStyle: "solid",
            float: "right",
            padding: "5px",
            borderRadius: "5px",
            padding: "5px 10px",
            backgroundColor: white,
            color: primaryLight,
            borderColor: primaryDark,
            borderWidth: "2px",
            marginRight:"10px",


          },

          "& .proposalHeading": {
            color: primaryDark,
            margin:"0px",
            marginTop:"10px",

          },
          "& .proposalDetail": {
            color: gray,
            marginTop: "5px",
            fontSize:"15px"

          },
        },
        "& .VotesView": {
          marginTop:"30px",
          "& .voteNumber": {
            color: gray,
            fontSize:"20px"

          },

          "& .smallUpVoteIcon": {
            width: "20px",
            height: '25px',
            marginLeft:"50px",
            marginRight:"10px"

          },
          "& .smallDownVoteIcon": {
            width: "20px",
            height: '25px',
            marginLeft:"40px",
            marginRight:"10px"

          },
          "& .votesIconView": {
            "& .upVoteIcon": {
              width: "30px",
              height: '40px',
              marginLeft:"23%",
              marginRight:"6%"

            },
            "& .downVoteIcon": {
              width: "30px",
              height: '40px',
              marginLeft:"18%",
              // marginRight:"10px"

            },

          },
          "& .votesNoView": {
            display:"-webkit-inline-box",
            "& .voteNumber": {
              color: gray,
              fontSize:"20px",
              padding:"10px 10px 0px 54px"

            },

          },
        }

      }


  }
};
