import {ProtectRoute} from "../contexts/auth";
import {connect, useDispatch} from 'react-redux'
import {State, stateWrapper} from "../store";
import {useEffect} from "react";
import useSWR from "swr";
import {apiFetcher} from "../api";

export const getServerSideProps = stateWrapper.getServerSideProps(({store, req, res, ...etc}) => {
    // console.log('2. Page.getServerSideProps uses the store to dispatch things');
    store.dispatch({type: 'TICK', payload: 'was set in other page'});
})


function Transactions(state: State) {

    console.log("start transaction page")
    const {data, error} = useSWR("/user", apiFetcher);

    if (error) {
        return <div>error</div>
    }
    if (!data) return <div>loading...</div>

    console.log(data.data);
    return (
        <div>Transactions
            <p>{state.tick}</p>
            <p>{data.data.username}</p>
        </div>
    )
}


export default connect(state => state)(ProtectRoute(Transactions))
