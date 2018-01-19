import palette from './palette';

const primary = palette.primary;
const white = palette.white;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;
const grey = palette.grey;
const secondary = palette.secondary;


export default {
    root: {
        marginTop:'20px',
        '& .title':{
            fontWeight:'lighter',
        },
        '& .paper-container': {
            padding: '0px 30px 30px 10px',
            height: "80vh",
            overflowY: 'auto'
        }
    }






}