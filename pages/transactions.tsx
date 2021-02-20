import {ProtectRoute} from "../contexts/auth";
import {connect, useDispatch} from 'react-redux'
import {State, stateWrapper} from "../store";
import React, {useEffect} from "react";
import {userLedger} from "../contexts/ledger";
import TransactionGrop from "../components/TransactionGrop";

export const getServerSideProps = stateWrapper.getServerSideProps(({store, req, res, ...etc}) => {
  // console.log('2. Page.getServerSideProps uses the store to dispatch things');
  store.dispatch({type: 'TICK', payload: 'was set in other page'});
})


function Transactions(state: State) {

  console.log("start transaction page")
  // const {data, error} = useSWR("/user", apiFetcher);

  const {ledger_id, transactions} = userLedger();
  console.log(transactions);
  const transactionGroups  = Object.entries(transactions).sort((a, b) => new Date(a[0]) - new Date(b[0])).reverse().map(item => {
    const [date, trxs] = item;

    return <TransactionGrop key={date} date={date} items={trxs} />
  })


  return (
    <>
      <h1>Transactions for ledger {ledger_id}</h1>
      {transactionGroups}

    </>

  )
}


export default connect(state => state)(ProtectRoute(Transactions))
