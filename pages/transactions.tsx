import {ProtectRoute} from "../contexts/auth";
import {connect} from 'react-redux'
import React, {useState} from "react";
import {useLedger} from "../contexts/ledger";
import TransactionGroup from "../components/TransactionGroup";
import AuthenticationLayout from "../components/AuthenticationLayout";
import NewTransactionModal from "../components/NewTransactionModal";
import EditTransactionModal from "../components/EditTransactionModal";
import dayjs from "dayjs";
import {State, stateWrapper} from "../store";

export const getServerSideProps = stateWrapper.getServerSideProps(({store, req, res, ...etc}) => {
  // console.log('2. Page.getServerSideProps uses the store to dispatch things');
  store.dispatch({type: 'TICK', payload: 'was set in other page'});
})


function Transactions(state: State) {
  console.log("init transaction page");
  const {ledger_id, transactions} = useLedger();


  let groupedTransactions: { [key: string]: any } = {}
  for (let it of Object.values(transactions)) {
    const date = dayjs(it.create_time).format('YYYY-MM-DD');
    if (groupedTransactions[date] === undefined) {
      groupedTransactions[date] = []
    }
    groupedTransactions[date].push(it)
  }

  const [newTrxStatus, setNewTrxStatus] = useState(false);

  const [editId, setEditId] = useState(null);
  const [editTrxStatus, setEditTrxStatus] = useState(false);
  const openEditTrxModal = (id) => {
    setEditId(id);
    setEditTrxStatus(true)
  };

  return (
    <>
      <AuthenticationLayout>
        <div className="container">
          <h1>Transactions for ledger {ledger_id}</h1>
          <NewTransactionModal modalStatus={newTrxStatus} setModalStatus={setNewTrxStatus}/>
          <EditTransactionModal editId={editId} modalStatus={editTrxStatus} setModalStatus={setEditTrxStatus}/>

          <button onClick={() => setNewTrxStatus(true)} className="button"> new</button>

          {Object.entries(groupedTransactions).sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()).reverse().map(item => {
            const [date, trxs] = item;
            return <TransactionGroup key={date} date={date} items={trxs} setEditId={openEditTrxModal}/>
          })}
        </div>
      </AuthenticationLayout>

      <style jsx>{`
        .container {

          max-width: 85%;
          margin: 0 auto;

        }
      `}</style>
    </>
  )
}

export default connect(state => state)(ProtectRoute(Transactions))
