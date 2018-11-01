import palette from './palette';

const white = palette.white;
const primary = palette.primary;
const primaryLight = palette.primaryLight;
const greyDark = palette.greyDark;
const grey = palette.grey;
const greyLight = palette.greyLight;

export default {
  root: {
    width: 'calc(100% - 40px)',
    cursor: 'pointer',
    '& card-item': {    },
    '& .readed': {
      color: `${grey} !important`,
    },
    '& button span': {
      color: 'white',
      textTransform: 'capitalize',
    },
    '& .news-card-grid': {
      position: 'relative',
      margin: '5px 0 0 0',
      '&:hover': {
        backgroundImage: `linear-gradient(to right, ${white} , ${greyLight}, ${white})`,
      },
      '& .newsCardImage-grid': {
        margin: '10px 0px 0px 10px',
        maxWidth: 100,
        '& img': {
          backgroundColor: 'transparent',

          width: '100%',
        },
      },
      '& .newsCardContent-grid': {
        verticalAlign: 'middle',
        '& .card': {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          '& .news-heading': {
            marginBottom: '10px',
            fontWeight: 600,
            color: primary,
            '& .cardSubHeading': {
              fontWeight: 100,
              fontSize: '90%',
              color: greyDark,
            },
          },
          '& .newsContent': {
            maxHeight: 55,
            overflow: 'hidden',
            fontWeight: 100,
            color: greyDark,
          },
        },
      },
      '& .showMoreButton-grid': {
        textAlign: 'right',
        marginRight: '20px',
        padding: '0px 15px 10px 0px',
        position: 'absolute',
        bottom: 3,
        right: 0,
        '& button': {
          borderRadius: '5px',
          padding: '0px 10px',
          minHeight: '28px',
        },
        '& button:hover': {
          backgroundColor: primaryLight
        }
      },
    },
    '& button': {
      backgroundColor: primary,
      '&:hover': {
        backgroundColor: primaryLight,
      },
    },
    '& .inline-block': {
      display: 'inline-block',
    },
    '& .divider': {
      marginTop: 5,
    }
  },
  mRoot: {
    extend: 'root',
    minHeight: 125,
    width: 'calc(100% - 20px)',
    borderBottom: 'thin solid ' + grey,
    '& .news-card-grid': {
      width: '100%',
      '& .newsCardImage-grid': {
        padding: '0px 0px 0px 0px',
        '& img': {
          width: '100%',
          maxWidth: 70,
          marginTop: 30
        }
      },
      '& .newsCardContent-grid': {
        height: '100%',
        verticalAlign: 'middle',
        marginTop: 0,
        '& div': {
          padding: 0
        },
        '& .card': {
          '& .news-heading': {
            marginTop: 10,
            fontSize: 15,
            marginBottom: '10px',
            fontWeight: 600,
            color: primary,
          },
          '& .cardSubHeading': {
            fontWeight: 100,
            fontSize: '90%',
            color: greyDark,
          },
          '& .newsContent': {
            maxHeight: 55,
            overflow: 'hidden',
            fontWeight: 100,
            color: greyDark,
          }
        }
      },
      '& .showMoreButton-grid': {
        display: 'none'
      },
      '& button:hover': {
        backgroundColor: primaryLight
      }
    },
    '& .divider': {
      display: 'none'
    }
  },
  '& .divider': {
    marginTop: 0
  }
};
