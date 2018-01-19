import palette from './palette';

const greyDark = palette.greyDark;
const grey = grey;
const white = palette.white;

export default {
  proposalDetailRoot: {
    background:'white',
    height:"100vh",
    paddingTop:"10px",
    boxShadow: "0px 3px 3px 3px " + grey,
  },
  proposalDetails: {
    height: "calc(100% - 70px)",
    overflowY: "scroll",
    margin: 0,
    marginLeft: 15,
    paddingTop: 70,
    paddingLeft: "0.4%",
    maxWidth: "98%",
  },
};
