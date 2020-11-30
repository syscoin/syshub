import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  txId: yup.string()
    .matches(/-0|-1/, 'Tx Id must end with -0 or -1')
    .required('tx id is required'),
  privateKey: yup.string().required('private key is required')
});
const schema2 = yup.object().shape({
  masternodeConf: yup.string().required('Masternode.conf is a required field')
});

export default function AddMNForm({onSingleCreation, onMultipleCreation, submitting}) {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  });
  const { register: register2, handleSubmit: handleSubmit2, errors: errors2 } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema2)
  });
  const [showSingle, setShowSingle] = useState(true);
  const [showMulti, setShowMulti] = useState(false);

  function toggleMulti() {
    if (showSingle) toggleSingle();
    setShowMulti(!showMulti);
  }
  function toggleSingle() {
    if (showMulti) toggleMulti();
    setShowSingle(!showSingle);
  }

  return (
    <div className="input-form">
      <div className="form-group">
        <form onSubmit={handleSubmit(onSingleCreation)}>
          <div className="wizard-head" style={{cursor:'pointer'}} onClick={toggleSingle}><span>&nbsp;</span>One Masternode</div>
          <div className={`wizard-body ${showSingle ? '' : 'collapsed'}`}>
              
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" ref={register} className="styled" id="name" required />
                <ErrorMessage
                  errors={errors}
                  name="name"
                  render={({ message }) => <small><p style={{lineHeight:'1.5'}}>{message}</p></small>}
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="privateKey">Private key</label>
                <input type="text" name="privateKey" ref={register} className="styled" id="privateKey" required />
                <ErrorMessage
                  errors={errors}
                  name="privateKey"
                  render={({ message }) => <small><p style={{lineHeight:'1.5'}}>{message}</p></small>}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="txId">Tx id</label>
                <input type="text" name="txId" ref={register} className="styled" id="txId" required />
                <ErrorMessage
                  errors={errors}
                  name="txId"
                  render={({ message }) => <small><p style={{lineHeight:'1.5'}}>{message}</p></small>}
                />
              </div>
                
              

              <div className="form-actions-spaced">
                <button className="btn btn--blue" disabled={submitting}>Save</button>
              </div>
              
          </div>
        </form>
        <form onSubmit={handleSubmit2(onMultipleCreation)}>
          <div className="wizard-head" style={{cursor:'pointer'}} onClick={toggleMulti}><span>&nbsp;</span>Multiple Masternodes</div>
          <div className={`wizard-body ${showMulti ? '' : 'collapsed'}`}>
            <div className="form-group">
                <div className="form-group">
                  <label htmlFor="masternodeConf">Masternode.conf</label>
                  <textarea className="styled" ref={register2} rows="5" name="masternodeConf" id="masternodeConf" placeholder="Paste your masternode.conf here"></textarea>
                  <ErrorMessage
                    errors={errors2}
                    name="masternodeConf"
                    render={({ message }) => <small><p style={{lineHeight:'1.5'}}>{message}</p></small>}
                  />
                </div>

                <div className="form-actions-spaced">
                  <button className="btn btn--blue" disabled={submitting}>Save</button>
                </div>
                
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
