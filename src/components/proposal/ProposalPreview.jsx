import React from 'react'

export default function ProposalPreview({ title, description, url, payment}) {
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
