import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import swal from "sweetalert2";
import IconInput from "../../global/IconInput";

const schema = yup.object().shape({
  prepareAddress: yup
    .string()
    // .test(
    //   'test-sys-address',
    //   'Must be a valid Syscoin address',
    //   async (value) => await WAValidator.validate(value, 'sys')
    // )
    .required("The address is required"),
  messageSign: yup.string().required("The message is required"),
});

const MasternodePrepared = ({ onNext, onCancel, prepareCommand }) => {
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
          name="prepareCommand"
          id="prepareCommand"
          rows="5"
          disabled
          value={prepareCommand}
        ></textarea>
        <small>
          <p style={{ lineHeight: "1.5" }}>
            Prepare command is ready to be copied. Please copy and paste it into
            Syscoin Q.T console to obtain the collateral address and sign
            message, save the tx as you will use it to create the submit command.
          </p>
        </small>
      </div>

      <div className="form-actions-spaced">
        <CopyToClipboard text={prepareCommand} onCopy={copyButton}>
          <button className="btn btn-outline-primary" type="button">
            Copy
          </button>
        </CopyToClipboard>
      </div>

      <form className="input-form" onSubmit={handleSubmit(onNext)}>
        <div className="form-group">
          <label htmlFor="prepareAddress">Collateral address</label>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              id="prepareAddress"
              ref={register}
              name="prepareAddress"
              className="styled"
            />
            <IconInput dataId="prepareAddress">
              <p>The syscoin address to use for the private key.</p>
            </IconInput>
          </div>
          <ErrorMessage
            errors={errors}
            name="prepareAddress"
            render={({ message }) => (
              <small>
                <p style={{ lineHeight: "1.5" }}>{message}</p>
              </small>
            )}
          />
        </div>

        <div className="form-group">
          <label htmlFor="messageSign">Sign message</label>
          <div style={{ position: "relative" }}>
            <textarea
              className="styled"
              style={{ resize: "vertical" }}
              ref={register}
              rows="5"
              name="messageSign"
              id="messageSign"
              placeholder={'Paste only the signMessage property from the output obtained from your protx_register_prepare command here, excluding ("")'}
            ></textarea>
            {/*do not omit the quotes ("")*/}
            <IconInput dataId="messageSign" marginRight={true}>
              <p>
                The message to sign.
              </p>
            </IconInput>
          </div>
          <ErrorMessage
            errors={errors}
            name="messageSign"
            render={({ message }) => (
              <small>
                <p style={{ lineHeight: "1.5" }}>{message}</p>
              </small>
            )}
          />
        </div>
        <div className="form-actions-spaced">
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={onCancel}
          >
            Back
          </button>
          <button className="btn btn--blue" type="submit">
            Next
          </button>
        </div>
      </form>
    </>
  );
};

export default MasternodePrepared;
