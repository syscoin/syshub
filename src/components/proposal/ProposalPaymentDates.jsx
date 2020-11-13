import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {calculatePaymentDates} from "../../utils/request";


const yearDayMonth = (dateInMills, format) => {
  const firstDay = `0${new Date(dateInMills).getDate()}`.slice(-2);
  const firstMonth = `0${parseInt(new Date(dateInMills).getMonth(), 10) + 1}`.slice(-2);
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
    <div className="">
      <div className="">
        {!isPayed && <i className="far fa-square" />}
        {isPayed && <i className="far fa-check-square" />}
      </div>
      <div className="">
        {yearDayMonth(epoch * 1000, 'usa')}
      </div>
    </div>
  );
};

const ProposalPaymentDates = ({nPayment, start_epoch, end_epoch, funded}) => {
  const [payoutDates, setPayoutDates] = useState();

  useEffect(() => {
    const getPaymentDates = async () => {
      const dates = await calculatePaymentDates(nPayment, start_epoch, end_epoch).catch(err => {
        throw err
      })
      console.log(dates)
      setPayoutDates(dates)
    }
    getPaymentDates()
  }, [nPayment, start_epoch, end_epoch]);
  
  return (
    <div className="">
      <div className="">
        <p>
          {`Payout dates approximately:`}
        </p>
      </div>
      <div className="">
        {!funded && <div className="">UNFUNDED</div>}
        {funded && !payoutDates }
        {funded &&
        payoutDates &&
        payoutDates.map((epoch, index) => (
          <PaymentDate key={index} epoch={epoch}/>
        ))}
      </div>
    </div>
  )
}


ProposalPaymentDates.defaultProps = {}

ProposalPaymentDates.propTypes = {}


export default ProposalPaymentDates;
