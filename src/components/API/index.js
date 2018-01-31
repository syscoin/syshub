import { fire } from '../../firebase';

const checkVoted = (user, proposal) => {
  return new Promise((resolve, reject) => {
    fire
      .database()
      .ref('votes/' + user.uid)
      .child(proposal.Hash)
      .once('value')
      .then(snap => {
        if (snap.val() !== null) {
          resolve(true);
          return;
        }
        resolve(false);
      })
      .catch(err => {
        resolve(err);
      });
  });
};

const voted = (user, proposal, voteTxt, voteId) => {
  fire
    .database()
    .ref('votes/' + user.uid)
    .child(proposal.Hash)
    .set({ proposalId: proposal.Hash, voteTxt: voteTxt, voteId: voteId });
};

export { checkVoted, voted };
