import React, { useEffect, useState, useMemo, useRef } from "react";
import axios from 'axios';
import swal from 'sweetalert2'

import {useUser} from "../../context/user-context";
import {getUserVotingAddress, get2faInfoUser} from "../../utils/request";
// TODO: Move to api
// import signVote from "../../utils/sign-vote";
import {voteProposal} from "../../utils/request";
import AddressItem from "./AddressItem";

import CustomModal from "../global/CustomModal";
import Modal2FA from "../profile/2FA/Modal2FA";
import {decryptVotingKey} from "../../utils/encryption";

/**
 * Component to show the voting address list of the user
 * @component
 * @subcategory Governance
 * @param {Object} proposal the single proposal passed from the father
 * @param {number} vote the type of vote
 * @param {*} onAfterVote function used after the user has voted
 * @example
 * const proposal = {}
 * const vote = 1
 * const onAfterVote = () => {}
 * return (
 *  <AddressList proposal={proposal} vote={vote} onAfterVote={onAfterVote} />
 * )
 */
const AddressList = ({proposal, vote, onAfterVote}) => {
  let {user} = useUser();
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [addressToVote, setAddressToVote] = useState([]);
  const [userSignInGAuth, setUserSignInGAuth] = useState(null);
  const [user2FA, setUser2FA] = useState(null);
  const [open2FAModal, setOpen2FAModal] = useState(false);
  const isMounted = useRef(false);

  const cancelSource = useMemo(() => axios.CancelToken.source(), []);

  /**
   * useEffect that fetch the address list of the API
   * @function
   */
  useEffect(() => {
    /**
     * Function that fetch the address list of the API
     * @function
     */
    const getAddressOfUser = async () => {
      setLoadingAddress(true);
      try {
        let { data, status } = await getUserVotingAddress({ hash: proposal.Hash, cancelToken: cancelSource.token })
        .catch((err) => {
          throw err;
        });
        if (data) {
          if (isMounted.current) {
            setLoadingAddress(false);
            setAddressList(data.nodes || []);

          }
        }
        else if (status === 204) {
          if (isMounted.current) { 
            setLoadingAddress(false);
          }
        }
        else {
          if (isMounted.current) {
            setLoadingAddress(false);
          }
        }
      } catch (error) {
        if (isMounted.current) {
          setLoadingAddress(false);
        }
      }
    };
    isMounted.current = true;
    getAddressOfUser();

    return () => {
      isMounted.current = false;
      cancelSource.cancel('The request has been canceled');
    }
  }, [cancelSource, proposal.Hash]);

  /**
   * Function that adds an address to the state of selected addresses
   * @function
   * @param {Object} address The address recently selected 
   */
  const addAddressVote = (address) => {
    setAddressToVote([...addressToVote, address]);
  };

  /**
   * Function that removes a address of the state of selected addresses
   * @function
   * @param {string} uid The address uid to remove
   */
  const removeAddressVote = (uid) => {
    let filteredAddress = addressToVote.filter((address) => address.uid !== uid);

    setAddressToVote(filteredAddress);
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
   * Function that is executed after the 2fa verification, it proceeds to take the selected addresses and vote with them through the API
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
    let addressVoted = []
    let addressErrorVote = []
    for await (const address of addressToVote) {
      const addrDecrypt=decryptVotingKey({privateKey:address.privateKey, txId:address.txId})
      const proposalVoteNo = {
        mnPrivateKey: addrDecrypt.privateKey,
        vinMasternode: addrDecrypt.txId,
        gObjectHash: proposal.Hash,
        voteOutcome: vote,
      };
      const voteData = { proposalVoteNo } // Send to api: signVote(proposalVoteNo)
      await voteProposal(voteData)
        .then(async data => {
          addressVoted.push({
            hash: proposal.Hash,
            votingOption: vote,
            message: data.data,
            name: address.name
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
          addressErrorVote.push({
            name: address.name,
            err: (voteData === 'Invalid network version') ? 'Invalid network version' : err.response.data.message
          })
        });
    }
    let stringOfAddressYes = addressVoted.map(address => {
      return `<li>${address.name}</li>`;
    }).join('');
    let stringOfAddressNo = addressErrorVote.map(address => {
      return `<li>${address.name}. Cause: ${address.err}</li>`;
    }).join('');
    await swal.fire({
        title: 'Voting results',
      html: `
        ${stringOfAddressYes ? '<p style="text-align: start; color:green; font-weight: bold">Successful votes:</p>' : ''}
        <ul style="text-align: start">${stringOfAddressYes}</ul>
        <br/>
        ${stringOfAddressNo ? '<p style="text-align: start; color: red; font-weight: bold">Unsuccessful votes:</p>' : ''}
        <ul style="text-align: start">${stringOfAddressNo}</ul>
      `
      }
    );
    onAfterVote();
  };


  return (
    <>
      <h3>{proposal.title || proposal.name}</h3>
      <p>Select the voting addresses to vote in the proposal</p>
      {addressList.length > 0 ? (
        <>
          <div className="form-group">
            <ul className="selector" style={{maxHeight: '180px', overflow: 'auto'}}>
              {addressList.map(address => (
                <AddressItem key={address.uid} vote={vote} hash={proposal.Hash} address={address} onAddAddress={addAddressVote} onRemoveAddress={removeAddressVote}/>
              ))}
            </ul>

          </div>
          <div className="form-actions-spaced text-center" style={{marginTop: '10px'}}>
            <button
              className="btn btn--blue"
              onClick={prepareVoting}
              disabled={addressToVote.length === 0}
            >Vote
            </button>
          </div>
        </>
      ) : (
        <>
          {
            loadingAddress && <p>Loading...</p>
          }
          {
            (!loadingAddress && addressList.length === 0) && <p>You don't have a voting address please add one</p>
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

export default AddressList;
