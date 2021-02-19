import React from 'react';
import {useTranslation} from 'react-i18next';
import Title from '../global/Title';
import MasternodeForm from './MasternodeForm';


export const MasternodeRegister = () => {
  const {t} = useTranslation();

  return (
    <>
      <Title heading={t("check.register.title")} />
      <MasternodeForm />
    </>
  )
}
