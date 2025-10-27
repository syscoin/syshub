import React from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {useForm} from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers';
import * as yup from "yup";
import swal from "sweetalert2";

const schema = yup.object().shape({
  paymentTxId: yup.string()
    .test('len', 'Must be exactly 64 characters', val => val.length === 64)
    .required('Payment txid is required')
});

/**
 * Component to show the prepare proposal step (Step 5)
 * @component
 * @subcategory Proposal
 * @example
 * return (
 *  <PrepareProposal
 *    prepareCommand={prepareCommand}
 *    onSubmit={handlePaymentTxId}
 *    onCancel={handleCancel}
 *  />
 * )
 */
function PrepareProposal({ prepareCommand, onSubmit, onCancel }) {
  const {register, handleSubmit, errors} = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  });

  /**
   * function that triggers sweet alert to show the copy is successful
   * @function
   */
  const copyButton = () => {
    swal.fire({
      icon: "success",
      title: "Copied",
      timer: 2000,
      showConfirmButton: false,
    });
  }

  return (
    <div>
      <div className="form-group article">
        <div className="cli-command-container">
          <textarea
            className="styled"
            name="prepareCommand"
            id="prepareCommand"
            rows="5"
            disabled
            value={prepareCommand}
          ></textarea>
          <CopyToClipboard
            text={prepareCommand}
            onCopy={copyButton}
          >
            <button className="copy-icon" type="button" title="Copy command">📋</button>
          </CopyToClipboard>
        </div>
        <small>
          <p style={{lineHeight: "1.5"}}>
            Prepare command is ready to be copied. Please copy and paste it into Syscoin Q.T console for payment txid.
          </p>
        </small>
      </div>

      <div className="form-actions-spaced">
        <CopyToClipboard
          text={prepareCommand}
          onCopy={copyButton}
        >
          <button className="btn btn--blue" type="button">Copy Command</button>
        </CopyToClipboard>
      </div>

      <form className="input-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="paymentTxId">Payment txid</label>
          <input type="text" id="paymentTxId" ref={register} name="paymentTxId" className="styled" maxLength="64"/>
          <ErrorMessage
            errors={errors}
            name="paymentTxId"
            render={({message}) => <small><p style={{lineHeight: '1.5'}}>{message}</p></small>}
          />
        </div>
        <div className="form-actions-spaced">
          <button className="btn btn-outline-primary" type="button" onClick={onCancel}>Cancel</button>
          <button className="btn btn--blue" type="submit">Next</button>
        </div>
      </form>
    </div>
  );
}

export default PrepareProposal;
