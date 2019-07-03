import React, { useState, useEffect } from 'react';

// Import Services
import { calculatePaymentDates } from '../../../API/syscoin/proposals.service';

// Import lib components
import LinearProgress from '@material-ui/core/LinearProgress';
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

const PaymentDate = ({ epoch }) => {
  const [isPayed, setPayed] = useState(true);
  const nowEpoch = Math.round(new Date().getTime() / 1000);
  useEffect(() => setPayed(nowEpoch > epoch), [nowEpoch, epoch]);
  return (
    <div className="paymentDateItemContainer">
      <div className="paymentDateItemStatus">
        {!isPayed && <i class="far fa-square" />}
        {isPayed && <i class="far fa-check-square" />}
      </div>
      <div className="paymentDateItemDate">
        {yearDayMonth(epoch * 1000, 'usa')}
      </div>
    </div>
  );
};

const ProposalPaymentDates = ({ data }) => {
  const [payoutDates, setPayoutDates] = useState();

  const { nPayment, start_epoch, end_epoch, first_epoch, funded } = data;
  useEffect(() => {
    const getPaymentDates = async () => {
      const dates = await calculatePaymentDates(
        nPayment,
        start_epoch,
        end_epoch,
        first_epoch
      );
      setPayoutDates(dates);
    };
    getPaymentDates();
  }, [nPayment, start_epoch, end_epoch, first_epoch]);

  return (
    <div className="paymentDatesWrapper">
      <div className="">
        <Typography variant="subheading" gutterBottom>
          {`Payout dates approximately:`}
        </Typography>
      </div>
      <div className="paymentDatesContainer">
        {!funded && <div className="paymentDatesUnfunded">UNFUNDED</div>}
        {funded && !payoutDates && <LinearProgress />}
        {funded &&
          payoutDates &&
          payoutDates.map((epoch, index) => (
            <PaymentDate key={index} epoch={epoch} />
          ))}
      </div>
    </div>
  );
};

export default ProposalPaymentDates;
