import palette from './palette';

const primary = palette.primary;

export default {
  root: {
    '& .dashBoardheading': {
      fontWeight: 'lighter',
    },
    '& .iconWraper': { fontSize: 14, cursor: 'pointer' },
    '& .icon': { color: primary },
    '& .iconTxt': { color: primary },
  },
};
