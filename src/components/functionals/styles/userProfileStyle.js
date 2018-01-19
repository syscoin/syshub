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
            textTransform: 'capitalize',
            padding: '3px 0px'
        },
        '& .profile-text': {
            margin: '10px 20px 20px 20px',
            fontWeight: 100,
            fontSize: '21px',
            borderBottom: '0.1px solid ' + greyLight,
        },
        '& .profile-image-grid': {
            '& .avatar-container': {
                maxWidth: 150,
                marginLeft: 20,
                padding: 10,
                border: 'thin solid ' + greyLight
            },
            '& .user-image': {
                width: '100%',

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
            marginTop: -10,
            '& .form-group': {
                flexDirection: 'row',
                marginTop: '10px',
                display: 'block',
                '& .label': {
                    width: 75,
                    display: 'inline-block',
                    textAlign: 'left',
                    fontSize: 15,
                    fontWeight: 100,
                    color: primary,
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
                    display: 'inline-block',
                    fontSize: 15,
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






