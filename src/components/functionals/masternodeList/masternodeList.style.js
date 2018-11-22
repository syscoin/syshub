import palette from '../../../styles/palette';

const white = palette.white;
const primary = palette.primary;
const greyLight = palette.greyLight;
const greyDark = palette.greyDark;

export default {
  root: {
    marginTop: 30,
    '& .list-title': {
      display: 'inline-block',
      fontWeight: 'normal',
      color: greyDark
    },
    '& .heading': {
      borderBottom: '1px solid ' + greyLight
    },
    '& .node-list-table': {
      '& .ant-table-thead': {
        '&>tr': {
          '&>th': {
            background: white,
            fontWeight: 'normal'
          }
        }
      },
      '& .ant-table-tbody': {
        '&>tr>td:first-child': {
          borderLeft: '1px solid #e8e8e8'
        },
        '&>tr>td:last-child': {
          borderRight: '1px solid #e8e8e8',
          textAlign: 'right'
        }
      },
      '& .ant-radio-button-wrapper': {
        margin: '0px 10px',
        borderRadius: '10px !important',
        fontSize: 18,
        position: 'inherit'
      }
    }
  },
  modal: {
    '& .ant-modal-content': {
      '& .ant-modal-close-x': {
        color: white
      }
    },
    '& .ant-modal-header': {
      background: primary,
      '& .ant-modal-title': {
        color: white,
        fontSize: 22
      }
    },
    '& .ant-modal-body': {
      '& .form__container': {
        '& .form-group': {
          flexDirection: 'row',
          flexJustify: 'flex-start'
        },
        '& .label': {
          width: '50%',
          display: 'inline-block',
          fontSize: '15px',
          color: primary,
          textAlign: 'left',
          fontWeight: 'normal',
          marginTop: 15
        },
        '& .input-field': {
          width: '50%',
          display: 'inline-block',
          border: 'thin solid ' + greyLight,
          padding: '5px 15px',
          marginTop: '10px',
          '&::before': {
            backgroundColor: 'transparent'
          }
        }
      }
    },
    '& .ant-modal-footer': {
      '& .ant-btn-primary': {
        backgroundColor: primary,
        borderColor: primary
      },
      '& .ant-btn-primary span': {
        color: white,
        fontSize: 17,
        fontWeight: 500
      },
      '& .ant-btn': {
        fontWeight: 500,
        fontSize: 17
      }
    }
  },
  mModal: {
    extend: 'modal',
    '& .ant-modal-body': {
      padding: 10,
      '& .form__container': {
        '& .label': {
          width: '100%'
        },
        '& .input-field': {
          width: '100%'
        }
      }
    },
    '& .ant-modal-footer': {
      textAlign: 'center',
      borderTop: 'none'
    }
  },
  mRoot: {
    extend: 'root',
    '& .list-title': {
      padding: '5px 0px',
      marginBottom: 0,
      fontSize: 20
    },
    '& .ant-table-tbody > tr > td': {
      wordBreak: 'inherit',
      padding: 10,
    },
    '& .edit-btn, .delete-btn': {
      margin: '0 2px',
      padding: '5px 9px'
    },
  }
};
