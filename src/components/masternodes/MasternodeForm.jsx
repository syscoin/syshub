import React, { useState } from "react";
import swal from "sweetalert2";

import MasternodeDetails from "./masternodeForm/MasternodeDetails";
import MasternodePrepared from "./masternodeForm/MasternodePrepared";

/**
 * Component to show the create Proposal form
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

  //PROPOSAL STATES
  const [prepareCommand, setPrepareCommand] = useState("");
  const [submitCommand, setSubmitCommand] = useState("");

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
    return `protx_register_prepare ${collateralHash} ${collateralIndex} ${ipAddress}:18369 ${ownerKeyAddr} ${operatorPubKey} ${votingKeyAddr} ${votingKeyAddr} ${operatorReward} ${payoutAddress} ${
      feeSourceAddress || ""
    }`.trim();
  };

  const generateSingCommand = (collateralAddress, signMessage) => {
    if (
      collateralAddress.startsWith("sys") ||
      collateralAddress.startsWith("tsys")
    ) {
      return `signmessagebech32 ${collateralAddress} ${signMessage}`.trim();
    } else {
      return `signmessage ${collateralAddress} ${signMessage}`.trim();
    }
  };

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

  const getMasternodeDetails = async (data) => {
    swal.fire({
      title: "Creating the prepare command",
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading();
      },
    });

    try {
      await setPrepareCommand (generatePrepareCommand(
        data.collateralHash,
        data.collateralIndex,
        data.ipAddress,
        data.ownerAddress,
        data.operatorPubKey,
        data.votingAddress,
        data.operatorReward,
        data.payoutAddress,
        data.fundAddress
      ));
      
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
            <span>2</span>Masternode sign
          </div>
          <div
            className={`wizard-body ${currentStep === 1 ? "" : "collapsed"}`}
          >
            <MasternodePrepared onNext={''} onCancel={back} prepareCommand={prepareCommand} />
          </div>

          <div className="wizard-head">
            <span>3</span>Masternode submit
          </div>
          <div
            className={`wizard-body ${currentStep === 2 ? "" : "collapsed"}`}
          >

          </div>
        </div>
      </div>
    </>
  );
}

export default MasternodeForm;
