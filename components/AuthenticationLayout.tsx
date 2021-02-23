import styles from './layout.module.scss'
import Nav from "./Nav";
import LedgerChoicer from "./LedgerChoicer";
import React from "react";

export default function AuthenticationLayout({children}) {
  return <main>
    <Nav />
    <LedgerChoicer/>
    {children}
  </main>
}
