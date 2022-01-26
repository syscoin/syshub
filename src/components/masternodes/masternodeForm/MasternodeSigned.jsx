import React from "react";
import WAValidator from "@swyftx/api-crypto-address-validator/dist/wallet-address-validator.min.js";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import swal from "sweetalert2";
import IconInput from "../../global/IconInput";

const schema = yup.object().shape({
  tx: yup
    .string()
    .required("The tx is required"),
  signature: yup.string().required("The signature is required")
});

const MasternodeSigned = ({ onNext, onCancel, signCommand }) => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      operatorReward: 0,
    },
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
  };

  return (
    <>
      <div className="form-group article">
        <textarea
          className="styled"
          name="signCommand"
          id="signCommand"
          rows="5"
          disabled
          value={signCommand}
        ></textarea>
        <small>
          <p style={{ lineHeight: "1.5" }}>
            Sign command is ready to be copied. Please copy and paste it into
            Syscoin Q.T console to obtain the signature.
          </p>
        </small>
      </div>

      <div className="form-actions-spaced">
        <CopyToClipboard text={signCommand} onCopy={copyButton}>
          <button className="btn btn--blue-border" type="button">
            Copy
          </button>
        </CopyToClipboard>
      </div>

      <form className="input-form" onSubmit={handleSubmit(onNext)}>
      <div className="form-group">
          <label htmlFor="tx">Tx</label>
          <div style={{ position: "relative" }}>
            <textarea
              className="styled"
              style={{ resize: "vertical" }}
              ref={register}
              rows="5"
              name="tx"
              id="tx"
              placeholder='Paste only the tx property from the output obtained from your protx_register_prepare command here, excluding ("")'
            ></textarea>
            <IconInput dataId="tx" marginRight={true}>
              <p style={{ lineHeight: "1.5" }}>
                The serialized transaction previously returned in the tx output field from the "protx_register_prepare" command.
              </p>
            </IconInput>
          </div>
          <ErrorMessage
            errors={errors}
            name="tx"
            render={({ message }) => (
              <small>
                <p style={{ lineHeight: "1.5" }}>{message}</p>
              </small>
            )}
          />
        </div>

        <div className="form-group">
          <label htmlFor="signature">Signature</label>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              id="signature"
              ref={register}
              name="signature"
              className="styled"
            />
            <IconInput dataId="signature">
              <p>The signature signed with the collateral key. Must be in base64 format.</p>
            </IconInput>
          </div>
          <ErrorMessage
            errors={errors}
            name="signature"
            render={({ message }) => (
              <small>
                <p style={{ lineHeight: "1.5" }}>{message}</p>
              </small>
            )}
          />
        </div>

        
        <div className="form-actions-spaced">
          <button
            className="btn btn--blue-border"
            type="button"
            onClick={onCancel}
          >
            Back
          </button>
          <button className="btn btn--blue" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default MasternodeSigned;
