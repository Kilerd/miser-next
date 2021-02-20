import React, {FC} from 'react';
import {AppProps} from 'next/app'
import {stateWrapper} from '../store';
import {useStore} from 'react-redux'
import {AuthProvider} from "../contexts/auth";
import {LedgerProvider} from "../contexts/ledger";

const WrappedApp: FC<AppProps> = ({Component, pageProps}) => {
    const store = useStore();
    console.log("wrapper", store);
    return (
        <AuthProvider>
            <LedgerProvider>
                <Component {...pageProps} />
            </LedgerProvider>
        </AuthProvider>

    )
};

export default stateWrapper.withRedux(WrappedApp);
