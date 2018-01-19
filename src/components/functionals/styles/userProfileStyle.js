import palette from './palette';

const primary = palette.primary;
const white = palette.white;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;
const secondary = palette.secondary;


export default {
    root: {
        "& button span": {
            color: 'white',
            textTransform: 'capitalize'

        },
        '& .profile-text': {
            marginLeft: '20px',
            fontWeight: 'lighter',
            fontSize: '21px'
        },
        '& .profile-image-grid': {
            '& .user-image': {
                width: '80%',
                paddingBottom: '5px',
                marginLeft: '20px'
            },
            '& .changePhoto-span': {
                fontSize: '12px',
                marginLeft: '21px',
                '& .link-color': {
                    color: primary
                }
            }
        },
        '& .profile-credential-grid': {
            marginTop: '-20px',
            '& .form-group': {
                flexDirection: 'row',
                marginTop: '10px',
                display: 'block',
                '& .label': {
                    width: '10%',
                    display: 'inline-block',
                    textAlign: 'left',
                    fontSize: '15px',
                    marginTop: '15px',
                    marginLeft: '25px',
                    color: primary,
                    paddingRight: '10px'
                },
                '& .input-field': {
                    width: 'calc(45% - 20px)',
                    margin: '0px 10px',
                    display: 'inline-block',
                    border: 'thin solid ' + greyLight,
                    padding: '10px',
                    '&::before': {
                        backgroundColor: 'transparent'
                    }
                },
                '& .validation-message': {
                    width: '35%',
                    marginLeft: '21px',
                    display: 'inline-block',
                    fontSize: '15px',
                    marginTop: '15px',
                    color: greyDark,
                }
            },
        },
        '& .update-button-grid': {
            padding: '20px',
            '& .update-button': {
                borderRadius: "5px",
                padding: '5px',
                minHeight: '25px',
                width: '150px',
                fontSize: '16px'
            }
        }

    }
}






