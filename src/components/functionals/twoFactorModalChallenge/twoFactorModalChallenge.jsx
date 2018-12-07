import React, { Component } from 'react';
import { connect } from 'react-redux';

// import Material-ui components
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';



// Import Material-ui Icons
import DoneAll from '@material-ui/icons/DoneAll';
import Close from '@material-ui/icons/Close';

// Import style pages
import injectSheet from 'react-jss';
import twoFactorModalChallengeStyle from './twoFactorModalChallenge.style';

const Transition = (props) => {
  return <Slide direction="up" {...props} />;
}

class TwoFactorModalChallenge extends Component {
  state = {
    showModal: true
    };

  componentWillMount() {}
  
  componentDidMount() {}

  modalDidMount() {}

  handleHideModal() {
    this.setState({
      showModal: false
    });
  }


  render() {
    const { classes, deviceType } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;
    
    return (
      <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          disableBackdropClick
          open={this.state.showModal}
          onClose={() => this.handleHideModal()}
          onRendered={() => this.modalDidMount()}
        >
          <div className={style}>
            <div className="modalHeaderWrapper">
              <IconButton aria-label="Close" className="closeBtn" onClick={() => this.handleHideModal()}>
                <Close fontSize="large"/>
              </IconButton>
              <h1>Two-Factor Authentication</h1>
              <p>You have enabled Two-Factor Authentication for your account,<br/> Follow the instruction to complete setup</p>
            </div>
            <div className="modalBodyWrapper">
            </div>
          </div>
        </Modal> 
    );
  }
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(
  injectSheet(twoFactorModalChallengeStyle)(TwoFactorModalChallenge)
);
