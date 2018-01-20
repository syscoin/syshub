import palette from './palette';

const primary = palette.primary;
const primaryLight = palette.primaryLight;
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
        '& .changePsw-heading': {
            marginLeft: '20px',
            fontWeight: '100',
            fontSize: '21px',
            borderBottom: '0.1px solid ' + greyLight,

        },
        '& .changePsw-credential-grid': {
            marginTop: '-20px',
            '& .changedPsw-note': {
                color: primaryLight,
                margin: '20px 40px',
                display: 'block',
                fontWeight: 100,

            },

            '& .formGroup-div': {
                marginLeft: '20px',
                '& .form-group': {
                    flexDirection: 'row',
                    marginTop: '10px',
                    display: 'block',
                    '& .label': {
                        width: '21%',
                        display: 'inline-block',
                        textAlign: 'right',
                        fontSize: '15px',
                        marginTop: '15px',
                        color: primary,
                        paddingRight: '10px',
                        fontWeight: 100,
                    },
                    '& .input-field': {
                        color: primaryLight,
                        width: 'calc(40% - 100px)',
                        margin: '0px 10px',
                        display: 'inline-block',
                        border: 'thin solid ' + greyLight,
                        padding: '10px',
                        '&::before': {
                            backgroundColor: 'transparent'
                        }
                    },
                    '& .validation-message': {
                        marginLeft: '21px',
                        display: 'inline-block',
                        fontSize: '15px',
                        marginTop: '15px',
                        color: greyDark,
                        fontWeight:'100',
                        '& img': {
                            width: '20px',
                            marginRight: '5px'
                        },
                        '& .strong': {
                            color: secondary,
                            fontWeight: 'bold',
                            marginLeft: 5
                        }
                    }
                },
            }
        },
        '& .confirmChange-button-grid': {
            padding: '20px'
        },
        '& button': {
            borderRadius: 5,
            padding: 8,
            minHeight: 25,
            width: 150,
            fontSize: 16,
            color: white,
            backgroundColor: primary
        }
    }
}






