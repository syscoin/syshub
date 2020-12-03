import React, { useEffect, useState, useMemo, useRef } from "react";
import axios from 'axios';
import swal from 'sweetalert2'

import {useUser} from "../../context/user-context";
import {getUserMasterNodes, get2faInfoUser} from "../../utils/request";
import signVote from "../../utils/sign-vote";
import {voteProposal} from "../../utils/request";
import MnItem from "./MnItem";

import CustomModal from "../global/CustomModal";
import Modal2FA from "../profile/2FA/Modal2FA";

/**
 * Component to show the masternodes list of the user
 * @component
 * @subcategory Governance
 * @param {Object} proposal the single proposal passed from the father
 * @param {number} vote the number of enabled masternodes
 * @param {*} onAfterVote function used after the user has voted
 * @example
 * const proposal = {}
 * const vote = 1
 * const onAfterVote = () => {}
 * return (
 *  <MnList proposal={proposal} vote={vote} onAfterVote={onAfterVote} />
 * )
 */
const MnList = ({proposal, vote, onAfterVote}) => {
  let {user} = useUser();
  const [loadingMN, setLoadingMN] = useState(false);
  const [masterNodes, setMasterNodes] = useState([]);
  const [masterNodesForVote, setMasterNodesForVote] = useState([]);
  const [userSignInGAuth, setUserSignInGAuth] = useState(null);
  const [user2FA, setUser2FA] = useState(null);
  const [open2FAModal, setOpen2FAModal] = useState(false);
  const isMounted = useRef(false);

  const cancelSource = useMemo(() => axios.CancelToken.source(), []);

  /**
   * useEffect that fetch the masternodes list of the API
   * @function
   */
  useEffect(() => {
    /**
     * Function that fetch the masternodes list of the API
     * @function
     */
    const getMnByUser = async () => {
      setLoadingMN(true);
      try {
        let { data, status } = await getUserMasterNodes({ hash: proposal.Hash, cancelToken: cancelSource.token })
        .catch((err) => {
          throw err;
        });
        if (data) {
          if (isMounted.current) {
            setLoadingMN(false);
            setMasterNodes(data.nodes || []);

          }
        }
        else if (status === 204) {
          if (isMounted.current) { 
            setLoadingMN(false);
          }
        }
        else {
          if (isMounted.current) {
            setLoadingMN(false);
          }
        }
      } catch (error) {
        console.log(error);
        if (isMounted.current) {
          setLoadingMN(false);
        }
      }
    };
    isMounted.current = true;
    getMnByUser();

    return () => {
      isMounted.current = false;
      cancelSource.cancel('The request has been canceled');
    }
  }, [cancelSource, proposal.Hash]);

  /**
   * Function that adds a masternode to the state of selected masternodes
   * @function
   * @param {Object} mn The masternode recently selected 
   */
  const addMnVote = (mn) => {
    setMasterNodesForVote([...masterNodesForVote, mn]);
  };

  /**
   * Function that removes a masternode of the state of selected masternodes
   * @function
   * @param {string} uid The masternode uid to remove
   */
  const removeMnVote = (uid) => {
    let filteredMN = masterNodesForVote.filter((mn) => mn.uid !== uid);

    setMasterNodesForVote(filteredMN);
  };

  /**
   * Function that prepares the vote on the proposal and verifies if the user has 2fa and proceeds to open the 2fa modal
   * @function
   */
  const prepareVoting = async () => {
    try {
      let user2fa = await get2faInfoUser(user.data.user_id);
      if (user2fa.twoFa === true) {
        setUser2FA(user2fa);
        if (user2fa.gAuth === true) {
          setUserSignInGAuth({secret: user2fa.gAuthSecret});
        }
        setOpen2FAModal(true);
      } else {
        swal.fire({
          icon: 'warning',
          title: 'Two-Factor Authentication is disabled',
          text: 'To vote you must activate a 2FA method'
        });
      }
    } catch (error) {
      swal.fire({
        title: 'There was an error',
        icon: 'error',
        text: error.message,
      });
    }
  }

  /**
   * Function that is executed after the 2fa verification, it proceeds to take the selected masternodes and vote with them through the API
   * @function
   */
  const voting = async () => {
    setOpen2FAModal(false);
    swal.fire({
      title: 'Processing votes',
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading()
      }
    })
    let masterNodesVote = []
    let masterNodesErrorVote = []
    for await (const mn of masterNodesForVote) {
      const proposalVoteNo = {
        mnPrivateKey: mn.privateKey,
        vinMasternode: mn.txId,
        gObjectHash: proposal.Hash,
        voteOutcome: vote,
      };

      const voteData = signVote(proposalVoteNo)
      await voteProposal(voteData)
        .then(async data => {
          masterNodesVote.push({
            hash: proposal.Hash,
            votingOption: vote,
            message: data.data,
            mn: mn.name
          })
          // await voteIn(mn.uid, {
          //   hash: proposal.Hash,
          //   txId:mn.txId,
          //   votingOption: String(vote)
          // }).then(() => {
          //
          // })
        })
        .catch(err => {
          masterNodesErrorVote.push({
            mn: mn.name,
            err: voteData === 'Invalid network version'?'Invalid network version':err.response.data.message
          })
        });
    }
    let stringOfMnYes = masterNodesVote.map(mn => {
      return `<li>${mn.mn}</li>`;
    }).join('');
    let stringOfMnNo = masterNodesErrorVote.map(mn => {
      return `<li>${mn.mn}. Cause: ${mn.err}</li>`;
    }).join('');

    await swal.fire({
        title: 'Voting results',
        html: `
      <p style="text-align: start; color:green; font-weight: bold">Successful votes:</p>
      <ul style="text-align: start">${stringOfMnYes}</ul>
      <br/>
      <p style="text-align: start; color: red; font-weight: bold">Unsuccessful votes:</p>
      <ul style="text-align: start">${stringOfMnNo}</ul>
      `
      }
    );
    onAfterVote();
  };


  return (
    <>
      <h3>{proposal.title || proposal.name}</h3>
      <p>Select the masternodes to vote in the proposal</p>
      {masterNodes.length > 0 ? (
        <>
          <div className="form-group">
            <ul className="selector" style={{maxHeight: '180px', overflow: 'auto'}}>
              {masterNodes.map(mn => (
                <MnItem key={mn.uid} vote={vote} hash={proposal.Hash} mn={mn} onAddMN={addMnVote} onRemoveMN={removeMnVote}/>
              ))}
            </ul>

          </div>
          <div className="form-actions-spaced text-center" style={{marginTop: '10px'}}>
            <button
              className="btn btn--blue"
              onClick={prepareVoting}
              disabled={masterNodesForVote.length === 0}
            >Vote
            </button>
          </div>
        </>
      ) : (
        <>
          {
            loadingMN && <p>Loading...</p>
          }
          {
            (!loadingMN && masterNodes.length === 0) && <p>You don't have masternodes to vote please add one</p>
          }
        </>
      )}
      <CustomModal
        open={open2FAModal}
        onClose={() => setOpen2FAModal(false)}
      >
        {user2FA && <Modal2FA
          user2fa={user2FA}
          userSignInGAuth={userSignInGAuth}
          onGAuth={voting}
          onPhoneSMS={voting}
        />}
      </CustomModal>
    </>
  );
};

export default MnList;
