import palette from './palette';

const primary = palette.primary;
const primaryLight = palette.primaryLight
const white = palette.white;
const grey = palette.grey;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;
const secondary = palette.secondary;

export default {
    root: {
        marginTop: '20px',
        '& StepLabel':{
            color:'red'
        },
        '& .title': {
            fontWeight: 'lighter',
            color: greyDark,
            fontSize: 20
        },
        '& .paper-container': {
            padding: '20px 20px',
            '& .proposal-title': {
                fontWeight: 100,
                fontSize: '22px',
                color: primaryLight,
                display: 'inline-block'
            },
            '& .proposalHeading-dot': {
                backgroundColor: primary,
                borderRadius: '10px',
                height: '20px',
                width: '20px',
                display: 'inline-block',
                marginRight: "15px"
            },
            '& .proposal-title-row': {
                '& .form-item': {
                    marginLeft: '30px',
                    '& Input': {
                        width: '85%',
                        height: '40px'
                    }
                },
                '& .proposal-description-url': {
                    display: 'block',
                    marginLeft: '25px',
                    color: grey
                },
                '& .nextStep-button-div': {
                    textAlign: 'center',
                    margin: '40px 0px 0px 0px',
                    '& Button': {
                        borderRadius: '7px',
                        height: '35px'
                    },
                    '& button span': {
                        textTransform: 'capitalize',
                        padding: '3px 0px',
                        fontSize: '18px'
                    },
                }
            },
            '& .proposal-details-row': {
                '& .preview-edit-button': {
                    marginLeft: '20px',
                    height: '30px',
                    borderRadius: '8px'
                },
                '& .editor-title': {
                    position: 'absolute',
                    marginLeft: 60,
                    fontSize: 18,
                    marginTop: 30,
                    fontWeight: 'bold',
                    color: greyDark
                },
                '& .proposal-editor': {

                    padding: '15px',
                    marginTop: '10px',
                    backgroundColor: white,
                    height: 100

                },
                '& .proposalEditor-wrapper': {
                    marginLeft: '40px',
                    backgroundColor: greyLight,
                    marginTop: 20,
                    boxShadow: 'rgba(0, 0, 0, 0.20) 0px 5px 20px',
                    height: 200
                },
                '& .toolbarClassName': {
                    visibility: 'visible',
                    width: 300,
                    marginLeft: 'calc(100% - 300px)',
                    display: 'inline-flex',
                    backgroundColor: greyLight

                },
                '& .confirm-button': {
                    marginLeft: 'calc(100% - 105px)',
                    marginTop: -45,
                    position: 'absolute',
                    borderRadius: 6,
                    backgroundColor: grey,

                },
                '& .confirm-button span': {
                    color: white
                }
            }
        },

    }
}

