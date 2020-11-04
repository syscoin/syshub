import React, {useEffect, useState} from 'react';
import WAValidator from '@swyftx/api-crypto-address-validator/dist/wallet-address-validator.min.js';
import {useForm} from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers';
import * as yup from "yup";
import ProposalPaymentDates from "./ProposalPaymentDates";
import {getInfo} from "../../utils/request";

const schema = yup.object().shape({
  paymentNumber: yup.number()
    .required('The number of payments is required')
    .typeError('Must be a number')
    .positive('Must be a positive number'),
  paymentAmount: yup.number()
    .required('The amount is required')
    .typeError('Must be a number')
    .positive('Must be a positive number'),
  paymentAddress: yup.string()
    .required('The payment address is required')
    .test('test-sys-address', 'Must be a valid Syscoin address', function (value) {
      return WAValidator.validate(value, 'sys');
    })
});

const PaymentProposal = ({onNext, onBack}) => {
  const [chainData, setChainData] = useState({});
  const {register, watch, handleSubmit, errors} = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  });

  const watchedAmount = watch('paymentAmount');
  const watchNPayment = watch('paymentNumber');

  useEffect(() => {
    const getChainInfoData = async () => {
      let {data} = await getInfo().catch(err => {
        throw err
      })
      console.log(data)
      setChainData(data)
    }
    getChainInfoData()
  }, [])

  return (
    <form className="input-form" onSubmit={handleSubmit(onNext)}>
      <div className="form-group">
        <label htmlFor="paymentNumber">Number of payments</label>
        <input
          type="number"
          id="paymentNumber"
          ref={register}
          name="paymentNumber"
          className="styled"
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
      {/*<ProposalPaymentDates nPayment={watchNPayment} start_epoch={chainData.start_epoch}/>*/}
      <div className="form-actions-spaced">
        <button className="btn btn--blue-border" type="button" onClick={onBack}>Back</button>
        <button className="btn btn--blue" type="submit">Next</button>
      </div>
    </form>
  )
}

export default PaymentProposal;
