import React, { useState } from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import swal from "sweetalert2";
import { Collapse } from 'react-collapse';
import {useForm} from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers';
import * as yup from "yup";

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
const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt elit elementum, egestas nibh id, ultricies magna. Praesent eget eleifend leo, et euismod est. Quisque viverra est elit, eu posuere ante suscipit eu. Phasellus maximus non elit vel imperdiet. Nunc molestie quis lorem nec posuere. Maecenas condimentum, dui vitae bibendum fringilla, erat enim iaculis erat, vulputate dapibus nisi magna vitae lorem. Praesent ornare eros pulvinar molestie luctus. Aliquam vitae malesuada augue, placerat vehicula ligula. Aliquam erat volutpat. Curabitur cursus eleifend ex, at facilisis magna. Nullam laoreet libero at lectus facilisis ornare."

const schema = yup.object().shape({
  proposalHash: yup.string()
});

export default function ProposalForm() {
  const { user } = useUser()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [payment, setPayment] = useState(null);
  const [prepareCommand, setPrepareCommand] = useState('');
  const [currentStep, setCurrentStep] = useState(4);

  const {register, handleSubmit, errors} = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  });

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
    //REALIZAR EL REQUEST DEL PREPARE 
    next();
  }
  const copyButton = () => {
    swal.fire({
      icon: "success",
      title: "Copied",
      timer: 2000,
      showConfirmButton: false,
    });
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
          {/* <PaymentProposal onNext={getPayment} onBack={back} /> */}
          
        </div>

        <div className="wizard-head">
          <span>4</span>Preview proposal
        </div>
        <div className={`wizard-body ${currentStep === 3 ? "" : "collapsed"}`}>
          <div className="proposals article">
            <div className="proposal">
              <label style={{fontSize: '24px'}}>{title}</label>
              <div dangerouslySetInnerHTML={{ __html: description }} style={{margin:'0 10px'}}></div>
              <label>{url || 'No URL was given'}</label>
              {
                payment && (
                  <>
                    <div>
                      <label>{payment.paymentAmount} SYS in {payment.paymentNumber} payment(s)</label>
                    </div>
                    <div>
                      <label>Address: {payment.paymentAddress}</label>
                    </div>
                  </>
                )
              }
            </div>
          </div>


          
          <div className="form-actions-spaced">
            <button className="btn btn--blue-border" type="button" onClick={back}>Back</button>
            <button className="btn btn--blue" type="button" onClick={prepareProposal}>Prepare</button>
          </div>
        </div>
      
        <div className="wizard-head">
        <span>4</span>Create proposal
        </div>
        <div className={`wizard-body ${currentStep === 4 ? "" : "collapsed"}`}>
          <div className="form-group article">
            <textarea
              className="styled"
              name="prepareCommand"
              id="prepareCommand"
              rows="4"
              disabled
              value={prepareCommand}
            ></textarea>
            <small>
              <p style={{ lineHeight: "1.5" }}>
                Prepare command is ready to be copied. Please copy and paste it into Syscoin Q.T console for payment txid.
              </p>
            </small>
          </div>

          <div className="form-actions-spaced text-center">
            <CopyToClipboard
              text={prepareCommand}
              onCopy={copyButton}
            >
              <button className="btn btn--blue-border" type="button">Copy</button>
            </CopyToClipboard>
          </div>
          
          <form action="">

          </form>
        </div>
      </div>
    </div>
  );
}
