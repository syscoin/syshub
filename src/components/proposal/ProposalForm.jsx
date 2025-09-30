import React, {useState, useEffect, useMemo, useRef} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import swal from "sweetalert2";
import {Collapse} from 'react-collapse';
import {useHistory} from "react-router";
import {useForm} from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers';
import * as yup from "yup";

import {checkProposal, prepareProposal, notCompletedProposal, destroyProposal} from "../../utils/request";
import {getAxiosErrorFooter, getAxiosErrorMessage, logAxiosError} from "../../utils/errorHandler";

import CustomModal from '../global/CustomModal';
import TitleProposal from './TitleProposal';
import DescriptionProposal from './DescriptionProposal';
import PaymentProposal from './PaymentProposal';
import ProposalPreview from "./ProposalPreview";
import axios from 'axios';
import useProposalSubmission from './hooks/useProposalSubmission';


const schema = yup.object().shape({
  paymentTxId: yup.string()
    .test('len', 'Must be exactly 64 characters', val => val.length === 64)
    .required('Payment txid is required')
});
const schema2 = yup.object().shape({
  proposalHash: yup.string()
    .test('len', 'Must be exactly 64 characters', val => val.length === 64)
    .required('proposal hash is required')
});

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
  const [collapse, setCollapse] = useState(true);
  const [useCollapse, setUseCollapse] = useState(false);

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

  const { enterPaymentTxId, enterProposalHash } = useProposalSubmission({
    proposalUid,
    history,
    setSubmitCommand,
    setUseCollapse,
    setCollapse,
  });

  const {register, handleSubmit, errors} = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  });
  const {register: register2, handleSubmit: handleSubmit2, errors: errors2} = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema2)
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
    setCurrentStep(4);
    if (submitCommand !== "") {
      setUseCollapse(true);
      setCollapse(false);
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
      setUseCollapse(false);
      setCollapse(true);
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
  }

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
      url: url || 'emptyField',
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

  /**
   * Function that gets the payment txid and fetch a submit command of the proposal
   * @function
   * @param {{paymentTxId: string}} data payment txid from the input
   */
<<<<<<< HEAD
  const enterPaymentTxId = async (data) => {
    swal.fire({
      title: 'Creating submit command',
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading();
      }
    });

    const { paymentTxId } = data;
    let prepareObjectProposal;

    try {
      const updateResponse = await updateProposal(proposalUid, { txId: paymentTxId });
      prepareObjectProposal = updateResponse?.data?.proposal?.prepareObjectProposal;

      if (!prepareObjectProposal) {
        throw new Error('The prepare payload is missing from the update response.');
      }

      const submitResponse = await submitProposal(proposalUid, { ...prepareObjectProposal, txId: paymentTxId });
      const commandSubmit = submitResponse?.data?.commandSubmit;

      if (!commandSubmit) {
        throw new Error('Submit command was not returned by the API.');
      }

      setSubmitCommand(commandSubmit);

      await swal.fire({
        icon: 'success',
        title: 'Submit command created',
        timer: 2000,
        showConfirmButton: false
      });

      setUseCollapse(true);
      setCollapse(false);
    } catch (error) {
      logAxiosError('ProposalForm::enterPaymentTxId', error, {
        proposalUid,
        paymentTxId,
        hasPreparePayload: Boolean(prepareObjectProposal)
      });

      const errorMessage = getAxiosErrorMessage(error, 'Unable to create submit command.');
      const footer = getAxiosErrorFooter(error);

      await swal.fire({
        icon: 'error',
        title: 'There was an error',
        text: errorMessage,
        footer
      });
    }
  }

  const confirmProposalCompletion = async (proposalId, expectedHash) => {
    if (!proposalId) {
      return { isCompleted: false };
    }

    try {
      const response = await getOneProposal(proposalId);
      const savedProposal = response?.data?.proposal;

      if (!savedProposal) {
        return { isCompleted: false };
      }

      const normalizedExpectedHash = typeof expectedHash === 'string'
        ? expectedHash.trim().toLowerCase()
        : '';

      const candidateHashes = [
        savedProposal.hash,
        savedProposal.proposalHash,
        savedProposal.proposal_hash,
      ]
        .filter((value) => typeof value === 'string' && value.trim().length > 0)
        .map((value) => value.trim().toLowerCase());

      const matchesHash = Boolean(
        normalizedExpectedHash && candidateHashes.includes(normalizedExpectedHash)
      );

      const isComplete = Boolean(
        savedProposal.complete === true ||
        savedProposal.status === 'complete' ||
        savedProposal.state === 'complete' ||
        matchesHash
      );

      return {
        isCompleted: isComplete,
        matchesHash,
        resolvedHash: candidateHashes[0] || null,
      };
    } catch (statusError) {
      logAxiosError('ProposalForm::confirmProposalCompletion', statusError, { proposalId });
      return { isCompleted: false };
    }
  }

  /**
   * Function that gets the proposal hash and creates the new proposal
   * @function
   * @param {{proposalHash: string}} data proposalHash from the input
   */
  const enterProposalHash = async (data) => {
    swal.fire({
      title: 'Creating the proposal',
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading();
      }
    });

    const { proposalHash } = data;

    try {
      await updateProposal(proposalUid, { hash: proposalHash, complete: true });

      await swal.fire({
        icon: 'success',
        title: 'The proposal was created',
        timer: 2000,
        showConfirmButton: false
      });
      history.push('/governance');
    } catch (error) {
      logAxiosError('ProposalForm::enterProposalHash', error, {
        proposalUid,
        proposalHash
      });

      const errorMessage = getAxiosErrorMessage(error, 'There was an error please try again');
      const footer = getAxiosErrorFooter(error);

      const completionCheck = await confirmProposalCompletion(proposalUid, proposalHash);

      if (completionCheck.isCompleted) {
        const footerDetails = [errorMessage];

        if (footer) {
          footerDetails.push(footer);
        }

        if (completionCheck.resolvedHash) {
          footerDetails.push(`Hash detected: ${completionCheck.resolvedHash}`);
        }

        await swal.fire({
          icon: 'warning',
          title: 'Proposal creation confirmed after timeout',
          text: 'The proposal appears to have been registered even though the server timed out. You can confirm it from the governance page.',
          footer: footerDetails.join('<br />'),
        });

        history.push('/governance');
        return;
      }

      await swal.fire({
        icon: 'error',
        title: 'There was an error please try again',
        text: errorMessage,
        footer
      });
    }

  }
