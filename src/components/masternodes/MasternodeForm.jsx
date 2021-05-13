import React, { useState } from "react";
import swal from "sweetalert2";
import { CopyToClipboard } from "react-copy-to-clipboard";

import MasternodeDetails from "./masternodeForm/MasternodeDetails";
import MasternodePrepared from "./masternodeForm/MasternodePrepared";
import MasternodeSigned from "./masternodeForm/MasternodeSigned";

/**
 * component for creating help commands for registering a masternode
 * @component
 * @subcategory Proposal
 * @example
 * return (
 *  <MasternodeForm />
 * )
 */
function MasternodeForm() {
  //COMPONENT STATES
  const [currentStep, setCurrentStep] = useState(0);

  //masternodes STATES
  const [prepareCommand, setPrepareCommand] = useState("");
  const [signCommand, setSignCommand] = useState("");
  const [submitCommand, setSubmitCommand] = useState("");

  /**
   * function generate command protx_register_prepare
   * @function
   */
  const generatePrepareCommand = (
    collateralHash,
    collateralIndex,
    ipAddress,
    ownerKeyAddr,
    operatorPubKey,
    votingKeyAddr,
    operatorReward,
    payoutAddress,
    feeSourceAddress
  ) => {
    return `protx_register_prepare ${collateralHash} ${collateralIndex} ${ipAddress}:8369 ${ownerKeyAddr} ${operatorPubKey} ${votingKeyAddr} ${operatorReward} ${payoutAddress} ${
      feeSourceAddress || ""
    }`.trim();
  };

  /**
   * function generate command signmessagebech32 || signmessage
   * @function
   */
  const generateSignCommand = (collateralAddress, signMessage) => {
    // check for new addresses to validate
    /* Note: Previously, the differentiation with signmessagebech32 or signmessage was made to take into account the use cases of the addresses to be used,
     in theory the signmessagebech32 command should apply to all
    * */
    return `signmessagebech32 ${collateralAddress} ${signMessage}`.trim();
  };

  /**
   * function generate command protx_register_submit
   * @function
   */
  const generateSubmitCommand = (tx, sig) => {
    return `protx_register_submit ${tx} ${sig}`.trim();
  };

  /**
   * function to set back the step of the form
   * @function
   */
  const back = () => {
    setCurrentStep(currentStep - 1);
  };

  /**
   * function to set next step of the form
   * @function
   */
  const next = () => {
    setCurrentStep(currentStep + 1);
  };

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

  /**
   * function to get and create the prepare command
   * @function
   */
  const getMasternodeDetails = async (data) => {
    swal.fire({
      title: "Creating the prepare command",
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading();
      },
    });

    try {
      await setPrepareCommand(
        generatePrepareCommand(
          data.collateralHash,
          data.collateralIndex,
          data.ipAddress,
          data.ownerAddress,
          data.operatorPubKey,
          data.votingAddress,
          data.operatorReward,
          data.payoutAddress,
          data.fundAddress
        )
      );

      await swal.fire({
        icon: "success",
        title: "The command was created",
        timer: 2000,
        showConfirmButton: false,
      });
      next();
    } catch (error) {
      await swal.fire({
        icon: "error",
        title: "There was an error please try again",
        text: error,
      });
    }
  };

  /**
   * function to get and create the signmessage command
   * @function
   */
  const prepareToSign = async (data) => {
    swal.fire({
      title: "Creating the sign command",
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading();
      },
    });

    try {
      await setSignCommand(
        generateSignCommand(data.prepareAddress, data.messageSign)
      );

      await swal.fire({
        icon: "success",
        title: "The command was created",
        timer: 2000,
        showConfirmButton: false,
      });
      next();
    } catch (error) {
      await swal.fire({
        icon: "error",
        title: "There was an error please try again",
        text: error,
      });
    }
  };

  /**
   * function to get and create the submit command
   * @function
   */
  const signAndSubmit = async (data) => {
    swal.fire({
      title: "Creating the submit command",
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading();
      },
    });
    // console.log(data)

    try {
      await setSubmitCommand(generateSubmitCommand(data.tx, data.signature));

      await swal.fire({
        icon: "success",
        title: "The command was created",
        timer: 2000,
        showConfirmButton: false,
      });
      next();
    } catch (error) {
      await swal.fire({
        icon: "error",
        title: "There was an error please try again",
        text: error,
      });
    }
  };

  return (
    <>
      <div className="input-form">
        <div className="form-group">
          <div className="wizard-head">
            <span>1</span>Masternode details
          </div>
          <div
            className={`wizard-body ${currentStep === 0 ? "" : "collapsed"}`}
          >
            <MasternodeDetails onNext={getMasternodeDetails} />
          </div>

          <div className="wizard-head">
            <span>2</span>Masternode prepare
          </div>
          <div
            className={`wizard-body ${currentStep === 1 ? "" : "collapsed"}`}
          >
            <MasternodePrepared
              onNext={prepareToSign}
              onCancel={back}
              prepareCommand={prepareCommand}
            />
          </div>

          <div className="wizard-head">
            <span>3</span>Masternode sign
          </div>
          <div
            className={`wizard-body ${currentStep === 2 ? "" : "collapsed"}`}
          >
            <MasternodeSigned
              onNext={signAndSubmit}
              onCancel={back}
              signCommand={signCommand}
            />
          </div>
          <div className="wizard-head">
            <span>4</span>Masternode submit
          </div>
          <div
            className={`wizard-body ${currentStep === 3 ? "" : "collapsed"}`}
          >
            <div className="form-group article">
              <textarea
                className="styled"
                name="submitCommand"
                id="submitCommand"
                rows="5"
                disabled
                value={submitCommand}
              ></textarea>
              <small>
                <p style={{ lineHeight: "1.5" }}>
                  Submit command is ready to be copied. Please copy and paste it
                  into Syscoin Q.T console to register the masternode.
                </p>
              </small>
            </div>

            <div className="form-actions-spaced">
              <button
                className="btn btn--blue-border"
                type="button"
                onClick={back}
              >
                Back
              </button>
              <CopyToClipboard text={submitCommand} onCopy={copyButton}>
                <button className="btn btn--blue" type="button">
                  Copy
                </button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MasternodeForm;
