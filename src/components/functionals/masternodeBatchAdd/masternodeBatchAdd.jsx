import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Button, Grid, FormGroup, TextField } from '@material-ui/core';
import swal from 'sweetalert';

// import style
import injectSheet from 'react-jss';
import masternodeBatchAddStyle from './masternodeBatchAdd.style';

// Component definition
class MasternodeBatchAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newNodes: [],
      helperText:'',
      textFieldValue:''
    };

    this.addNodes = this.addNodes.bind(this);
    this.checkMNode = this.checkMNode.bind(this);
  }

  checkMNode(mNode) {
    if (RegExp(/-0|-1/).test(mNode.txid) !== true) {
      swal({
        title: 'Oops...',
        text: 'Please make sure to add "-0" or "-1" to the end of your txid.',
        icon: 'error'
      });
      return;
    }
    if (mNode.name && mNode.mnPrivateKey) { return true };
    return false
  }

  addNodes(event) {
    event.preventDefault();
    this.props.addNodes(this.state.newNodes);
    this.setState({textFieldValue: ''});
  }

  parseLines(lines) {
    const MNArray = [];
    const commentsRemoved = lines.filter(line => line[0]!=="#");
    commentsRemoved.map(line => {
      const LineArray = line.split(" ");
      if (LineArray.length === 5) {
        const newMNodeDef = {
          name: LineArray[0],
          mnPrivateKey: LineArray[2],
          txid: `${LineArray[3]}-${LineArray[4]}`
        }
      if (this.checkMNode(newMNodeDef)) {MNArray.push(newMNodeDef)}
      }
      return true;
    });
    return MNArray;
  }

  processTextFieldContent(event) {
    const textFieldValue = event.target.value;
    const lines = textFieldValue.split(/\r*\n/);
    const newNodes = this.parseLines(lines);
    const count = newNodes.length;
    this.setState({
      newNodes,
      textFieldValue,
      helperText: `Found ${count} Masternodes`,
    });
  }

  render() {
    const { classes, deviceType } = this.props;
    const { helperText } = this.state;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <div className={style}>
        <Grid item md={12} className="form__container">
          <form
            onSubmit={event => this.addNodes(event)}
            ref={form => {
              this.addNodeForm = form;
            }}
            className="wrapper"
          >
            <Grid item>
              {/* For masternode.conf */}
              <FormGroup className="form-group">
                <TextField
                  id="masternodeFile"
                  label="masternode.conf"
                  multiline
                  rows="15"
                  style={{ margin: 8 }}
                  value={this.state.textFieldValue}
                  placeholder='Paste your "masternode.conf" here'
                  helperText={helperText}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event)=>this.processTextFieldContent(event)}
                />
              </FormGroup>

              {/* Form Action Button */}
              <FormGroup className="form-group form-button-group">
                <Button type="submit" color="primary">
                  Add All
                </Button>
              </FormGroup>
            </Grid>
          </form>
        </Grid>
      </div>
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
  injectSheet(masternodeBatchAddStyle)(MasternodeBatchAdd)
);
