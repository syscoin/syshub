import palette from './palette';

const primary = palette.primary;
const white = palette.white;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;
const secondary = palette.secondary;


export default {
    root: {
        '& .title':{
            fontWeight:'lighter',
        },
        '& .paper-container': {
            padding:'20px 30px',
            height: "80vh",
            overflowY: 'auto'
            ,
            '& .gridList':{
                width: 500,
                height: 450,
            }

        }
    }






}