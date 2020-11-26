import React, {useEffect, useState} from "react";
import swal from 'sweetalert2'

import {useUser} from "../../context/user-context";
import {getUserMasterNodes, voteIn, get2faInfoUser} from "../../utils/request";
import signVote from "../../utils/sign-vote";
import {voteProposal} from "../../utils/request";
import MnItem from "./MnItem";

import CustomModal from "../global/CustomModal";
import Modal2FA from "../profile/2FA/Modal2FA";

const MnList = ({proposal, vote, onAfterVote}) => {
  let {user} = useUser();
  const [loadingMN, setLoadingMN] = useState(false);
  const [masterNodes, setMasterNodes] = useState([]);
  const [masterNodesForVote, setMasterNodesForVote] = useState([]);
  const [userSignInGAuth, setUserSignInGAuth] = useState(null);
  const [user2FA, setUser2FA] = useState(null);
  const [open2FAModal, setOpen2FAModal] = useState(false);

  useEffect(() => {
    const getMnByUser = async () => {
      setLoadingMN(true);
      let {data} = await getUserMasterNodes().catch((err) => {
        throw err;
      });
      console.log(data);
      setLoadingMN(false);
      setMasterNodes(data.nodes || []);
    };
    getMnByUser();
    // eslint-disable-next-line
  }, []);

  const addMnVote = (mn) => {
    setMasterNodesForVote([...masterNodesForVote, mn]);
  };

  const removeMnVote = (uid) => {
    let filteredMN = masterNodesForVote.filter((mn) => mn.uid !== uid);

    setMasterNodesForVote(filteredMN);

  };

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
          await voteIn(mn.uid, {
            hash: proposal.Hash,
            txId:mn.txId,
            votingOption: String(vote)
          }).then(() => {
            masterNodesVote.push({
              hash: proposal.Hash,
              votingOption: vote,
              message: data.data,
              mn: mn.name
            })
          })
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
