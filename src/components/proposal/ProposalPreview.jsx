import React from 'react';

/**
 * Component to show the Proposal preview
 * @component
 * @subcategory Proposal
 * @param {string} title title of the proposal
 * @param {string} description description of the proposal
 * @param {string} url url of the proposal
 * @param {Object} payment payment data of the proposal
 * @example
 * const title = ''
 * const description = ''
 * const url = ''
 * const payment = {}
 * return (
 *  <DescriptionProposal title={title} description={description} url={url} payment={payment} />
 * )
 */
function ProposalPreview({ title, description, url, payment }) {
  
  return (
    <div className="proposals">
      <div className="proposal" style={{float: 'none'}}>
        <label style={{fontSize: '24px'}}>{title}</label>
        <div dangerouslySetInnerHTML={{ __html: description }} style={{margin:'0 10px'}}></div>
        <label>{url || 'No URL was given'}</label>
        {
          payment && (
            <>
              <div>
                <label>{payment.paymentAmount*payment.paymentNumber} SYS in {payment.paymentNumber} payment(s)</label>
              </div>
              <div>
                <label style={{lineBreak: 'anywhere'}}>Address: {payment.paymentAddress}</label>
              </div>
            </>
          )
        }
      </div>

    </div>
  )
}

export default ProposalPreview;