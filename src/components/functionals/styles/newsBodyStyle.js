import palette from './palette';

const greyDark = palette.greyDark;


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
        '& ul': {
            fontSize: 15,
            color: greyDark
        }
    },
    mRoot: {
        extend: 'root',
        '& .new-body__wrapper': {
            '& img': {
                width: '100%'
            }
        }
    }
}
