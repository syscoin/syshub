/* eslint-disable flowtype/require-valid-file-annotation */

import React, { useState } from 'react';
import { withRoot } from '../../HOC';
import appFooterStyle from './appFooter.style';

const AppFooter = () => {
  const [appVersion, setAppVersion] = useState(process.env.REACT_APP_VERSION);
  return (
    <div style={appFooterStyle.wrapper}>
      <div style={appFooterStyle.footerTxt}>
        {`© 2018 Syscoin Foundation with contributions from Blockchain Foundry Inc.`}{' '}
      </div>
      <div style={appFooterStyle.footerVersion}>{`v${appVersion}`}</div>
    </div>
  );
};

export default withRoot(AppFooter);
