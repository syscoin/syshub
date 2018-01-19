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
        '& .profile-heading': {
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
            '& .change-photo-btn': {
                fontSize: '12px',
                marginLeft: '38px',
                '& .link-color': {
                    color: primary,
                    fontWeight:'100'
                },
                
            },
            '& .upload-image-container':{
                overflow: 'hidden',
                position: 'relative',
                '& input[type=file]':{
                    cursor: 'inherit',
                    display: 'block',
                    fontSize: 999,
                    filter: 'alpha(opacity=0)',
                    minHeight: '100%',
                    minWidth: '100%',
                    opacity: 0,
                    position: 'absolute',
                    right: 0,
                    textAlign: 'right',
                    top: 0,
                    height: '100%'
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
                    fontWeight:'100'
                }
            },
        },
        '& .update-button-grid': {
            padding: '20px',
        },
        '& button': {
            borderRadius: "5px",
            padding: '5px',
            minHeight: '25px',
            width: '150px',
            fontSize: '16px',
            backgroundColor: primary
        }

    }
}






