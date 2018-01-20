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
        width: '100%',
        margin: 0,
        borderBottom: 'thin solid '+ greyDark,
        '& .new-header-grid': {
            '& img': {
                height: '100%',
                width: '100%'
            },
            '& .cover':{
                position: 'relative',
                marginTop: 20,
                '& .info': {
                    position: 'absolute',
                    bottom: 0,
                    marginLeft: 20,
                    '& .title':{
                        color: primary,
                        marginBottom: 0,
                        fontSize: 35,
                        fontWeight: 100
                    },
                    '& .sub-title':{
                        fontSize: 20,
                        color: white,
                        fontWeight: 100
                    }
                }
            },
            '& .author':{
                '& .info': {
                    display: 'inline-block',
                    width: 'calc(100% - 100px)',
                    marginLeft: 20,
                    marginTop: 20,
                    verticalAlign: 'super',
                    '& .date':{
                        marginBottom: 0
                    }
                }
            }
        },

 
    }






}