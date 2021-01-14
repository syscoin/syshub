import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import WAValidator from '@swyftx/api-crypto-address-validator/dist/wallet-address-validator.min.js';


const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  address: yup.string()
    .test(
      'test-sys-address',
      'Must be a valid Syscoin address',
      async (value) => await WAValidator.validate(value, 'sys')
    )
    .required('Voting address is required'),
  txId: yup.string()
    .matches(/-0|-1/, 'Tx Id must end with -0 or -1')
    .required('tx id is required'),
  privateKey: yup.string().required('private key is required')
});

/**
 * Component to show a the data of a single address inside a form
 * @component
 * @subcategory Profile
 * @param {*} onEdit callback to edit the address 
 * @param {*} onRemove callback to remove the address 
 * @param {Object} address address info to show
 * @param {number} index index of the address on the array
 * @example
 * const onEdit = () => {}
 * const onRemove = () => {}
 * const address = {}
 * const index = 0
 * return (
 *  <UserAddress onEdit={onEdit} onRemove={onRemove} address={address} index={index} />
 * )
 */
function UserAddress({ onEdit, onRemove, address, index }) {
  const [editting, setEditting] = useState(false);
  const [show, setShow] = useState(false);

  const { register, handleSubmit, errors, reset: resetForm } = useForm({
    defaultValues: {
      name: address.name,
      address: address.address,
      txId: address.txId,
      privateKey: address.privateKey
    },
    resolver: yupResolver(schema)
  });

  /**
   * function to submit the form data
   * @function
   * @param {Object} data data from the input to edit the address
   */
  function formSubmit(data) {
    onEdit(address.uid, data);
    toggleEdition();
  }

  /**
   * function to cancel the edition of the address
   * @function
   */
  function cancelEdition() {
    toggleEdition();
    resetForm();
  }

  /**
   * function to toggle the edition
   * @function
   */
  function toggleEdition() {
    setEditting(!editting);
    if (!show) toggleShow();
  }
  
  /**
   * function to toggle the show inputs
   * @function
   */
  function toggleShow() {
    setShow(!show);
  }

  /**
   * function to remove the address
   * @function
   */
  function removeMN() {
    onRemove(address.uid);
  }

  return (
    <div className="address input-form" >
      <div className="form-group">
        { !editting && <div className="indicator">{address.name}</div> }
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
            <label htmlFor={`address-${index}`}>Voting address</label>
            <input type="text" name="address" ref={register} className="styled" id={`address-${index}`} required disabled={!editting} />
            <ErrorMessage
              errors={errors}
              name="address"
              render={({ message }) => <small><p style={{lineHeight:'1.5'}}>{message}</p></small>}
            />
          </div>
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

export default UserAddress;
