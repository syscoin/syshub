import palette from './palette';

const primary = palette.primary;
const white = palette.white;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;
const grey = palette.grey;
const secondary = palette.secondary;


export default {
    root: {
        width: 'calc(100% - 40px)',
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 20,
        '& card-item':{

        },
        "& button span": {
            color: 'white',
            textTransform: 'capitalize'
        },
        '& .news-card-grid': {
            '& .newsCardImage-grid': {
                
                padding: '20px 0px 0px 10px',
                '& img': {
                    width: '100%'
                }
            },
            '& .newsCardContent-grid': {
                verticalAlign: 'middle',
                '& .card': {
                    '& .news-heading': {
                        marginBottom: '10px',
                        fontWeight: 600,
                        color: greyDark,
                        '& .cardSubHeading': {
                            fontWeight: 100,
                            fontSize: '90%',
                            color: primary,
                        }
                    },
                    '& .newsContent': {
                        maxHeight: 55,
                        overflow: 'hidden',
                        fontWeight: 100,
                        color: greyDark
                    }
                }
            },
            '& .showMoreButton-grid': {
                textAlign: 'right',
                marginRight: '20px',
                '& button': {
                    borderRadius: '5px',
                    padding: '0px',
                    minHeight: '28px'
                }
            }
        },
        '& button':{
            backgroundColor: primary
        },
        '& .inline-block': {
            display: 'inline-block'
        }
    },
    divider:{
        marginTop: 10
    }
}