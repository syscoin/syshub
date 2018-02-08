import palette from './palette';

const white = palette.white;
const primary = palette.primary;
const greyLight = palette.greyLight;
const greyDark = palette.greyDark;

export default {
  root: {
    marginTop: 30,
    '& .title': {
      display: 'inline-block',
      fontWeight: 'lighter',
      color: greyDark,
    },
    '& .heading': {
      borderBottom: '1px solid ' + greyLight,
    },
    '& .node-list-table': {
      '& .ant-table-thead': {
        '&>tr': {
          '&>th': {
            background: white,
            fontWeight: 'lighter',
          },
        },
      },
      '& .ant-table-tbody': {
        '&>tr>td:first-child': {
          borderLeft: '1px solid #e8e8e8',
        },
        '&>tr>td:last-child': {
          borderRight: '1px solid #e8e8e8',
          textAlign: 'right',
        },
      },
      '& .ant-radio-button-wrapper': {
        margin: '0px 10px',
        borderRadius: '10px !important',
        fontSize: 18,
        position: 'inherit',
      },
    },
  },
  modal: {
    '& .ant-modal-content': {
      '& .ant-modal-close-x': {
        color: white,
      },
    },
    '& .ant-modal-header': {
      background: primary,
      '& .ant-modal-title': {
        color: white,
        fontSize: 22,
      },
    },
    '& .ant-modal-body': {
      '& .form__container': {
        '& .form-group': {
          flexDirection: 'row',
        },
        '& .label': {
          width: '50%',
          display: 'inline-block',
          textAlign: 'right',
          fontSize: '15px',
          color: primary,
          textAlign: 'left',
          fontWeight: 'lighter',
          marginTop: 15,
        },
        '& .input-field': {
          width: '50%',
          display: 'inline-block',
          border: 'thin solid ' + greyLight,
          padding: '5px 15px',
          marginTop: '10px',
          '&::before': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    '& .ant-modal-footer': {
      '& .ant-btn-primary': {
        backgroundColor: primary,
        borderColor: primary,
      },
      '& .ant-btn-primary span': {
        color: white,
        fontSize: 17,
        fontWeight: 500,
      },
      '& .ant-btn': {
        fontWeight: 500,
        fontSize: 17,
      },
    },
  },

  mRoot: {
    extend: 'root',
    '& .ant-table-tbody > tr > td': {
      wordBreak: 'inherit',
      padding: 10,
      border: 'none'
    },
    '& .edit-btn, .delete-btn': {
      margin: '0 2px'
    }
  },
};
