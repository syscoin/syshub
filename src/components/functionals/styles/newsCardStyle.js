import palette from './palette';

const primary = palette.primary;
const primaryLight = palette.primaryLight;
const greyDark = palette.greyDark;
const grey = palette.grey;

export default {
  root: {
    width: 'calc(100% - 40px)',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20,
    '& card-item': {},
    '& .readed': {
      color: `${grey} !Important`,
    },
    '& button span': {
      color: 'white',
      textTransform: 'capitalize',
    },
    '& .news-card-grid': {
      '& .newsCardImage-grid': {
        padding: '20px 0px 0px 10px',
        maxWidth: 140,
        '& img': {
          width: '100%',
        },
      },
      '& .newsCardContent-grid': {
        marginTop: 15,
        verticalAlign: 'middle',
        '& .card': {
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
        '& button': {
          borderRadius: '5px',
          padding: '0px',
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
      marginTop: 10,
    },
  },
  mRoot: {
    extend: 'root',
    width: 'calc(100% - 20px)',
    '& card-item': {},
    '& .news-card-grid': {
      width: '100%',
      '& .newsCardImage-grid': {
        padding: '0px 0px 0px 0px',
        '& img': {
          width: '100%',
          maxWidth: 70,
          marginTop: 30
        },
      },
      '& .newsCardContent-grid': {
        height: 110,
        verticalAlign: 'middle',
        marginTop: 0,
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
          },
        },
      },
      '& .showMoreButton-grid': {
        textAlign: 'right',
        marginRight: 20,
        '& button': {
          marginTop: 10,
          borderRadius: 5,
          padding: 0,
          minHeight: 25,
        },
        '& button:hover': {
          backgroundColor: primaryLight
        }
      },
    },
    '& .divider': {
      marginTop: 10
    },
  },
};