=======
  
>>>>>>> ada6fc3f (feat: improve proposal submission timer handling)

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
                  <button className="btn btn-outline-primary" type="button">Copy</button>
                </CopyToClipboard>
              </div>

              <form className="input-form" onSubmit={handleSubmit(enterPaymentTxId)}>
                <div className="form-group">
                  <label htmlFor="paymentTxId">Payment txid</label>
                  <input type="text" id="paymentTxId" ref={register} name="paymentTxId" className="styled" maxLength="64"/>
                  <ErrorMessage
                    errors={errors}
                    name="paymentTxId"
                    render={({message}) => <small><p style={{lineHeight: '1.5'}}>{message}</p></small>}
                  />
                </div>
                <div className="form-actions-spaced">
                  <button className="btn btn-outline-primary" type="button" onClick={cancelProposalBtn}>Cancel</button>
                  <button className="btn btn--blue" type="submit">Next</button>
                </div>
              </form>

            </Collapse>


            <Collapse
              isOpened={useCollapse}
              initialStyle={{height: 0, overflow: 'hidden'}}
            >
              <div className="form-group article">
                {/* Disclaimer about waiting before go_submit */}
                <div className="alert alert-warning mb-3 py-2 px-3" role="alert">
                  <strong>Important:</strong> Please wait at least <b>5 minutes</b> or <b>1 block confirmation</b> after sending the payment transaction before running <code>go_submit</code>. Submitting too early may cause your proposal to fail.
                </div>
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
                  <button className="btn btn-outline-primary" type="button">Copy</button>
                </CopyToClipboard>
              </div>

              <form className="input-form" onSubmit={handleSubmit2(enterProposalHash)}>
                <div className="form-group">
                  <label htmlFor="proposalHash">Proposal hash</label>
                  <input type="text" id="proposalHash" ref={register2} name="proposalHash" className="styled" maxLength="64"/>
                  <ErrorMessage
                    errors={errors2}
                    name="proposalHash"
                    render={({message}) => <small><p style={{lineHeight: '1.5'}}>{message}</p></small>}
                  />
                </div>
                <div className="form-actions-spaced">
                  <button className="btn btn-outline-primary" type="button" onClick={cancelProposalBtn}>Cancel</button>
                  <button className="btn btn--blue" type="submit">Submit</button>
                </div>
              </form>
            </Collapse>
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