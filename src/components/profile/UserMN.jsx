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

function UserMN({ onEdit, onRemove, masternode, index }) {
  const [editting, setEditting] = useState(false);
  const [show, setShow] = useState(false);

  const { register, handleSubmit, errors, reset: resetForm } = useForm({
    defaultValues: {
      name: masternode.name,
      txId: masternode.txId,
      privateKey: masternode.privateKey
    },
    resolver: yupResolver(schema)
  });

  function formSubmit(data) {
    onEdit(masternode.uid, data);
    toggleEdition();
  }
  function cancelEdition() {
    toggleEdition();
    resetForm();
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
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => <small><p style={{lineHeight:'1.5'}}>{message}</p></small>}
              />
            </div>
          )}
          <div className="description">
            <label htmlFor={`privkey-${index}`}>Private key</label>
            <input type={show ? 'text': 'password'} name="privateKey" ref={register} className="styled" id={`privkey-${index}`} required disabled={!editting} />
            <ErrorMessage
              errors={errors}
              name="privateKey"
              render={({ message }) => <small><p style={{lineHeight:'1.5'}}>{message}</p></small>}
            />
          </div>

          <div className="description">
            <label htmlFor={`txid-${index}`}>Tx id</label>
            <input type={show ? 'text': 'password'} name="txId" ref={register} className="styled" id={`txid-${index}`} required disabled={!editting} />
            <ErrorMessage
              errors={errors}
              name="txId"
              render={({ message }) => <small><p style={{lineHeight:'1.5'}}>{message}</p></small>}
            />
          </div>
        
          {editting && (
            <div className="form-actions-spaced">
              <button className="btn btn--blue" type="button" onClick={handleSubmit(formSubmit)}>Save</button>
              <button className="btn btn--blue-border" type="button" onClick={cancelEdition}>Cancel</button>
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
