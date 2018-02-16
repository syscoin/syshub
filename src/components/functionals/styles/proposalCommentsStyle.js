import palette from './palette';

const primaryDark = palette.primaryDark;
const primaryLight = palette.primaryLight;
const white = palette.white;
const gray = palette.grey;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;

export default {
  root: {
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
        border: '1px solid ' + greyLight,
      },
      '& .separate-with-margin': {
        border: '1px solid ' + greyLight,
        marginTop: 30,
      },
    },
    '& .commentSectionslView': {
      margin: 0,
      marginLeft: '4%',
      marginTop: 10,
      borderRadius: 5,
      background: 'rgb(240, 242, 245)',
      boxShadow: '5px 5px 20px ' + gray,

      height: 175,
      '& .commentHeading': {
        color: greyDark,
        padding: '10px 28px',
        fontWeight: 500,
        fontSize: 16,
      },
      '& .proposalDetails': {
        color: gray,
        fontSize: 15,
        background: white,
        padding: '10px 20px',
        maxWidth: '100%%',
        '& .userComment': {
          border: 0,
        },
        '& .proposalDetailsHr': {
          marginTop: 10,
          border: '1px solid ' + greyLight,
        },
        '& .formSubmiButton': {
          margin: '0 10px',
          borderRadius: '10px',
          backgroundColor: primaryDark,
          color: white,
          float: 'right',
          '& .MuiButton-label-17': {
            color: white,
          },
        },
      },
    },
    '& .proposalHr': {
      marginTop: 80,
      marginLeft: '6%',
      width: '97%',
      border: '1px solid ' + greyLight,
    },

    '& .topCommentWithReplyView': {
      margin: 0,
      marginTop: 10,
      borderRadius: 10,
      border: '1px solid' + gray,
      minHeight: 200,
      display: 'block',
      paddingBottom: 20,
      '& .commentlHrView': {
        margin: 0,
        marginLeft: '4%',
        maxWidth: '94.8%',
        marginTop: '-10px',
        '& hr': {
          border: '1px solid ' + greyLight,
        },
      },

      '& .commentHeading': {
        padding: '10px 10px',
        '& .userView': {
          padding: 0,
          marginTop: 10,
          '& .userName': {
            color: greyDark,
            padding: '10px 28px',
            fontWeight: 500,
          },
          '& .commentDate': {
            display: 'inline-block',
            marginLeft: '-20px',
            color: gray,
          },
          '& .badgeIcon': {
            width: 20,
            marginLeft: 5,
          },
        },
      },

      '& .votesView': {
        marginTop: 10,
        padding: 0,
        textAlign: 'right',
        '& .upVoteICon': {
          width: 20,
          marginLeft: 5,
        },
        '& .downVoteICon': {
          width: 20,
          marginLeft: 30,
          marginRight: 5,
        },
      },
      '& .newYearView': {
        padding: 0,
        marginLeft: '7%',
        fontSize: 16,
        color: gray,
        '&>p': {
          display: 'inline-block',
        },
        '& .show-edited': {
          width: 5,
          fontSize: 10,
          backgroundColor: '#fff',
          margin: 0,
          padding: '5px 0px',
          '& span': {
            color: primaryLight
          }
        },
        '& .edit-delete-btn': {
          display: 'inline-block',
          float: 'right',
        }
      },
      '& .replyView': {
        padding: 0,
        marginLeft: '7%',
        marginTop: 20,
        fontSize: 16,
        color: primaryDark,
        fontWeight: 'bold',
      },
      '& .topcommentSectionslView': {
        margin: '3px 0 20px 6%',
        borderRadius: 5,
        background: 'rgb(240, 242, 245)',
        '& .commentHeading': {
          color: greyDark,
          padding: '10px 28px',
          fontWeight: 500,
          fontSize: 16,
        },
        '& .proposalDetails': {
          color: gray,
          fontSize: 15,
          background: white,
          maxWidth: '100%',
          padding: '10px',
          boxShadow: '5px 5px 20px ' + gray,
          '& .userComment': {
            border: 0,
          },
          '& .proposalDetailsHr': {
            marginTop: 10,
            border: '1px solid ' + greyLight,
          },
          '& .formSubmiButton': {
            margin: '0 10px',
            borderRadius: '10px',
            backgroundColor: primaryDark,
            float: 'right',
            '& .MuiButton-label-17': {
              color: white,
            },
          },
        },
      },
    },
    '& .allReplies': {
      marginTop: 10,
      marginLeft: '8%',
      '& .replyHeading': {
        padding: '10px 10px',
        '& .replyUserVeiw': {
          padding: 0,
          marginTop: 10,
          '& .replyUserName': {
            color: greyDark,
            padding: '10px 28px',
            fontWeight: 500,
          },
          '& .replyDate': {
            display: 'inline-block',
            marginLeft: '-20px',
            color: gray,
          },
        }
      }
    },
    '& .commentWithReplyView': {
      margin: 0,
      marginTop: 5,
      marginBottom: 70,
      borderRadius: 10,
      border: '1px solid' + gray,
      height: 150,
      '& .commentlHrView': {
        margin: 0,
        marginLeft: '4%',
        maxWidth: '94.8%',
        marginTop: '-10px',
        '& .commentlHr': {
          border: '1px solid ' + greyLight,
        },
      },

      '& .commentHeading': {
        padding: '10px 10px',
        '& .userView': {
          padding: 0,
          marginTop: 10,
          '& .userName': {
            color: greyDark,
            padding: '10px 28px',
            fontWeight: 500,
          },
          '& .commentDate': {
            display: 'inline-block',
            marginLeft: '-20px',
            color: gray,
          },
          '& .badgeIcon': {
            width: 20,
            marginLeft: 5,
          },
        },
      },

      '& .votesView': {
        marginTop: 10,
        padding: 0,
        textAlign: 'right',
        '& .upVoteICon': {
          width: 20,
          marginLeft: 5,
        },
        '& .downVoteICon': {
          width: 20,
          marginLeft: 30,
          marginRight: 5,
        },
      },
      '& .newYearView': {
        padding: 0,
        marginLeft: '7%',
        fontSize: 16,
        color: gray,
      },
      '& .replyView': {
        padding: 0,
        margin: '20px 0 20px 7%',
        fontSize: 16,
        color: primaryDark,
        fontWeight: 'bold',
      },
    },
    '& textarea': {
      color: gray,
      maxWidth: '100%',
    },
    '& button': {
      borderRadius: '5px',
      padding: '5px',
      minHeight: '25px',
      width: '150px',
      fontSize: '16px',
      backgroundColor: primaryDark,
      margin: '0 10px',
      float: 'right',
      '& span': {
        color: white,
      },
    },
    '& .votingNumber': {
      display: 'inline',
      verticalAlign: 'bottom',
      padding: '0px 3px'
    },
    '& .pagination': {
      textAlign: 'right',
      padding: '20px 0px'
    },
    '& .add-comment-btn': {
      float: 'none'
    },
    '& .replyView': {
      cursor: 'pointer'
    }
  },
  mRoot: {
    extend: 'root',
    width: '100%',
    '& .commentHeadingDiv': {
      '& .heading': {
        '&>p': {
          fontSize: 20,
        }
      }
    },
    '& .commentSectionslView': {
      width: '98%',
      '& .proposalDetails': {
        width: '100%',
        maxWidth: '100%',
        marginLeft: 0,
        padding: 5,
      }
    },
    '& .topCommentWithReplyView': {
      width: '100%',
      display: 'block',
      maxHeight: '100%',
      paddingBottom: 10,
      minHeight: '1%',
      '& .commentHeading': {
        '& .userView': {
          width: '70%',
          display: 'inline-block',
          '& .userName': {
            padding: 10,
          },
          '& .commentDate': {
            marginLeft: 0,
            fontSize: 12,
          }
        },
        '& .votesView': {
          width: '30%',
          padding: '0px 10px',
          '& .downVoteICon': {
            marginLeft: 10,
            marginRight: 5,
          }
        }
      },
      '& .newYearView': {
        marginRight: '7%',
        '&>p': {
          display: 'inline-block'
        }
      },
      '& .topcommentSectionslView': {
        width: '100%',
        margin: '3px 0 20px 2%',
        '& .proposalDetails': {
          padding: 5,
        }
      }
    },
    '& .allReplies': {
      width: '100%',
      display: 'block',
      margin: 'auto',
      marginLeft: '2%',
      '& .replyHeading': {
        width: '100%',
        margin: 'auto',
        '& .replyUserVeiw': {
          '& .replyUserName': {
            padding: '10px 25px 10px 10px',

          }
        }
      },
      '& .commentlHrView': {
        maxWidth: '90% !important',
        marginLeft: '7% !important',
      }
    }
  },
};
