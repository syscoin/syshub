import React, {useState, useEffect, useMemo, useRef, useCallback} from "react";
import swal from "sweetalert2";
import {useHistory} from "react-router";

import {checkProposal, prepareProposal, notCompletedProposal, destroyProposal} from "../../utils/request";
import {getAxiosErrorFooter, getAxiosErrorMessage, logAxiosError} from "../../utils/errorHandler";

import CustomModal from '../global/CustomModal';
import TitleProposal from './TitleProposal';
import DescriptionProposal from './DescriptionProposal';
import PaymentProposal from './PaymentProposal';
import ProposalPreview from "./ProposalPreview";
import PrepareProposal from "./PrepareProposal";
import SubmitProposal from "./SubmitProposal";
import axios from 'axios';
import useProposalSubmission from './hooks/useProposalSubmission';

/**
 * Component to show the create Proposal form
 * @component
 * @subcategory Proposal
 * @example
 * return (
 *  <ProposalForm />
 * )
 */
function ProposalForm() {
  const history = useHistory();
  const isMounted = useRef(false);
  //COMPONENT STATES
  const [currentStep, setCurrentStep] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  //PROPOSAL STATES
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [payment, setPayment] = useState(null);
  const [prepareCommand, setPrepareCommand] = useState('');
  const [submitCommand, setSubmitCommand] = useState('');
  const [preparing, setPreparing] = useState(false);
  const [proposalUid, setProposalUid] = useState('');

  const cancelSource = useMemo(() => axios.CancelToken.source(), []);

  const onPaymentTxIdEntered = useCallback(() => {
    setCurrentStep(prev => prev + 1); // Move to step 6 (submit proposal)
  }, []);

  const { enterPaymentTxId, enterProposalHash } = useProposalSubmission({
    proposalUid,
    history,
    setSubmitCommand,
    onPaymentTxIdEntered,
  });

  /**
   * UseEffect at mounting to get saved proposal
   * @function
   */
  useEffect(() => {
    /**
     * function to get saved proposal from the API
     * @function
     */
    const getSavedProposal = async () => {
      try {
        const {data} = await notCompletedProposal(cancelSource.token);

        if (data.proposal) {
          showSavedProposal(data.proposal);
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
          logAxiosError('ProposalForm::getSavedProposal', error);
        }
      }
    };
    isMounted.current = true;
    getSavedProposal();

    return () => {
      cancelSource.cancel('The request has been canceled');
      isMounted.current = false;
    };
  }, [cancelSource]);

  /**
   * Function that opens a modal with the preview of the saved proposal
   * @function
   * @param {Object} proposal the saved proposal to show from the API
   */
  const showSavedProposal = (proposal) => {
    // console.log(proposal);
    setTitle(proposal.title);
    setDescription(proposal.description);
    if (proposal.url !== 'emptyField') setUrl(proposal.url);
    const payment = {
      paymentNumber: proposal.nPayment,
      paymentAmount: proposal.payment_amount,
      paymentAddress: proposal.payment_address,
      proposalStartEpoch: proposal.start_epoch,
      proposalEndEpoch: proposal.end_epoch
    }
    setPayment(payment);
    setProposalUid(proposal.uid);
    setPrepareCommand(proposal.prepareCommand);
    setSubmitCommand(proposal.commandSubmit || '');

    setOpenModal(true);
  }

  /**
   * Function that erase from the API the saved proposal and sets the proposal in blank to create a new one
   * @function
   */
  const cancelCurrentProposal = async () => {
    if (openModal) setOpenModal(false);
    setCurrentStep(0);
    try {
      await destroyProposal(proposalUid);
    } catch (error) {
      logAxiosError('ProposalForm::cancelCurrentProposal', error, { proposalUid });

      const errorMessage = getAxiosErrorMessage(
        error,
        'Unable to cancel the proposal. Please reload the page.'
      );
      const footer = getAxiosErrorFooter(error);

      await swal.fire({
        icon: 'error',
        title: 'Please reload the page',
        text: errorMessage,
        footer,
        timer: 2000
      });
    }

    if (isMounted.current) {
      setTitle('');
      setDescription('');
      setUrl('');
      setPayment(null);
      setProposalUid('');
      setPrepareCommand('');
      setSubmitCommand('');
    }

    //cancelar el proposal y empezar de cero
  }

  /**
   * Function to continue with the saved proposal and proceed to submit or prepare the creation
   * @function
   */
  const continueProposal = () => {
    if (submitCommand !== "") {
      // If submit command exists, go to step 6 (submit)
      setCurrentStep(5);
    } else if (prepareCommand !== "") {
      // If only prepare command exists, go to step 5 (prepare)
      setCurrentStep(4);
    } else {
      // Otherwise go to step 5 (prepare) to start fresh
      setCurrentStep(4);
    }
    setOpenModal(false);
  }

  /**
   * Function to confirm the delete of the saved proposal
   * @function
   */
  const cancelProposalBtn = async () => {
    const swalConfirm = await swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You will delete the info of the proposal and create a new one",
      showCancelButton: true,
      confirmButtonText: 'Delete'
    })
    if (swalConfirm.isConfirmed) {
      cancelCurrentProposal();
    }
  }

  /**
   * function to set back the step of the proposal form
   * @function 
   */
  const back = () => {
    setCurrentStep(currentStep - 1);
  };

  /**
   * function to set next step of the proposal form
   * @function
   */
  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  /**
   * function that sets in the state the title from the input
   * @function
   * @param {{proposalTitle: string}} proposalTitle the proposal title from the title input form
   */
  const getTitle = ({proposalTitle}) => {
    setTitle(proposalTitle);
    next();
  }

  /**
   * function that sets in the state the description and url from the input
   * @function
   * @param {{proposalDescription: string, proposalUrl: string}} proposalDescription the proposal description and url from the description input form
   */
  const getDescription = ({proposalDescription, proposalUrl}) => {
    setDescription(proposalDescription);
    setUrl(proposalUrl);
    next();
  }
  /**
   * function that sets in the state the payment information from the input
   * @function
   * @param {Object} proposalPayment the proposal payment from the description input form
   */
  const getPayment = (proposalPayment) => {
    setPayment(proposalPayment);
    next();
  }

  /**
   * Function that checks the proposal and fetch the prepare command from the API
   * @function
   */
  const checkProposalAndPrepare = async () => {
    setPreparing(true);

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

    try {
      await checkProposal(proposal);

      const prepareResponse = await prepareProposal(proposal);
      const preparedUid = prepareResponse?.data?.uid;
      const prepareCommand = prepareResponse?.data?.command;

      if (!preparedUid || !prepareCommand) {
        throw new Error('Prepare command was not returned by the API.');
      }

      setProposalUid(preparedUid);
      setPrepareCommand(prepareCommand);
      next();
    } catch (error) {
      logAxiosError('ProposalForm::checkProposalAndPrepare', error, { proposal });

      const errorMessage = getAxiosErrorMessage(error, 'There was an error');
      const footer = getAxiosErrorFooter(error);

      await swal.fire({
        icon: 'error',
        title: 'There was an error',
        text: errorMessage,
        footer
      });
    } finally {
      setPreparing(false);
    }

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
            <div className="article">
              <ProposalPreview title={title} description={description} url={url} payment={payment}/>

              <div className="form-actions-spaced">
                <button className="btn btn-outline-primary" type="button" onClick={back}>Back</button>
                <button
                  className="btn btn--blue"
                  type="button"
                  onClick={checkProposalAndPrepare}
                  disabled={preparing}
                >Prepare
                </button>
              </div>

            </div>

          </div>

          <div className="wizard-head">
            <span>5</span>Prepare proposal
          </div>
          <div className={`wizard-body ${currentStep === 4 ? "" : "collapsed"}`}>
            <PrepareProposal
              prepareCommand={prepareCommand}
              onSubmit={enterPaymentTxId}
              onCancel={cancelProposalBtn}
            />
          </div>

          <div className="wizard-head">
            <span>6</span>Submit proposal
          </div>
          <div className={`wizard-body ${currentStep === 5 ? "" : "collapsed"}`}>
            <SubmitProposal
              submitCommand={submitCommand}
              onSubmit={enterProposalHash}
              onCancel={cancelProposalBtn}
            />
          </div>
        </div>
      </div>

      <CustomModal
        open={openModal}
        onClose={cancelCurrentProposal}
      >
        <h3>You were creating a proposal</h3>
        <small>
          <p style={{lineHeight: "1.5"}}>
            Save and continue with the previous proposal info, or cancel it to create a new one
          </p>
        </small>
        <ProposalPreview title={title} description={description} url={url} payment={payment}/>

        <button
          className="btn btn-outline-primary"
          style={{marginBottom: '10px', marginLeft: '10px'}}
          onClick={cancelCurrentProposal}
        >Cancel
        </button>
        <button
          className="btn btn--blue"
          style={{marginBottom: '10px', marginLeft: '10px'}}
          onClick={continueProposal}
        >Continue
        </button>

      </CustomModal>
    </>
  );
}

export default ProposalForm;