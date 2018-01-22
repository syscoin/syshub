import palette from './palette';
import { colors } from 'material-ui/styles';

const primaryDark = palette.primaryDark;
const primaryLight = palette.primaryLight;
const white = palette.white;
const gray = palette.grey;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;

export default {
  proposalCommentRoot: {
    marginTop: 30,
    '& .commentHeadingDiv': {
      margin: 0,
      '& .heading': {
        fontSize: 20,
        color: greyDark,
        fontWeight: 200,

      },
    },
    '& .section-separate': {
      margin: 0,
      '& hr': {
        border: "1px solid " + greyLight,

      },
      '& .separate-with-margin': {
        border: "1px solid " + greyLight,
        marginTop: 30

      }
    },
    "& .commentSectionslView": {
      margin: 0,
      marginLeft: "4%",
      marginTop: 10,
      borderRadius: 5,
      background: "rgb(240, 242, 245)",
      boxShadow: "5px 5px 20px " + gray,

      height: 175,
      "& .commentHeading": {
        color: greyDark,
        padding: "10px 28px",
        fontWeight: 500,
        fontSize: 16
      },
      "& .proposalDetails": {
        marginLeft: 5,
        padding: 0,
        color: gray,
        maxWidth: "89.6667%",
        fontSize: 15,
        background: white,
        maxWidth: "100%",
        padding: "10px 20px",
        maxWidth: "99.2%",
        height: 135,
        "& .userComment": {
          border: 0,
        },
        "& .proposalDetailsHr": {
          marginTop: 10,
          border: "1px solid " + greyLight,

        },
        "& .formSubmiButton": {
          margin: "0 10px",
          borderRadius: "10px",
          backgroundColor: primaryDark,
          color: white,
          float: 'right',
          '& .MuiButton-label-17': {
            color: white,

          },
        },

      },


    },
    "& .proposalHr": {
      marginTop: 80,
      marginLeft: "6%",
      width: "97%",
      border: "1px solid " + greyLight,
    },

    "& .topCommentWithReplyView": {
      margin: 0,
      marginTop: 10,
      borderRadius: 10,
      border: "1px solid" + gray,
      height: 320,
      "& .commentlHrView": {
        margin: 0,
        marginLeft: "4%",
        maxWidth: "94.8%",
        marginTop: "-10px",
        "& hr": {
          border: "1px solid " + greyLight,

        },
      },


      "& .commentHeading": {
        padding: "10px 10px",
        "& .userView": {
          padding: 0,
          marginTop: 10,
          "& .userName": {
            color: greyDark,
            padding: "10px 28px",
            fontWeight: 500,

          },
          "& .commentDate": {
            display: 'inline-block',
            marginLeft: '-20px',
            color: gray
          },
          "& .badgeIcon": {
            width: 20,
            marginLeft: 5
          },
        }
      },

      "& .votesView": {
        marginTop: 10,
        padding: 0,
        textAlign: 'right',
        "& .upVoteICon": {
          width: 20,
          marginLeft: 5
        },
        "& .downVoteICon": {
          width: 20,
          marginLeft: 30,
          marginRight: 5,
        },

      },
      "& .newYearView": {
        padding: 0,
        marginLeft: "7%",
        fontSize: 16,
        color: gray
      },
      "& .replyView": {
        padding: 0,
        marginLeft: "7%",
        marginTop: 20,
        fontSize: 16,
        color: primaryDark,
        fontWeight: "bold"
      },
      "& .topcommentSectionslView": {
        margin: "3px 0 20px 6%",
        borderRadius: 5,
        background: "rgb(240, 242, 245)",
        "& .commentHeading": {
          color: greyDark,
          padding: "10px 28px",
          fontWeight: 500,
          fontSize: 16
        },
        "& .proposalDetails": {
          marginLeft: 5,
          padding: 0,
          color: gray,
          maxWidth: "89.6667%",
          fontSize: 15,
          background: white,
          maxWidth: "99%",
          padding: "10px 20px",
          boxShadow: "5px 5px 20px " + gray,
          "& .userComment": {
            border: 0,
          },
          "& .proposalDetailsHr": {
            marginTop: 10,
            border: "1px solid " + greyLight,
          },
          "& .formSubmiButton": {
            margin: "0 10px",
            borderRadius: "10px",
            backgroundColor: primaryDark,
            float: 'right',
            '& .MuiButton-label-17': {
              color: white,

            },
          },

        },


      },






    },

    "& .commentWithReplyView": {
      margin: 0,
      marginTop: 5,
      marginBottom: 70,
      borderRadius: 10,
      border: "1px solid" + gray,
      height: 150,
      "& .commentlHrView": {
        margin: 0,
        marginLeft: "4%",
        maxWidth: "94.8%",
        marginTop: "-10px",
        "& .commentlHr": {
          border: "1px solid " + greyLight,
        },
      },


      "& .commentHeading": {
        padding: "10px 10px",
        "& .userView": {
          padding: 0,
          marginTop: 10,
          "& .userName": {
            color: greyDark,
            padding: "10px 28px",
            fontWeight: 500,

          },
          "& .commentDate": {
            display: 'inline-block',
            marginLeft: '-20px',
            color: gray

          },
          "& .badgeIcon": {
            width: 20,
            marginLeft: 5
          },
        }
      },

      "& .votesView": {
        marginTop: 10,
        padding: 0,
        textAlign: 'right',
        "& .upVoteICon": {
          width: 20,
          marginLeft: 5
        },
        "& .downVoteICon": {
          width: 20,
          marginLeft: 30,
          marginRight: 5,
        },

      },
      "& .newYearView": {
        padding: 0,
        marginLeft: "7%",
        fontSize: 16,
        color: gray
      },
      "& .replyView": {
        padding: 0,
        margin: "20px 0 20px 7%",
        fontSize: 16,
        color: primaryDark,
        fontWeight: "bold"
      },
  },
    '& textarea': {
      color: gray,
      maxWidth:'100%'
    },
    '& button': {
      borderRadius: "5px",
      padding: '5px',
      minHeight: '25px',
      width: '150px',
      fontSize: '16px',
      backgroundColor: primaryDark,
      margin: "0 10px",
      float: 'right',
      '& span': {
        color: white,
      },
    },
    '& .votingNumber': {
      display: "inline",
      verticalAlign: "bottom",
    },

  }
};
