import React from 'react';

export default function ProposalCard() {
  return (
    <div className="proposal">
      <div className="vote-count">
        <span className="yes">85</span>
        <span className="no">23</span>
        <div className="passed"><i className="demo-icon icon-ok"></i> Passed</div>
      </div>
      <div className="description">
        <div className="date">12th May 2020</div>
        Syscoin Foundation June Proposal<br />
        <div className="budget">
          480.000 SYS<br />
          240.000 SYS /month (2 months)
        </div>
      </div>
      <div className="actions">
        <a href="#" className="vote" title="Vote yes"><i className="icon-up-open"></i></a>
        <a href="#" className="vote" title="More info"><i className="icon-info"></i></a>
        <a href="#" className="vote" title="Vote no"><i className="icon-down-open"></i></a>
      </div>
    </div>
  )
}
