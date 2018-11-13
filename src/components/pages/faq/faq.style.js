import palette from '../../../styles/palette';

const primary = palette.primary;
const white = palette.white;
const greyDark = palette.greyDark;
const grey = palette.gey;

// font sizes
const baseFontSize = 1.8;
const categoryFontSize = `${baseFontSize}em`; //1.8
const subCategoryFontSize = `${baseFontSize * 0.9}em`;//1.6
const answerFontSize = `${baseFontSize * 0.22}em`;//0.4


export default {
  root: {
    '& .title': {
      fontWeight: 300,
      color: greyDark,
      textTransform: 'uppercase',
      padding: 15,
      margin: 'auto',
    },
    '& .faqs-div': {
      background: white,
      padding: '20px 20px 0px 20px',
      overflowY: 'auto',
      height: '80vh',
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
      '& .ant-collapse-header': {
        color: primary,
        padding: '12px 0 12px 20px',
        textTransform: 'camelcase',
        fontWeight: 'normal',
        '& .arrow': {
          fontSize: 20,
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
      '& .faq-category': {
        fontSize: categoryFontSize,
        '& .ant-collapse-content-box': {
          fontSize: '300%',
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
          },
          '& .faq-subCategory': {
            textTransform: 'capitalize',
            '& .ant-collapse-header': {
              fontSize: subCategoryFontSize,
            },
            '& .answer': {
              fontSize: answerFontSize,
              textTransform: 'none',
              color: grey,
              paddingBottom: 15
            },
          },
        },
        '& .ant-collapse-borderless': {
          marginTop: 0
        }
      },
    }
  },
  mRoot: {
    extend: 'root',
    '& .title': {
    },
    '& .faqs-div': {
      padding: '15px 15px 0px 15px',
      '& .search-question': {
        width: '90%',
        margin: 'auto',
      },
      '& .faq-subCategory': {
        '& .ant-collapse-header': {
          fontSize: 15,
        },
      },
      '& .ant-collapse-header .arrow': {
        width: '10% !important'
      },
      '& .faq-category': {
        '& .ant-collapse-content': {
          padding: 0,
        }
      }
    },

  }
};
