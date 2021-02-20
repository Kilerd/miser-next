import React, {FC} from 'react';
import {AppProps} from 'next/app'
import {stateWrapper} from '../store';
import {useStore} from 'react-redux'
import {AuthProvider} from "../contexts/auth";

const WrappedApp: FC<AppProps> = ({Component, pageProps}) => {
    const store = useStore();
    console.log("wrapper", store);
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>

    )
};

export default stateWrapper.withRedux(WrappedApp);
