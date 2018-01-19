import palette from './palette';

const primary = palette.primary;
const white = palette.white;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;
const grey = palette.grey;
const secondary = palette.secondary;


export default {
    root: {
        // marginTop: '20px',
        "& button span": {
            color: 'white',
            textTransform: 'capitalize'
        },
        '& .newsCard-grid': {
            padding:' 35px 0px 25px 0px',
            '& .newsCardImage-grid': {
                padding: '20px 0px 0px 10px',
                '& img': {
                    width: '100%'
                }

            },
            '& .newsCardContent-grid': {
                '& .card': {

                    '& .newsHeading': {
                        marginBottom: '10px',
                        '& .cardSubHeading': {
                            fontWeight: 'lighter',
                            fontSize: '90%',
                            color: primary,
                        }

                    },
                    '& .newsContent': {
                        maxHeight: '80px',
                        overflow: 'hidden'
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


        }
    }






}