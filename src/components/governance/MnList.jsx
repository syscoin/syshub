import React, {useEffect, useState} from "react";

import {useUser} from "../../context/user-context";
import {getUserMasterNodes, voteIn} from "../../utils/request";
import signVote from "../../utils/sign-vote";
import {voteProposal} from "../../utils/request";
import MnItem from "./MnItem";
import swal from 'sweetalert2'

const MnList = ({proposal, vote, onAfterVote}) => {
  let {user} = useUser();
  const [loadingMN, setLoadingMN] = useState(false);
  const [masterNodes, setMasterNodes] = useState([]);
  const [masterNodesForVote, setMasterNodesForVote] = useState([]);

  useEffect(() => {
    const getMnByUser = async () => {
      setLoadingMN(true);
      let {data} = await getUserMasterNodes(user.token).catch((err) => {
        throw err;
      });
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

  const voting = async () => {
    let masterNodesVote = []
    let masterNodesErrorVote = []
    for await (const mn of masterNodesForVote) {
      const proposalVoteNo = {
        mnPrivateKey: mn.privateKey,
        vinMasternode: mn.txId,
        gObjectHash: proposal.Hash,
        voteOutcome: vote,
      };
      const voteData = signVote(proposalVoteNo);
      await voteProposal(user.token, voteData)
        .then(async data => {
          await voteIn(user.token, mn.uid, {
            hash: proposal.Hash,
            votingOption: String(vote)
          }).then(() => {
            masterNodesVote.push({
              hash: proposal.Hash,
              votingOption: vote,
              message: data.data,
              mn: mn.name
            })
          }).catch(err => {
            console.log(err)
          })
        })
        .catch(err => {
          masterNodesErrorVote.push({
            mn: mn.name,
            err: err.response.data.message
          })
        });
    }
    swal.fire('finished process', `<p>Votos success:${JSON.stringify(masterNodesVote)}</p><br><p>Votos no success:${JSON.stringify(masterNodesErrorVote)}</p>`, 'info')
  };


  return (
    <>
      <h3>{proposal.title || proposal.name}</h3>
      <p>Select the masternodes to vote with</p>
      {masterNodes.length > 0 ? (
        <>
          <div className="form-group">
            <ul className="selector">
              {masterNodes.map(mn => (
                <MnItem key={mn.uid} mn={mn} onAddMN={addMnVote} onRemoveMN={removeMnVote}/>
              ))}
            </ul>

          </div>
          <div className="form-actions-spaced text-center" style={{marginTop: '10px'}}>
            <button
              className="btn btn--blue"
              onClick={voting}
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
    </>
  );
};

export default MnList;
