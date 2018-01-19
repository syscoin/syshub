import palette from './palette';

const primary = palette.primary;
const white = palette.white;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;
const secondary = palette.secondary;


export default {
    root: {
        paddingTop: "20px",
        "& button span": {
            color: 'white',
            textTransform: 'capitalize'

        },
        '& .userDelete-heading': {
            marginLeft: '20px',
            fontWeight: 'lighter',
            fontSize: '21px'
        },
        '& .UserDelete-text': {
            marginLeft: '35px'
        },
        '& .delete-button-grid': {
            padding: '20px',
            '& .delete-button': {
                borderRadius: "5px",
                padding: '5px',
                minHeight: '25px',
                width: '150px',
                fontSize: '16px'
            }
        }

    }
}








