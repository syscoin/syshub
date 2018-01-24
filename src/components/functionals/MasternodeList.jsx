import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { Grid, withStyles, FormGroup, Input, } from 'material-ui';


// import style
import { masternodeListStyle } from "./styles";
import { Table, Icon, Divider, Card, Col, Row, Modal, Button } from 'antd';



class MasterNodeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editNode: false
    }
    this.showEditModal = this.showEditModal.bind(this)
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }


  showEditModal() {
    this.setState({
      editNode: true,
    });

  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      editNode: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      editNode: false,
    });
  }



  render() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <span>{text}</span>,
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }, {
      key: 'action',
      render: (text, record) => (
        <span>
          <Button className="edit-btn" onClick={this.showEditModal}>
            Edit
          </Button>
          <Button className="delete-btn">
            Delete
          </Button>
        </span>
      ),
    }];

    const data = [{
      key: '1',
      name: 'Mnode1',
      address: '12.12.322.11.12123',
    }, {
      key: '2',
      name: 'Mnode2',
      address: '11.21.112.22.12345',
    }, {
      key: '3',
      name: 'Mnode3',
      address: '13.21.332.52.55642',
    }, {
      key: '4',
      name: 'Mnode4',
      address: '22.44.132.12.00987',
    }];

    const { classes } = this.props;

    return (
      <div>
        {/* Edit Modal */}
        <Modal
          title="Edit Modal"
          visible={this.state.editNode}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          className={classes.modal}
          footer={[
            <Button key="submit" type="primary" onClick={this.handleOk}>Confirm & Save</Button>,
            <Button key="back" onClick={this.handleCancel}>
              Close
            </Button>,
          ]}
        >
          <Grid item md={12} className="form__container">
            <form
              onSubmit={event => this.addNode(event)}
              ref={form => {
                this.addNodeForm = form;
              }}
              className="wrapper"
            >
              <Grid item lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }} justify="center">
                {/* For User Name */}
                <FormGroup className="form-group">
                  <span htmlFor="user-name" className="label">
                    {`Masternode Name: `}
                  </span>
                  <input
                    ref={name => (this.nodeName = name)}
                    id="name"
                    className="input-field"
                    placeholder="e.g Mnode1"
                  />
                </FormGroup>

                {/* For Password */}
                <FormGroup className="form-group">
                  <span htmlFor="password" className="label">
                    {`Masternode 1000 SYS coin Address: `}
                  </span>
                  <input
                    ref={address => (this.nodeAddress = address)}
                    id="address"
                    className="input-field"
                    placeholder="123.45.67.891.12345"
                  />
                </FormGroup>
              </Grid>
            </form>
          </Grid>

        </Modal>
        <div className={classes.root}>

          <div className="heading">
            <h2 className="title">
              Masternode List
        </h2>
          </div>
          <div className="node-list-table">
            <Table columns={columns} dataSource={data} />
          </div>

        </div>
      </div>
    )
  }
}






const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(withStyles(masternodeListStyle)(MasterNodeList));
