import React, { useState } from 'react';
import { useForm } from "react-hook-form";


function UserMN({ onEdit, onRemove, masternode, index }) {
  const [editting, setEditting] = useState(false);
  const [show, setShow] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: masternode.name,
      txId: masternode.txId,
      privateKey: masternode.privateKey
    }
  });

  function formSubmit() {
    handleSubmit(onEdit(masternode.uid));
    toggleEdition();
  }

  function toggleEdition() {
    setEditting(!editting);
    if (!show) toggleShow();
  }
  
  function toggleShow() {
    setShow(!show);
  }

  function removeMN() {
    onRemove(masternode.uid);
  }

  return (
    <div className="masternode input-form" >
      <div className="form-group">
        { !editting && <div className="indicator">{masternode.name}</div> }
        <form>
          {editting && (
            <div className="description">
              <label htmlFor={`name-${index}`}>Name</label>
              <input type={'text'} name="name" ref={register} className="styled" id={`name-${index}`} required />
            </div>
          )}
          <div className="description">
            <label htmlFor={`txid-${index}`}>Tx id</label>
            <input type={show ? 'text': 'password'} name="txId" ref={register} className="styled" id={`txid-${index}`} required disabled={!editting} />
          </div>
          <div className="description">
            <label htmlFor={`privkey-${index}`}>Private key</label>
            <input type={show ? 'text': 'password'} name="privateKey" ref={register} className="styled" id={`privkey-${index}`} required disabled={!editting} />
          </div>

          {editting && (
            <div className="form-actions-spaced">
              <button className="btn btn--blue" type="button" onClick={formSubmit}>Save</button>
              <button className="btn btn--blue-border" type="button" onClick={toggleEdition}>Cancel</button>
            </div>
          )}
        </form>

        {!editting && (
          <div className="form-actions-spaced">
            <button className="btn btn--blue" type="button" onClick={toggleShow}>{show ? 'Hide' : 'Show'}</button>
            <button className="btn btn--blue" type="button" onClick={toggleEdition}>Edit</button>
            <button className="btn btn--blue-border" type="button" onClick={removeMN}>Remove</button>
          </div>
        )}
        <div className="form-group spacer line"></div>
      </div>
    </div>
  )
}

export default UserMN
