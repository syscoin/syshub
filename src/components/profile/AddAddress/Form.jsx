import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import IconInput from "../../global/IconInput";
import { SingleAddressForm } from "./SingleAddressForm";

const schema2 = yup.object().shape({
  masternodeConf: yup.string().required("Voting addresses are required"),
});

const isMultipleAddressEnabled =
  process.env.MULTIPLE_VOTING_ADDRESS_ENABLED === "true";

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

  return (
    <div className="input-form">
      <div className="form-group">
        {!isMultipleAddressEnabled ? (
          <div className="wizard-body">
            <SingleAddressForm
              onSingleCreation={onSingleCreation}
              isSubmitting={submitting}
            />
          </div>
        ) : (
          <>
            <div
              className="wizard-head"
              style={{ cursor: "pointer" }}
              onClick={toggleSingle}
            >
              <span>&nbsp;</span>Single voting address
            </div>
            <div className={`wizard-body ${showSingle ? "" : "collapsed"}`}>
              <SingleAddressForm
                onSingleCreation={onSingleCreation}
                isSubmitting={submitting}
              />
            </div>
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
                    <label htmlFor="masternodeConf">
                      Voting addresses list from the{" "}
                      <code>"protx_list_wallet 1"</code> command
                    </label>
                    <div style={{ position: "relative" }}>
                      <textarea
                        className="styled"
                        style={{ resize: "vertical" }}
                        ref={register2}
                        rows="5"
                        name="masternodeConf"
                        id="masternodeConf"
                        placeholder="Paste your addresses here"
                      ></textarea>
                      <IconInput dataId="masternodeConf" marginRight={true}>
                        <p>
                          All existing voting addresses, to get them run the{" "}
                          <mark>protx_list_wallet 1</mark> command from your
                          Syscoin-qt.
                        </p>
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
          </>
        )}
      </div>
    </div>
  );
}

export default AddAddressForm;
