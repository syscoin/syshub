import React, {useEffect, useState} from "react";

import {useUser} from "../../context/user-context";
import {getUserMasterNodes} from "../../utils/request";
import signVote from "../../utils/sign-vote";
import {voteProposal} from "../../utils/request";
import MnItem from "./MnItem";
import swal from 'sweetalert2'

const MnList = ({proposal, vote, onAfterVote}) => {
  let {user} = useUser();
  const [loadingMN, setLoadingMN] = useState(false);
  const [masterNodes, setMasterNodes] = useState([]);
  const [masterNodesForVote, setMasterNodesForVote] = useState([]);

  const [masterNodesVote, setMasterNodesVote] = useState([])
  const [masterNodesErrorVote, setMasterNodesErrorVote] = useState([])

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
    // swal.fire('Sorry','solving error','info')
    await Promise.all(
      masterNodesForVote.map(async mn => {
        const proposalVoteNo = {
          mnPrivateKey: mn.privateKey,
          vinMasternode: mn.txId,
          gObjectHash: proposal.Hash,
          voteOutcome: vote,
        };
        const voteData = signVote(proposalVoteNo);
        return new Promise((resolve, reject) => {
          voteProposal(user.token, voteData)
            .then((data) => {
              console.log(data)
              if (RegExp(/\s-32603\s/).test(data)) {
                if (RegExp(/Failure to find masternode in list/).test(data)) {
                  resolve({
                    hash: proposal.Hash,
                    votingOption: vote,
                    message: 'Failure to find masternode in list',
                    mn: mn.name
                  })
                }
                if (RegExp(/Error voting/).test(data)) {
                  resolve({
                    hash: proposal.Hash,
                    votingOption: vote,
                    message: `Invalid proposal hash. Please check: ${proposal.Hash}`,
                    mn: mn.name
                  })

                }
              }

              if (RegExp(/\s-8\s/).test(data)) {
                if (RegExp(/mn tx hash must be hexadecimal string/).test(data)) {
                  resolve({
                    hash: proposal.Hash,
                    votingOption: vote,
                    message: `Invalid txid. Please check: ${mn.txId}`,
                    mn: mn.name
                  })
                }
              }

              if (data.data === 'Voted successfully') {
                resolve({
                  hash: proposal.Hash,
                  votingOption: vote,
                  message: data.data,
                  mn: mn.name
                })
              }
            })
            .catch((err) => {
              reject({
                mn: mn.name,
                err: err.message
              })
            });
        })
      })).then(resp => {
      console.log(resp)
    }).catch(err => {
      console.log(err)
    })
  };


  return (
    <>
      <h3>{proposal.title || proposal.name}</h3>
      <p>Select the masternodes to vote in the proposal</p>
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
