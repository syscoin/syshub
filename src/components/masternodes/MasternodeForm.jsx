import React, {useState} from "react";
import swal from "sweetalert2";


import TitleProposal from '../proposal/TitleProposal';




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
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [payment, setPayment] = useState(null);



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





  return (
    <>
      <div className="input-form">
        <div className="form-group">
          <div className="wizard-head">
            <span>1</span>Masternode details
          </div>
          <div className={`wizard-body ${currentStep === 0 ? "" : "collapsed"}`}>

          </div>

          <div className="wizard-head">
            <span>2</span>Masternode sign
          </div>
          <div className={`wizard-body ${currentStep === 1 ? "" : "collapsed"}`}>
            

          </div>

          <div className="wizard-head">
            <span>3</span>Masternode submit
          </div>
          <div className={`wizard-body ${currentStep === 2 ? "" : "collapsed"}`}>
            

          </div>

        </div>
      </div>
    </>
  );
}

export default MasternodeForm;