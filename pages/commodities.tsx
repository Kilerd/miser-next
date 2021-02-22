import {ProtectRoute} from "../contexts/auth";
import {connect} from 'react-redux'
import {State} from "../store";
import React, {useState} from "react";
import AuthenticationLayout from "../components/authenticationLayout";
import {userLedger} from "../contexts/ledger";
import NewCommodityModal from "../components/NewCommodityModal";


function Commodities(state: State) {
  const ledgerContext = userLedger();
  const [modalIsOpen, setIsOpen] = useState(false);


  const commoditiesDOM = Object.values(ledgerContext.commodities).map(one => (
    <div key={one.id}>{one.name}</div>
  ));
  return (
    <AuthenticationLayout>
      <h1>Commodities</h1>
      <NewCommodityModal modalStatus={modalIsOpen} setModalStatus={setIsOpen}/>
      <button onClick={() => setIsOpen(true)}> new</button>
      {commoditiesDOM}
    </AuthenticationLayout>
  )
}


export default connect(state => state)(ProtectRoute(Commodities))
