import React, { useState } from "react";

import { useUser } from '../../context/user-context';

import TitleProposal from './TitleProposal';
import DescriptionProposal from './DescriptionProposal';
import PaymentProposal from './PaymentProposal';

/* 
{
  type: Number(type),
  name,
  title,
  description,
  nPayment: Number(nPayment),
  first_epoch: Number(firstEpoch),
  start_epoch: Number(startEpoch),
  end_epoch: Number(endEpoch),
  payment_address: paymentAddress,
  payment_amount: Number(paymentAmount),
  url: (typeof url !== "undefined") ? url : 'empty'
}
*/

export default function ProposalForm() {
  const { user } = useUser()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [payment, setPayment] = useState('');
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
  const getDescription = ({ proposalDescription, proposalUrl }) => {
    console.log(proposalDescription);
    console.log(proposalUrl);
    setDescription(proposalDescription);
    setUrl(proposalUrl);
    next();
  }
  const getPayment = ( proposalPayment) => {
    console.log(proposalPayment);
    setPayment(proposalPayment);
    next();
  }

  const prepareProposal = () => {
    const name = title.trim().toLowerCase().replace(/[^A-Za-z0-9]/g, '');
    const proposal = {
      type: 1,
      title,
      name,
      description,
      url,
      firstEpoch: payment.proposalStartEpoch,
      startEpoch: payment.proposalStartEpoch,
      endEpoch: payment.proposalEndEpoch,
      nPayment: payment.paymentNumber,
      paymentAddress: payment.paymentAddress,
      paymentAmount: payment.paymentAmount
    }
    console.log(proposal);
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
          <PaymentProposal onNext={getPayment} onBack={back} />
          
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
            <button className="btn btn--blue" type="button" onClick={prepareProposal}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
