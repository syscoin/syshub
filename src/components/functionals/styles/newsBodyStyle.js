import palette from './palette';

const primary = palette.primary;
const white = palette.white;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;
const grey = palette.grey;
const secondary = palette.secondary;


export default {
    root: {
        width: '100%',
        margin: 0,
        marginTop: 20,
        borderBottom: 'thin solid' + greyDark,
        '& p': {
            marginLeft: 28,
            fontSize: 15,
            color: greyDark
        },
        '& ul':{
            fontSize: 15,
            color: greyDark
        }
    }
}
mRoot:{extend:'root'}