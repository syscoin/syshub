import React, {useEffect, useState} from "react";
import {useUser} from "../../context/user-context";
import {getUserMasterNodes} from "../../utils/request";
import signVote from '../../utils/sign-vote';
import {voteProposal} from '../../utils/request';

const MnList = ({proposal}) => {
  let {user} = useUser();
  const [masterNodes, setMasterNodes] = useState([]);
  const [masterNodesSelected, setMasterNodesSelected] = useState([]);
  const [masterNodesForVote, setMasterNodesForVote] = useState([])
  useEffect(() => {
    console.log(proposal)
    const getMnByUser = async () => {
      let {data} = await getUserMasterNodes(user.token).catch(err => {
        throw err
      })
      setMasterNodes(data.nodes)
    }
    getMnByUser()
  }, [])

  const addMnVote = (item) => {
    console.log(item)
    setMasterNodesSelected(item.uid)
    setMasterNodesForVote([...masterNodesForVote,item])
  }

  const removeMnVote = (uid) => {
    let selected = masterNodesSelected.filter(elem => elem.uid !== uid)
    console.log(selected)
    setMasterNodesSelected(selected)

  }
  const vote = async (voteOutcome = 1) => {
    console.log(masterNodesForVote)
    let r = await Promise.all(masterNodesForVote.map(async mn => {
      const proposalVoteNo = {
        mnPrivateKey: mn.privateKey,
        vinMasternode: mn.txId,
        gObjectHash: proposal.Hash,
        voteOutcome
      };
      const voteData = signVote(proposalVoteNo)
      await voteProposal(voteData).then(data => {
        console.log(data)
      }).catch(err => {
        console.log(err)
      })
    }))
    console.log(r)
  }

  return (
    <>
      {masterNodes.length > 0 ?
        <div>
          <p>seleccione los mn para con los cuales votara</p>
          <button onClick={vote}>vote</button>
          {
            masterNodes.map((item) => {
              return (
                <li
                  key={item.uid}
                  onClick={() => {
                    addMnVote(item)
                  }}
                >
                  <span>
                    {item.name}
                  </span>
                </li>
              )
            })
          }
        </div>
        :
        <div>
          loading....
        </div>
      }
    </>
  )
}

export default MnList;
