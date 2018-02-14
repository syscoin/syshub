import React from 'react';

class test extends React.Component {
  test() {
    this.props
      .checkProposal(dataHex)
      .then(data => {
        if (data['Object status'] === 'OK') {
          return this.props.prepareProposal(prepareObj);
        }
      })
      .then(prepareResponse => {
        if (prepareResponse) {
          userProposal.prepareReceipt = prepareResponse;
          proposalRef.set(userProposal);

          return swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            title: 'Success',
            text: `"${prepareResponse}" \n \n Please copy and paste this code into your wallet terminal in order to obtain a payment id, once you have done that please paste the payment id into the input.`,
            icon: 'success',
            buttons: true,
            dangerMode: false,
            content: {
              element: 'input',
              attributes: {
                placeholder: 'Input payment id here',
                type: 'text'
              }
            }
          });
        } else {
          throw new Error('No prepare receipt');
        }
      })
      .then(paymentId => {
        let submitObj = { ...prepareObj };
        if (paymentId) {
          userProposal.txid = paymentId;
          proposalRef.set(userProposal);
          submitObj.txid = paymentId;
          return this.props.submitProposal(submitObj);
        } else {
          throw new Error('No paymentId received');
        }
      })
      .then(submitResponse => {
        if (submitResponse) {
          userProposal.submitReceipt = submitResponse;
          proposalRef.set(userProposal);

          return swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            title: 'Success',
            text: `"${submitResponse}" \n \n Please copy and paste this code into your wallet terminal in order to obtain a proposal hash, once you have done that please paste the proposal hash into the input. This could take a couple of minutes please be patient.`,
            icon: 'success',
            buttons: true,
            dangerMode: false,
            content: {
              element: 'input',
              attributes: {
                placeholder: 'Input proposal hash here',
                type: 'text'
              }
            }
          });
        } else {
          throw new Error('No submit receipt');
        }
      })
      .then(proposalHash => {
        if (proposalHash) {
          userProposal.hash = proposalHash;
          proposalRef.set(userProposal);

          swal({
            title: 'Success',
            text: 'Proposal has been created.',
            icon: 'success'
          });
        }
      })
      .catch(err => {
        alert(err);
      });
  }
  render() {
    return <div>Hi</div>;
  }
}

export default test;
