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
        borderBottom: 'thin solid' + greyDark
    },
    avatar: {
        height: 70,
        width: 70,
        padding: 15
    },
    about: {
        width: 'calc(100% - 90px)',
        display: 'inline-block',
        marginLeft: 20,
        verticalAlign: 'super',
        fontSize: 15,
        fontStyle: 'italic'
    }
}