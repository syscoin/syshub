import React, {useEffect, useState, useMemo} from 'react';
import WAValidator from '@swyftx/api-crypto-address-validator/dist/wallet-address-validator.min.js';
import {useForm} from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers';
import * as yup from "yup";
import axios from 'axios';


import {nextGovernanceRewardInfo} from "../../utils/request";

const schema = yup.object().shape({
  paymentNumber: yup.number()
    .transform(value => (isNaN(value) ? undefined : value))
    .required('The number of payments is required')
    .integer('Must be an integer number')
    .typeError('Must be a number')
    .positive('Must be a positive number'),
  paymentAmount: yup.number()
    .transform(value => (isNaN(value) ? undefined : value))
    .required('The amount is required')
    .typeError('Must be a number')
    .positive('Must be a positive number'),
  paymentAddress: yup.string()
    .required('The payment address is required')
    .test('test-sys-address', 'Must be a valid Syscoin address', async (value) => await WAValidator.validate(value, 'sys')
    )
});

const PaymentProposal = ({onNext, onBack}) => {
  const [paymentQuantity, setPaymentQuantity] = useState(1);
  const [nextGovernanceDate, setNextGovernanceDate] = useState();
  const [proposalStartEpoch, setProposalStartEpoch] = useState();
  const [proposalEndEpoch, setProposalEndEpoch] = useState();
  const [proposalPayoutDates, setProposalPayoutDates] = useState([]);
  const [amount, setAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [theDatesWereLoaded, setTheDatesWereLoaded] = useState(false);

  const cancelSource = useMemo(() => axios.CancelToken.source(), []);

  const {register, watch, handleSubmit, errors} = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: {
      paymentNumber: 1
    }
  });

  const watchedAmount = watch('paymentAmount');
  const watchNPayment = watch('paymentNumber');


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

  const lastPaymentCalculator = (nPayments, nextGovernanceDate) => {
    const {
      rewardDateEpoch,
      superblockCycleEpoch,
      votingDeadLineEpoch
    } = nextGovernanceDate;

    const todayEpoch = Math.round(new Date().getTime() / 1000);
    const afterVotingDeadLine = todayEpoch >= votingDeadLineEpoch ? true : false;

    const firstRewardDateEpoch = rewardDateEpoch + (afterVotingDeadLine ? superblockCycleEpoch : 0);
    const proposalPayoutDates = [];
    for (let i = 0; i < nPayments; i++) {
      proposalPayoutDates.push(firstRewardDateEpoch + superblockCycleEpoch * i);
    }
    const gapEnsurePayment = superblockCycleEpoch / 2;
    const paymentInfo = {
      proposalPayoutDates,
      endEpoch: proposalPayoutDates[nPayments - 1] + gapEnsurePayment
    };
    return paymentInfo;
  };

  const getGovernanceDate = async () => {
    const nextGovernanceDate = await nextGovernanceRewardInfo(cancelSource.token)
    if (typeof nextGovernanceDate === "undefined") {
      return null
    } else {
      Object.assign(nextGovernanceDate);
      return nextGovernanceDate;
    }
  }

  const paymentQuantityValue = () => {
    if (typeof nextGovernanceDate !== "undefined") {
      const {endEpoch, proposalPayoutDates} = lastPaymentCalculator(
        watchNPayment,
        nextGovernanceDate
      );

      setProposalEndEpoch(endEpoch);
      setProposalPayoutDates(proposalPayoutDates);
      setAmount(watchedAmount);
      setTotalAmount(watchedAmount * watchNPayment)
      setPaymentQuantity(watchNPayment)
    } else {
      setProposalEndEpoch(0)
      setProposalPayoutDates([]);
      setAmount(watchedAmount);
      setTotalAmount(watchedAmount * watchNPayment)
      setPaymentQuantity(watchNPayment)
    }

  }

  useEffect(() => {
    const calculatePaymentDates = async () => {
      const nextGovernanceDate = await getGovernanceDate();
      if (nextGovernanceDate !== null) {
        const {endEpoch, proposalPayoutDates} = lastPaymentCalculator(
          paymentQuantity,
          nextGovernanceDate
        );
        const proposalStartEpoch = proposalPayoutDates[0];
        setProposalStartEpoch(proposalStartEpoch);
        setNextGovernanceDate(nextGovernanceDate);
        setProposalEndEpoch(endEpoch);
        setProposalPayoutDates(proposalPayoutDates);
        setTheDatesWereLoaded(true)
      } else {
        setTheDatesWereLoaded(false)
      }
    }
    calculatePaymentDates();
    return () => {
      cancelSource.cancel('The request has been canceled')
    };
    // eslint-disable-next-line
  }, [cancelSource])

  const nextPayment = (data) => {
    onNext({proposalStartEpoch, proposalEndEpoch, ...data});
  }


  return (
    <form className="input-form" onSubmit={handleSubmit(nextPayment)}>
      <div className="form-group">
        <label htmlFor="paymentNumber">Number of payments</label>
        <input
          type="number"
          id="paymentNumber"
          ref={register}
          name="paymentNumber"
          className="styled"
          onChange={paymentQuantityValue}
        />
        <ErrorMessage
          errors={errors}
          name="paymentNumber"
          render={({message}) => <small><p style={{lineHeight: '1.5'}}>{message}</p></small>}
        />
      </div>
      <div className="form-group">
        <label htmlFor="paymentAmount">Amount</label>
        <input
          type="number"
          id="paymentAmount"
          ref={register}
          name="paymentAmount"
          className="styled"
          onChange={paymentQuantityValue}
        />
        <small><p style={{lineHeight: '1.5'}}>{watchedAmount} SYS</p></small>
        <ErrorMessage
          errors={errors}
          name="paymentAmount"
          render={({message}) => <small><p style={{lineHeight: '1.5'}}>{message}</p></small>}
        />
      </div>
      <div className="form-group">
        <label htmlFor="paymentAddress">Payment address</label>
        <input
          type="text"
          id="paymentAddress"
          name="paymentAddress"
          className="styled"
          ref={register}
        />
        <ErrorMessage
          errors={errors}
          name="paymentAddress"
          render={({message}) => <small><p style={{lineHeight: '1.5'}}>{message}</p></small>}
        />
      </div>
      <p/>
      <h3>Payment Info:</h3>
      <div>
        <p>
          {`This proposal will result in ${paymentQuantity} payments of ${amount} SYS`}
        </p>
        <div>
          <div>{`Payout dates approximately:`}</div>
          <div
            className="payment-dates"
            style={{
              maxHeight: '200px',
              overflowY: 'auto',
              display: 'flex',
              flexFlow: 'row wrap'
            }}
          >
            {theDatesWereLoaded === true ?
              proposalPayoutDates.map((epoch, index) => {
                return (
                  <div key={index} style={{width: '50%'}}>
                    {yearDayMonth(epoch * 1000, 'usa')}
                  </div>
                );
              })
              : <>
                <p>There has been a problem loading the payment dates, please check your internet connection and reload the page!</p>
              </>
            }
          </div>
        </div>
        <p/>
        <p className="">
          {`Total amount: ${totalAmount || amount} SYS`}
        </p>
      </div>
      <div className="form-actions-spaced">
        <button className="btn btn--blue-border" type="button" onClick={onBack}>Back</button>
        <button className="btn btn--blue" type="submit" disabled={!theDatesWereLoaded}>Next</button>
      </div>
    </form>
  )
}

export default PaymentProposal;
