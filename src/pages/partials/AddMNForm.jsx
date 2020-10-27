import React, { useState } from 'react';
import { useForm } from "react-hook-form";


export default function AddMNForm({onSingleCreation, onMultipleCreation, submitting}) {
  const { register, handleSubmit, errors } = useForm();
  const { register: register2, handleSubmit: handleSubmit2, errors: errors2 } = useForm();
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

  function submitOne(data) {
    console.log(data);
  }
  function submitMulti(data) {
    console.log(data);
  }


  return (
    <div className="input-form">
      <div className="form-group">
        <form onSubmit={handleSubmit(onSingleCreation)}>
          <div className="wizard-head" style={{cursor:'pointer'}} onClick={toggleSingle}><span>&nbsp;</span>One Masternode</div>
          <div className={`wizard-body ${showSingle ? '' : 'collapsed'}`}>
              
              <div className="form-group">
                <label htmlFor="">Name</label>
                <input type="text" name="name" ref={register} className="styled" id="" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="">Tx id</label>
                <input type="text" name="txId" ref={register} className="styled" id="" required />
              </div>
                
              <div className="form-group">
                <label htmlFor="">Private key</label>
                <input type="text" name="privateKey" ref={register} className="styled" id="" required />
              </div>

              <div className="form-actions-spaced">
                <button className="btn btn--blue" >Save</button>
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
                </div>

                <div className="form-actions-spaced">
                  <button className="btn btn--blue" >Save</button>
                </div>
                
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
