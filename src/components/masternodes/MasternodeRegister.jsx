import React from 'react';
import {useTranslation} from 'react-i18next';
import { Link } from 'react-router-dom';
import Title from '../global/Title';
import MasternodeForm from './MasternodeForm';


export const MasternodeRegister = () => {
  const {t} = useTranslation();

  return (
    <>
      <Title heading={t("check.register.title")} />
      <MasternodeForm />
      <div className="text-center article">
        <Link to="/masternodes" className="btn btn--blue-border">Masternodes</Link>
      </div>
    </>
  )
}
