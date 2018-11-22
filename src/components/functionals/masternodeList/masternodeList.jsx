import React, { Component } from 'react';

import { connect } from 'react-redux';
import { FormGroup } from '@material-ui/core';
import Cryptr from 'cryptr';

// import style
import injectSheet from 'react-jss';
import masternodeListStyle from './masternodeList.style';
import { Table, Modal, Button } from 'antd';
const confirm = Modal.confirm;

class MasterNodeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editNode: false,
      editNodeRecord: {
        name: '',
        mnPrivateKey: ''
      }
    };
    this.editNode = {};
    this.showEditModal = this.showEditModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.showDeleteConfirm = this.showDeleteConfirm.bind(this);
    this.deleteMasterNode = this.deleteMasterNode.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  showEditModal(record) {
    const cryptr = new Cryptr(this.props.app.currentUser.uid);

    this.editNode = record;
    this.setState({
      editNodeModal: true,
      editNodeRecord: {
        name: record.name,
        mnPrivateKey: cryptr.decrypt(record.mnPrivateKey),
        key: record.key,
        txid: cryptr.decrypt(record.txid),
        keyId: record.keyId
      }
    });
  }

  handleOk(e) {
    this.props.editNode(this.state.editNodeRecord);
    this.setState({
      editNodeModal: false
    });
  }

  handleCancel(e) {
    this.setState({
      editNodeRecord: {
        name: '',
        mnPrivateKey: ''
      },
      editNodeModal: false
    });
  }

  deleteMasterNode(node) {
    this.props.deleteNode(node);
  }

  showDeleteConfirm(node) {
    let confrimDelete = () => {
      this.deleteMasterNode(node);
    };
    confirm({
      title: 'Are you sure delete this Masternode?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      zIndex: 99999,
      onOk() {
        confrimDelete();
      },
      onCancel() { }
    });
  }

  onChange(e) {
    this.setState({
      editNodeRecord: {
        ...this.state.editNodeRecord,
        [e.target.name]: e.target.value.replace(/\s/g, '').trim()
      }
    });
  }

  render() {
    const { classes, deviceType, app } = this.props;

    const cryptr = new Cryptr(app.currentUser.uid);

    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;
    const modalStyle = deviceType === 'mobile' ? classes.mModal : classes.modal;

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <span>{text}</span>
      },
      {
        title: 'MN Private Key',
        dataIndex: 'mnPrivateKey',
        key: 'mnPrivateKey',
        render: text => (
          <span>
            {deviceType === 'mobile'
              ? cryptr.decrypt(text).substring(0, 7) + '...'
              : cryptr.decrypt(text)}
          </span>
        )
      },
      {
        key: 'action',
        render: (text, record) => (
          <span>
            <Button className="edit-btn" onClick={() => this.showEditModal(record)}>
              Edit
            </Button>
            <Button className="delete-btn" onClick={() => this.showDeleteConfirm(record)}>
              Delete
            </Button>
          </span>
        )
      }
    ];

    return (
      <div>
        {/* Edit Modal */}
        <Modal
          title="Edit Masternode"
          visible={this.state.editNodeModal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          className={modalStyle}
          footer={[
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Confirm & Save
            </Button>,
            <Button key="back" onClick={this.handleCancel}>
              Close
            </Button>
          ]}
          zIndex={99999}
        >
          <div item md={12} className="form__container">
            <form
              onSubmit={event => this.addNode(event)}
              ref={form => {
                this.addNodeForm = form;
              }}
              className="wrapper"
            >
              <div>
                {/* For User Name */}
                <FormGroup className="form-group">
                  <span htmlFor="user-name" className="label">
                    {`Masternode Name: `}
                  </span>
                  <input
                    ref={name => (this.nodeName = name)}
                    id="name"
                    name="name"
                    className="input-field"
                    placeholder="e.g Mnode1"
                    value={this.state.editNodeRecord.name}
                    onChange={this.onChange}
                  />
                </FormGroup>

                {/* For Password */}
                <FormGroup className="form-group">
                  <span htmlFor="password" className="label">
                    {`MN Private Key: `}
                  </span>
                  <input
                    ref={mnPrivateKey => (this.nodemnPrivateKey = mnPrivateKey)}
                    id="mnPrivateKey"
                    name="mnPrivateKey"
                    className="input-field"
                    placeholder="123.45.67.891.12345"
                    value={this.state.editNodeRecord.mnPrivateKey}
                    onChange={this.onChange}
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <span htmlFor="password" className="label">
                    {`MN TXID: `}
                  </span>
                  <input
                    ref={txid => (this.nodeVin = txid)}
                    id="txid"
                    name="txid"
                    className="input-field"
                    placeholder="123.45.67.891.12345"
                    value={this.state.editNodeRecord.txid}
                    onChange={this.onChange}
                  />
                </FormGroup>
              </div>
            </form>
          </div>
        </Modal>
        <div className={style}>
          <div className="heading">
            <h2 className="list-title">Masternode List</h2>
          </div>
          <div className="node-list-table">
            {this.props.nodes.length > 0 ? (
              <Table
                pagination={{
                  pageSize: 4,
                  hideOnSinglePage: true,
                  size: 'small'
                }}
                columns={columns}
                dataSource={this.props.nodes}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    app: state.app
  };
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(
  injectSheet(masternodeListStyle)(MasterNodeList)
);
