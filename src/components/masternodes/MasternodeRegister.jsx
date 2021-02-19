import React from 'react';
import {useTranslation} from 'react-i18next';
import Title from '../global/Title';
import MasternodeForm from './MasternodeForm';


export const MasternodeRegister = () => {
  const {t} = useTranslation();

  const generatePrepareCommand = (collateralHash, collateralIndex, ipAddress, ownerKeyAddr, operatorPubKey, votingKeyAddr, operatorReward, payoutAddress, feeSourceAddress) => {
    return `protx_register_prepare ${collateralHash} ${collateralIndex} ${ipAddress}:18369 ${ownerKeyAddr} ${operatorPubKey} ${votingKeyAddr} ${votingKeyAddr} ${operatorReward} ${payoutAddress} ${feeSourceAddress || ''}`.trim();
  }

  const generateSingCommand = (collateralAddress, signMessage) => {
    if (collateralAddress.startsWith('sys') || collateralAddress.startsWith('tsys')) {
      return `signmessagebech32 ${collateralAddress} ${signMessage}`.trim();
    } else {
      return `signmessage ${collateralAddress} ${signMessage}`.trim();
    }
  }

  const generateSubmitCommand = (tx, sig) => {
    return `protx_register_submit ${tx} ${sig}`.trim();
  }

  return (
    <>
      <Title heading={t("check.register.title")}/>
      <MasternodeForm/>
    </>
  )
}
