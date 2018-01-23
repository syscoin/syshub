import palette from './palette';

const primary = palette.primary;
const white = palette.white;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;
const secondary = palette.secondary;

export default {
    root: {
        marginTop: '20px',
        '& .title': {
            fontWeight: 'lighter',
            color: greyDark,
            fontSize:20
        },
        '& .paper-container': {
            padding: '20px 20px',


        }
    }

};
