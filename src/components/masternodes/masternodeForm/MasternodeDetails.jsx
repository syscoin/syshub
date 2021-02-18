import React from 'react';
import WAValidator from '@swyftx/api-crypto-address-validator/dist/wallet-address-validator.min.js';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";

const schema = yup.object().shape({
  collateralHash: yup.string(),
  collateralIndex: yup.string(),
  ipAddress: yup.string(),
  ownerAddress: yup.string()
    // .test(
    //   'test-sys-address',
    //   'Must be a valid Syscoin address',
    //   async (value) => await WAValidator.validate(value, 'sys')
    // )
  ,
  operatorPubKey: yup.string(),
  operatorReward: yup.number()
    .transform(value => (isNaN(value) ? undefined : value))
    .required('The amount is required')
    .typeError('Must be a number')
    .positive('Must be a positive number'),
  payoutAddress: yup.string()
    .required('The payment address is required')
    // .test(
    //   'test-sys-address',
    //   'Must be a valid Syscoin address',
    //   async (value) => await WAValidator.validate(value, 'sys')
    // )
  ,
  fundAddress: yup.string()
    // .test(
    //   'test-sys-address',
    //   'Must be a valid Syscoin address',
    //   async (value) => await WAValidator.validate(value, 'sys')
    // )
  ,
});


/**
 * Component of the masternode register form
 * @component
 * @subcategory masternodes
 * @param {*} onNext function that gets executed after the form is submitted
 * @example
 * const onNext = () => {}
 * return (
 *  <MasternodeDetails onNext={onNext} />
 * )
 */
const MasternodeDetails = ({ onNext }) => {


  const { register, watch, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  });
  



  return (
    <form>
      
    </form>
  )
}

export default MasternodeDetails;
