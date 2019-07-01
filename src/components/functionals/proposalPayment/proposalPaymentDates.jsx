import React, { useState, useEffect } from 'react';

// Import lib components
import Typography from '@material-ui/core/Typography';

// import CSS styles
import './proposalPaymentDates.scss';

const yearDayMonth = (dateInMills, format) => {
  const firstDay = `0${new Date(dateInMills).getDate()}`.slice(-2);
  const firstMonth = `0${parseInt(new Date(dateInMills).getMonth(), 10) +
    1}`.slice(-2);
  const firstYear = new Date(dateInMills).getFullYear();

  switch (format) {
    case 'usa':
      return `${firstMonth}/${firstDay}/${firstYear}`;
    case 'eu':
      return `${firstDay}/${firstMonth}/${firstYear}`;
    default:
      return `${firstYear}-${firstMonth}-${firstDay}`;
  }
};

const PaymentDate = ({ epoch }) => (
  <div>{yearDayMonth(epoch * 1000, 'usa')}</div>
);

const ProposalPaymentDates = () => {
  const [payoutDates, setPayoutDates] = useState([]);

  useEffect(() => setPayoutDates(calcPayoutDates()), []);

  const calcPayoutDates = () => [
    new Date().getTime() / 1000,
    new Date().getTime() / 1000,
    new Date().getTime() / 1000,
    new Date().getTime() / 1000,
    new Date().getTime() / 1000,
    new Date().getTime() / 1000,
    new Date().getTime() / 1000,
    new Date().getTime() / 1000,
    new Date().getTime() / 1000
  ];

  return (
    <div className="paymentDateWrapper">
      <div className="">
        <Typography variant="subheading" gutterBottom>
          {`Payout dates approximately:`}
        </Typography>
      </div>
      <div className="paymentDateContainer">
        {payoutDates.map((epoch, index) => (
          <PaymentDate key={index} epoch={epoch} />
        ))}
      </div>
    </div>
  );
};

export default ProposalPaymentDates;
