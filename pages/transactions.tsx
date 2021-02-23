import {ProtectRoute} from "../contexts/auth";
import {connect} from 'react-redux'
import {State, stateWrapper} from "../store";
import React, {useState} from "react";
import {userLedger} from "../contexts/ledger";
import TransactionGroup from "../components/TransactionGroup";
import AuthenticationLayout from "../components/AuthenticationLayout";
import NewCommodityModal from "../components/NewCommodityModal";
import NewTransactionModal from "../components/NewTransactionModal";

export const getServerSideProps = stateWrapper.getServerSideProps(({store, req, res, ...etc}) => {
  // console.log('2. Page.getServerSideProps uses the store to dispatch things');
  store.dispatch({type: 'TICK', payload: 'was set in other page'});
})


function Transactions(state: State) {
  const {ledger_id, transactions} = userLedger();

  const [newTrxStatus, setNewTrxStatus] = useState(false);

  const transactionGroups = Object.entries(transactions).sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()).reverse().map(item => {
    const [date, trxs] = item;
    return <TransactionGroup key={date} date={date} items={trxs}/>
  })

  return (
    <AuthenticationLayout>
      <h1>Transactions for ledger {ledger_id}</h1>
      <NewTransactionModal modalStatus={newTrxStatus} setModalStatus={setNewTrxStatus}/>
      <button onClick={() => setNewTrxStatus(true)} className="button"> new</button>
      {transactionGroups}
    </AuthenticationLayout>

  )
}

export default connect(state => state)(ProtectRoute(Transactions))
