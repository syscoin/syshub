import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import WAValidator from "@swyftx/api-crypto-address-validator/dist/wallet-address-validator.min.js";
import IconInput from "../global/IconInput";

const schema = yup.object().shape({
  name: yup.string().required("Label is required"),
  address: yup
    .string()
    // .test(
    //   "test-sys-address",
    //   "Must be a valid Syscoin address",
    //   async (value) => await WAValidator.validate(value, "sys")
    // )
    .required("Voting address is required"),
  txId: yup
    .string()
    .matches(/-0|-1/, "Tx Id must end with -0 or -1")
    .required("Tx id is required"),
  privateKey: yup.string().required("Private key is required"),
});
const schema2 = yup.object().shape({
  masternodeConf: yup.string().required("Masternode.conf is a required field"),
});

/**
 * Component to show the add voting address form
 * @component
 * @subcategory Profile
 * @param {*} onSingleCreation function executed when single creation of v.a.
 * @param {*} onMultipleCreation function executed when multiple creation of v.a.
 * @param {boolean} submitting flag if the data is submitting
 * @example
 * const onSingleCreation = () => {}
 * const onMultipleCreation = () => {}
 * const submitting = false
 * return (
 *  <AddAddressForm onSingleCreation={onSingleCreation} onMultipleCreation={onMultipleCreation} submitting={submitting} />
 * )
 */
function AddAddressForm({ onSingleCreation, onMultipleCreation, submitting }) {
  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    errors: errors2,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema2),
  });
  const [showSingle, setShowSingle] = useState(true);
  const [showMulti, setShowMulti] = useState(false);

  /**
   * function that toggles the multiple add masternodes
   * @function
   */
  function toggleMulti() {
    if (showSingle) toggleSingle();
    setShowMulti(!showMulti);
  }

  /**
   * function that toggles the single add masternodes
   * @function
   */
  function toggleSingle() {
    if (showMulti) toggleMulti();
    setShowSingle(!showSingle);
  }

  const singleAdd = async (data) => {
    const isAdded = await onSingleCreation(data);
    if (isAdded) reset();
  };

  return (
    <div className="input-form">
      <div className="form-group">
        <form onSubmit={handleSubmit(singleAdd)}>
          <div
            className="wizard-head"
            style={{ cursor: "pointer" }}
            onClick={toggleSingle}
          >
            <span>&nbsp;</span>Single voting address
          </div>
          <div className={`wizard-body ${showSingle ? "" : "collapsed"}`}>
            <div className="form-group">
              <label htmlFor="name">Label</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  name="name"
                  ref={register}
                  className="styled"
                  id="name"
                />
                <IconInput dataId="name">
                  <p>Label to differentiate from other voting address at the moment of vote</p>
                </IconInput>
              </div>
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => (
                  <small>
                    <p style={{ lineHeight: "1.5" }}>{message}</p>
                  </small>
                )}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Voting address</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  name="address"
                  ref={register}
                  className="styled"
                  id="address"
                />
                <IconInput dataId="address">
                  <p>The same voting address that you used in your protx_register</p>
                </IconInput>
              </div>
              <ErrorMessage
                errors={errors}
                name="address"
                render={({ message }) => (
                  <small>
                    <p style={{ lineHeight: "1.5" }}>{message}</p>
                  </small>
                )}
              />
            </div>

            <div className="form-group">
              <label htmlFor="privateKey">Voting key</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  name="privateKey"
                  ref={register}
                  className="styled"
                  id="privateKey"
                />
                <IconInput dataId="privateKey">
                  <p>The private key of the voting address</p>
                </IconInput>
              </div>
              <ErrorMessage
                errors={errors}
                name="privateKey"
                render={({ message }) => (
                  <small>
                    <p style={{ lineHeight: "1.5" }}>{message}</p>
                  </small>
                )}
              />
            </div>

            <div className="form-group">
              <label htmlFor="txId">Tx id</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  name="txId"
                  ref={register}
                  className="styled"
                  id="txId"
                />
                <IconInput dataId="txId">
                  <p>The collateral hash and collateral index of your masternode</p>
                </IconInput>
              </div>
              <ErrorMessage
                errors={errors}
                name="txId"
                render={({ message }) => (
                  <small>
                    <p style={{ lineHeight: "1.5" }}>{message}</p>
                  </small>
                )}
              />
            </div>

            <div className="form-actions-spaced">
              <button className="btn btn--blue" disabled={submitting}>
                Add
              </button>
            </div>
          </div>
        </form>
        <form onSubmit={handleSubmit2(onMultipleCreation)}>
          <div
            className="wizard-head"
            style={{ cursor: "pointer" }}
            onClick={toggleMulti}
          >
            <span>&nbsp;</span>Many voting addresses
          </div>
          <div className={`wizard-body ${showMulti ? "" : "collapsed"}`}>
            <div className="form-group">
              <div className="form-group">
                <label htmlFor="masternodeConf">Voting addresses</label>
                <div style={{ position: 'relative' }}>
                  <textarea
                    className="styled"
                    style={{resize: 'vertical'}}
                    ref={register2}
                    rows="5"
                    name="masternodeConf"
                    id="masternodeConf"
                    placeholder="Paste your addresses here"
                  ></textarea>
                  <IconInput dataId="masternodeConf" marginRight={true}>
                    <p>lalalala</p>
                  </IconInput>
                </div>
                
                <ErrorMessage
                  errors={errors2}
                  name="masternodeConf"
                  render={({ message }) => (
                    <small>
                      <p style={{ lineHeight: "1.5" }}>{message}</p>
                    </small>
                  )}
                />
              </div>

              <div className="form-actions-spaced">
                <button className="btn btn--blue" disabled={submitting}>
                  Add
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAddressForm;
