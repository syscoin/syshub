import palette from './palette';

const primaryDark = palette.primaryDark;
const primaryLight = palette.primaryLight;
const white = palette.white;


export default {
<<<<<<< HEAD
  root:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
     "& .common" : {
      padding: '0 20px',
      color: white
    },
=======
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        "& .common": {
            padding: 0,
            color: white,
            "& .icon": {
                height: 20,
                margin: '0px 10px'
            }
        },
        "& .TxtBold": {
            color: white,
            fontWeight: 'bold'
        },
        "& .divider ": {
            height: '75%',
            borderLeft: `1px solid ${primaryDark}`,
            borderRight: `1px solid ${primaryLight}`
        }
>>>>>>> e237931d74ddc9d7ccc8ec2b16fe1d1434b4e744

    }
};