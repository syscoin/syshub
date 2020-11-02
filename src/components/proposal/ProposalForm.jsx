import React, { useState } from "react";

import TitleProposal from './TitleProposal';
import DescriptionProposal from './DescriptionProposal';
import PaymentProposal from './PaymentProposal';

export default function ProposalForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const back = () => {
    setCurrentStep(currentStep - 1);
  };
  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const getTitle = ({ proposalTitle }) => {
    console.log(proposalTitle);
    setTitle(proposalTitle);
    next();
  }
  const getDescription = ({ proposalDescription }) => {
    console.log(proposalDescription);
    setDescription(proposalDescription);
    next();
  }

  return (
    <div className="input-form">
      <div className="form-group">
        <div className="wizard-head">
          <span>1</span>Title
        </div>
        <div className={`wizard-body ${currentStep === 0 ? "" : "collapsed"}`}>
          <TitleProposal onNext={getTitle} />
          
        </div>

        <div className="wizard-head">
          <span>2</span>Description
        </div>
        <div className={`wizard-body ${currentStep === 1 ? "" : "collapsed"}`}>
          <DescriptionProposal onNext={getDescription} onBack={back} />
          
        </div>

        <div className="wizard-head">
          <span>3</span>Payment details
        </div>
        <div className={`wizard-body ${currentStep === 2 ? "" : "collapsed"}`}>
          <PaymentProposal />
          <div className="form-actions-spaced">
            <button className="btn btn--blue-border" type="button" onClick={back}>Back</button>
            <button className="btn btn--blue" type="button" onClick={next}>Next</button>
          </div>
        </div>

        <div className="wizard-head">
          <span>4</span>Create proposal
        </div>
        <div className={`wizard-body ${currentStep === 3 ? "" : "collapsed"}`}>
          <div>
            FINAL
          </div>
          <div className="form-actions-spaced">
            <button className="btn btn--blue-border" type="button" onClick={back}>Back</button>
            <button className="btn btn--blue" type="button" >Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
