import React, {FC} from 'react';
import {AppProps} from 'next/app'
import {stateWrapper} from '../store';
import {AuthProvider} from "../contexts/auth";

const WrappedApp: FC<AppProps> = ({Component, pageProps}) => (
  <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>

);

export default stateWrapper.withRedux(WrappedApp);