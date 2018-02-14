import palette from './palette';

const primary = palette.primary;
const primaryLight = palette.primaryLight;
const white = palette.white;
const grey = palette.grey;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;

export default {
  root: {
    marginTop: '20px',
    '& StepLabel': {
      color: 'red'
    },
    '& .step-label': {
      color: primary,
      marginTop: 12,
      display: 'inline',
      fontWeight: 300
    },
    '& .steper__container': {
      '& > span > span:nth-child(2)': {
        width: '100%',
        '& .preview-edit-button': {
          height: 25,
          fontSize: 10,
          marginLeft: 25,
          borderRadius: 10
        }
      },
      '& path': {
        fill: primary
      },
      '& circle': {
        fill: primary
      }
    },
    '& .title': {
      fontWeight: 'lighter',
      color: greyDark,
      textTransform: 'uppercase'
    },
    '& .paper-container': {
      padding: '20px 20px',
      overflowY: 'auto',
      maxHeight: '80vh',

      //next step button styling
      '& .next-btn-div': {
        textAlign: 'right',
        margin: '10px 60px 10px 0px',
        '& Button': {
          borderRadius: '7px',
          height: '35px',
          margin: 10
        },
        '& button span': {
          textTransform: 'capitalize',
          padding: '3px 0px',
          fontSize: '18px',
          color: white
        }
      },
      //confirm button styling
      '& .confirm-btn-div': {
        margin: '10px 60px 10px 0px',
        '& Button': {
          borderRadius: '7px',
          height: '35px',
          margin: 10
        },
        '& button span': {
          textTransform: 'capitalize',
          padding: '3px 0px',
          fontSize: '18px',
          color: white
        }
      },
      '& .proposal-title': {
        fontWeight: 100,
        fontSize: '22px',
        color: primaryLight,
        display: 'inline-block',
        // paddingLeft: 'calc(50% + 50px )',
        marginLeft: 'calc(50% - 220px)'
      },
      '& .proposalHeading-dot': {
        backgroundColor: primary,
        borderRadius: '10px',
        height: '20px',
        width: '20px',
        display: 'inline-block',
        marginRight: '15px'
      },
      //step 1 proposal-title-row
      '& .proposal-title-row': {
        '& .proposal-title-input, .proposal-url-input': {
          width: 'calc(100% - 40px)',
          height: '40px'
        },
        '& .proposal-description-url': {
          display: 'block',
          marginLeft: '25px',
          color: grey
        },
        '& .nextStep-button-div': {
          textAlign: 'center',
          margin: '40px 0px 0px 0px',
          '& Button': {
            borderRadius: '7px',
            height: '35px'
          },
          '& button span': {
            textTransform: 'capitalize',
            padding: '3px 0px',
            fontSize: '18px'
          }
        }
      },

      //step 2 proposal-details-row'
      '& .proposal-details-row': {
        marginBottom: 20,
        '& .editor-title': {
          position: 'absolute',
          marginLeft: 60,
          fontSize: 18,
          marginTop: 10,
          fontWeight: 'bold',
          color: greyDark
        },
        '& .proposal-editor': {
          padding: '15px',
          marginTop: '10px',
          backgroundColor: white,
          height: 100
        },
        '& .proposalEditor-wrapper': {
          marginLeft: '40px',
          backgroundColor: greyLight,
          marginTop: 20,
          boxShadow: 'rgba(0, 0, 0, 0.20) 0px 5px 20px',
          height: 200,
          minWidth: 500
        },
        '& .toolbarClassName': {
          visibility: 'visible',
          width: 300,
          marginLeft: 'calc(100% - 300px)',
          display: 'inline-flex',
          backgroundColor: greyLight,
          marginTop: 5,
          marginBottom: 0,
          '& .rdw-option-wrapper': {
            backgroundColor: 'transparent',
            border: 'none',
            boxShadow: 'none'
          }
        },
        '& .confirm-button': {
          marginLeft: 'calc(100% - 105px)',
          marginTop: -45,
          position: 'absolute',
          borderRadius: 6,
          backgroundColor: primary
        },
        '& .confirm-button span': {
          color: white
        },
        '& .proposalDetail-title': {
          marginTop: 15,
          fontSize: 18,
          fontWeight: 'bold',
          color: greyDark
        },
        '& .proposalContent-div': {
          marginLeft: 15,
          padding: 12,
          height: 100,
          overflow: 'auto',
          color: grey
        }
      },
      //paymentDetail-row
      '& .paymentDetail-row': {
        height: 100,
        marginTop: 15,
        '& label': {
          display: 'block'
        }
      },
      //amount-row
      '& .amount-row': {
        height: 50,
        marginTop: 15
      }
    },
    '& .ant-btn-primary': {
      backgroundColor: primary,
      borderColor: primary
    }
  },
  mRoot: {
    extend: 'root',
    marginTop: 0,
    '& .proposal-title': {
      paddingLeft: '0 !important',
      marginLeft: '0px !important'
    },
    '& .editor-title': {
      fontSize: 16,
      marginTop: 8
    },
    '& .payment-input': {
      width: '100%'
    },
    '& .toolbarClassName': {
      marginTop: '30px !important',
      margin: '10px auto auto auto !important'
    },
    '& .proposalEditor-wrapper': {
      margin: '0 !important',
      minWidth: '250px !important',
      height: '230px !important'
    },
    '& .paper-container': {
      padding: '0 !important'
    }
  }
};
