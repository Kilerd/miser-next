import {ProtectRoute} from "../contexts/auth";
import {connect} from 'react-redux'
import React, {useState} from "react";
import AuthenticationLayout from "../components/AuthenticationLayout";
import {useLedger} from "../contexts/ledger";
import NewCommodityModal from "../components/NewCommodityModal";


function Commodities() {
  const ledgerContext = useLedger();
  const [modalIsOpen, setIsOpen] = useState(false);


  const commoditiesDOM = Object.values(ledgerContext.commodities).map(one => (
    <div key={one.id}>{one.name}</div>
  ));
  return (
    <AuthenticationLayout>
      <h1>Commodities</h1>
      <NewCommodityModal modalStatus={modalIsOpen} setModalStatus={setIsOpen}/>
      <button onClick={() => setIsOpen(true)} className="button"> new</button>
      {commoditiesDOM}
    </AuthenticationLayout>
  )
}


export default ProtectRoute(Commodities)
