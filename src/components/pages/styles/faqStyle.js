import palette from './palette';

const primary = palette.primary;
const white = palette.white;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;
const secondary = palette.secondary;


export default {
  root: {
    '& .title': {
      fontWeight: 'lighter'
    },
    '& .faqs-div': {
      background: white,
      padding: '20px 20px 0px 20px',
      '& .search-question': {
        width: '30%',
        border: '1px solid ' + greyDark,
        borderRadius: 3,
        '& .ant-input-group-addon': {
          borderRight: 0,
          border: 'none',
          background: white,
        },
        '& .anticon': {
          fontSize: 20,
          color: primary,
          fontWeight: 'bold'
        },
        '& .ant-input': {
          border: 'none'
        },
      },
      '& .ant-collapse-borderless': {
        marginTop: 20
      },
      '& .ant-collapse-header': {
        fontSize: 20,
        color: primary,
        padding: '12px 0 12px 20px',
        textTransform: 'uppercase',
        fontWeight: 'lighter',
        '& .arrow': {
          fontSize: 25,
          right: 0,
          padding: '0px 10px',
          width: '5%',
          margin: 'auto',
          marginRight: 5,
        }
      },
      '& .ant-collapse-content-box': {
        paddingLeft: 25,
      },
      '& .getting-started': {
        '& .ant-collapse-content-box': {
          paddingLeft: 0,
          position: 'relative',
          '& .ant-collapse-header': {
            color: greyDark,
            marginLeft: 40,
          },
          '& .ant-collapse-item': {
            borderBottom: 'none',
            position: 'relative',
          },
          '& .list-dot': {
            position: 'relative',
            height: 12,
            width: 12,
            background: primary,
            top: 28,
            borderRadius: '50%',
            left: 20,
          }
        },
        '& .ant-collapse-borderless': {
          marginTop: 0
        }
      },
      '& .general': {
        '& .ant-collapse-content-box': {
          paddingLeft: 0,
          position: 'relative',
          '& .ant-collapse-header': {
            color: greyDark,
            marginLeft: 40,
          },
          '& .ant-collapse-item': {
            borderBottom: 'none',
            position: 'relative',
          },
          '& .list-dot': {
            position: 'relative',
            height: 12,
            width: 12,
            background: primary,
            top: 28,
            borderRadius: '50%',
            left: 20,
          }
        },
        '& .ant-collapse-borderless': {
          marginTop: 0
        }
      },
      '& .tutorials': {
        '& .ant-collapse-content-box': {
          paddingLeft: 0,
          position: 'relative',
          '& .ant-collapse-header': {
            color: greyDark,
            marginLeft: 40,
          },
          '& .ant-collapse-item': {
            borderBottom: 'none',
            position: 'relative',
          },
          '& .list-dot': {
            position: 'relative',
            height: 12,
            width: 12,
            background: primary,
            top: 28,
            borderRadius: '50%',
            left: 20,
          }
        },
        '& .ant-collapse-borderless': {
          marginTop: 0
        }
      },
      '& .alises': {
        '& .ant-collapse-content-box': {
          paddingLeft: 0,
          position: 'relative',
          '& .ant-collapse-header': {
            color: greyDark,
            marginLeft: 40,
          },
          '& .ant-collapse-item': {
            borderBottom: 'none',
            position: 'relative',
          },
          '& .list-dot': {
            position: 'relative',
            height: 12,
            width: 12,
            background: primary,
            top: 28,
            borderRadius: '50%',
            left: 20,
          }
        },
        '& .ant-collapse-borderless': {
          marginTop: 0
        }
      },
      '& .market-place': {
        '& .ant-collapse-content-box': {
          paddingLeft: 0,
          position: 'relative',
          '& .ant-collapse-header': {
            color: greyDark,
            marginLeft: 40,
          },
          '& .ant-collapse-item': {
            borderBottom: 'none',
            position: 'relative',
          },
          '& .list-dot': {
            position: 'relative',
            height: 12,
            width: 12,
            background: primary,
            top: 28,
            borderRadius: '50%',
            left: 20,
          }
        },
        '& .ant-collapse-borderless': {
          marginTop: 0
        }
      },
      '& .digital-certificates': {
        '& .ant-collapse-content-box': {
          paddingLeft: 0,
          position: 'relative',
          '& .ant-collapse-header': {
            color: greyDark,
            marginLeft: 40,
          },
          '& .ant-collapse-item': {
            borderBottom: 'none',
            position: 'relative',
          },
          '& .list-dot': {
            position: 'relative',
            height: 12,
            width: 12,
            background: primary,
            top: 28,
            borderRadius: '50%',
            left: 20,
          }
        },
        '& .ant-collapse-borderless': {
          marginTop: 0
        }
      },
      '& .encrypted-messaging': {
        '& .ant-collapse-content-box': {
          paddingLeft: 0,
          position: 'relative',
          '& .ant-collapse-header': {
            color: greyDark,
            marginLeft: 40,
          },
          '& .ant-collapse-item': {
            borderBottom: 'none',
            position: 'relative',
          },
          '& .list-dot': {
            position: 'relative',
            height: 12,
            width: 12,
            background: primary,
            top: 28,
            borderRadius: '50%',
            left: 20,
          }
        },
        '& .ant-collapse-borderless': {
          marginTop: 0
        }
      }
    }
  },
};
