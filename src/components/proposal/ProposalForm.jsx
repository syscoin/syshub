import React, {useState, useEffect, useRef} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import swal from "sweetalert2";
import {Collapse} from 'react-collapse';
import {useForm} from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers';
import * as yup from "yup";

import {useUser} from '../../context/user-context';
import {checkProposal, prepareProposal, submitProposal, updateProposal, notCompletedProposal} from "../../utils/request";

import CustomModal from '../global/CustomModal';
import TitleProposal from './TitleProposal';
import DescriptionProposal from './DescriptionProposal';
import PaymentProposal from './PaymentProposal';
import ProposalPreview from "./ProposalPreview";

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

const schema = yup.object().shape({
  paymentTxId: yup.string()
    // .test('len', 'Must be exactly 64 characters', val => val.length === 64)
    .required('Payment txid is required')
});
const schema2 = yup.object().shape({
  proposalHash: yup.string()
    // .test('len', 'Must be exactly 64 characters', val => val.length === 64)
    .required('proposal hash is required')
});

export default function ProposalForm() {
  const { user } = useUser();
  const [loadingProposal, setLoadingProposal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [payment, setPayment] = useState(null);
  const [prepareCommand, setPrepareCommand] = useState('');
  const [submitCommand, setSubmitCommand] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [collapse, setCollapse] = useState(true);
  const [useCollapse, setUseCollapse] = useState(false);
  const [preparing, setPreparing] = useState(false);
  const [proposalUid, setProposalUid] = useState('');

  const mountedRef = useRef(true);

  const {register, handleSubmit, errors} = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  });
  const {register: register2, handleSubmit: handleSubmit2, errors: errors2} = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema2)
  });

  useEffect(() => {
    const getSavedProposal = async () => {
      setLoadingProposal(true);
      try {
        let {data} = await notCompletedProposal(user.token).catch((err) => {
          throw err;
        });
        console.log(data);
      } catch (error) {
        console.log(error)
      }
      
      setLoadingProposal(false);
    };
    if (mountedRef.current) {
      getSavedProposal();
    }
    
    return () => {mountedRef.current = false}
  }, []);

  const back = () => {
    setCurrentStep(currentStep - 1);
  };
  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const copyButton = () => {
    swal.fire({
      icon: "success",
      title: "Copied",
      timer: 2000,
      showConfirmButton: false,
    });
  }

  const getTitle = ({proposalTitle}) => {
    setTitle(proposalTitle);
    next();
  }
  const getDescription = ({proposalDescription, proposalUrl}) => {
    setDescription(proposalDescription);
    setUrl(proposalUrl);
    next();
  }
  const getPayment = (proposalPayment) => {
    setPayment(proposalPayment);
    next();
  }

  const checkProposalAndPrepare = async () => {
    setPreparing(true);

    const name = title.trim().toLowerCase().replace(/[^A-Za-z0-9]/g, '');
    const proposal = {
      type: 1,
      title,
      name,
      description,
      url: url || 'emptyField',
      firstEpoch: payment.proposalStartEpoch,
      startEpoch: payment.proposalStartEpoch,
      endEpoch: payment.proposalEndEpoch,
      nPayment: payment.paymentNumber,
      paymentAddress: payment.paymentAddress,
      paymentAmount: payment.paymentAmount
    }
    console.log(proposal);
    try {
      await checkProposal(user.token, proposal).catch(err => {
        throw err
      });

      const prepare = await prepareProposal(user.token, proposal).catch(err => {
        throw err
      });
      console.log(prepare);
      setProposalUid(prepare.data.uid)
      setPrepareCommand(prepare.data.command);

      setPreparing(false);
      await next();
    } catch (error) {
      console.log(error);
      return swal.fire({
        icon: "error",
        title: "there was an error",
        text: error.message
      });
    }

  }

  const enterPaymentTxId = async (data) => {
    swal.fire({
      title: 'Creating submit command',
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading()
      }
    });
    console.log(data);
    let {paymentTxId} = data;
    await updateProposal(user.token, proposalUid, {txId: paymentTxId}).then(async resp => {
      let {data: {proposal: {prepareObjectProposal}}} = resp;
      let { data: { commandSubmit } } = await submitProposal(user.token, proposalUid, { ...prepareObjectProposal, txId: paymentTxId })
        .catch(err => {
          swal.fire({
            icon: 'error',
            title: 'There was an error',
            text: err.message        
          });
          console.log(err)
        })
      console.log(commandSubmit);
      setSubmitCommand(commandSubmit);
      await swal.fire({
        icon: 'success',
        title: 'Submit command created',
        timer: 2000,
        showConfirmButton: false
      });

      setUseCollapse(true);
      setCollapse(false);
      console.log(data)
    }).catch(err => {
      swal.fire({
        icon: 'error',
        title: 'There was an error',
        text: err.message        
      });
      console.log(err)
    })
  }

  const enterProposalHash = async (data) => {
    let {proposalHash} = data;

    await updateProposal(user.token, proposalUid, {hash: proposalHash}).catch(err => {
      throw err
    })
    swal.fire('aqui termina el proceso del proposal :)', '', 'info')
  }

  return (
    <>
      <div className="input-form">
        <div className="form-group">
          <div className="wizard-head">
            <span>1</span>Title
          </div>
          <div className={`wizard-body ${currentStep === 0 ? "" : "collapsed"}`}>
            <TitleProposal onNext={getTitle}/>

          </div>

          <div className="wizard-head">
            <span>2</span>Description
          </div>
          <div className={`wizard-body ${currentStep === 1 ? "" : "collapsed"}`}>
            <DescriptionProposal onNext={getDescription} onBack={back}/>

          </div>

          <div className="wizard-head">
            <span>3</span>Payment details
          </div>
          <div className={`wizard-body ${currentStep === 2 ? "" : "collapsed"}`}>
            <PaymentProposal onNext={getPayment} onBack={back}/>

          </div>

          <div className="wizard-head">
            <span>4</span>Preview proposal
          </div>
          <div className={`wizard-body ${currentStep === 3 ? "" : "collapsed"}`}>
            <div className="proposals article">
              <ProposalPreview title={title} description={description} url={url} payment={payment}/>
            
              <div className="form-actions-spaced">
                <button className="btn btn--blue-border" type="button" onClick={back}>Back</button>
                <button
                  className="btn btn--blue"
                  type="button"
                  onClick={checkProposalAndPrepare}
                  disabled={preparing}
                >Prepare</button>
              </div>
            
            </div>

          </div>

          <div className="wizard-head">
            <span>5</span>Create proposal
          </div>
          <div className={`wizard-body ${currentStep === 4 ? "" : "collapsed"}`}>
            <Collapse
              isOpened={collapse}
              initialStyle={{height: 0, overflow: 'hidden'}}
            >
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
                  <button className="btn btn--blue-border" type="button">Copy</button>
                </CopyToClipboard>
              </div>

              <form className="input-form" onSubmit={handleSubmit(enterPaymentTxId)}>
                <div className="form-group">
                  <label htmlFor="paymentTxId">Payment txid</label>
                  <input type="text" id="paymentTxId" ref={register} name="paymentTxId" className="styled" maxLength="40"/>
                  <ErrorMessage
                    errors={errors}
                    name="paymentTxId"
                    render={({message}) => <small><p style={{lineHeight: '1.5'}}>{message}</p></small>}
                  />
                </div>
                <div className="form-actions-spaced">
                  <button className="btn btn--blue" type="submit">Next</button>
                </div>
              </form>

            </Collapse>


            <Collapse
              isOpened={useCollapse}
              initialStyle={{height: 0, overflow: 'hidden'}}
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
                  <p style={{lineHeight: "1.5"}}>
                    Submit command is ready to be copied. Please copy and paste it into Syscoin Q.T console to submit your proposal. This could take a couple minutes.
                  </p>
                </small>
              </div>

              <div className="form-actions-spaced">
                <CopyToClipboard
                  text={submitCommand}
                  onCopy={copyButton}
                >
                  <button className="btn btn--blue-border" type="button">Copy</button>
                </CopyToClipboard>
              </div>

              <form className="input-form" onSubmit={handleSubmit2(enterProposalHash)}>
                <div className="form-group">
                  <label htmlFor="proposalHash">Proposal hash</label>
                  <input type="text" id="proposalHash" ref={register2} name="proposalHash" className="styled" maxLength="40"/>
                  <ErrorMessage
                    errors={errors2}
                    name="proposalHash"
                    render={({message}) => <small><p style={{lineHeight: '1.5'}}>{message}</p></small>}
                  />
                </div>
                <div className="form-actions-spaced">
                  <button className="btn btn--blue" type="submit">Submit</button>
                </div>
              </form>
            </Collapse>
          </div>
        </div>
      </div>
      
      <CustomModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <h2>Your current proposal</h2>
        <ProposalPreview title={title} description={description} url={url} payment={payment}/>
      </CustomModal>
    </>
  );
}
