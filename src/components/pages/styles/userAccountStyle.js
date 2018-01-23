import palette from './palette';

const primary = palette.primary;
const white = palette.white;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;
const grey = palette.grey;
const secondary = palette.secondary;


export default {
    root: {
        '& .title':{
            fontWeight:'lighter',
        },
        '& .paper-container': {
            padding:'20px 20px',
            '& .gridList':{
                width: 500,
                height: 450,
            }

        }
    }






}
