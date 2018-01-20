import palette from './palette';

const primary = palette.primary;
const white = palette.white;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;
const grey = palette.grey;
const secondary = palette.secondary;


export default {
    root: {
        marginTop: '20px',
        '& .info': {
            width: 'calc(100% - 120px)',
            display: 'inline-block',
            marginLeft: 20,
            verticalAlign: 'top',
            '& .title': {
                fontWeight: 'bold',
                fontSize: 20
            },
            '& .sub-title': {
                color: primary,
                fontWeight: 100
            }
        },
        '& button': {
            float: 'right',
            backgroundColor: primary,
            marginRight: 10,
            '& span':{
                color: white
            },
            '&.next':{},
            '&.previous':{
                paddingLeft: 0,
            },
            '&:hover':{
                backgroundColor: primary,
                opacity: 0.8
            },
            '& i':{
                color: white
            }
        }
    },
    thumbnil: {
        height: 80,
        width: 80
    }






}