import {useAuth} from "../contexts/auth";
import {userLedger} from "../contexts/ledger";
import React from "react";
import styles from './layout.module.scss'

export default function LedgerChoicer() {
  const {user} = useAuth();
  const ledgerContext = userLedger();


  const ledgers = user.ledgers.map(one => {
    const name = ledgerContext.ledgers[one]?.name;
    return <a key={one} onClick={() => ledgerContext.changeLedgerId(one)}>{name}</a>
  })
  return (
    <>
      <nav className={styles.nav}>
        {ledgers}
      </nav>
    </>
  )
}
