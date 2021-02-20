import React, {createContext, useContext, useEffect, useState} from "react";
import Cookies from 'js-cookie'
import api from "../api";
import {useAuth, User} from "./auth";
import useSWR from "swr";
import dayjs from "dayjs";


interface TransactionMap {
  [date: string]: any[]
}

interface AccountMap {
  [id: number]: any[]
}

interface LedgerContext {
  ledger_id: string | undefined,
  transactions: TransactionMap,

  getAccountAlias(id: number): string,
}


function initCurrentLedger(user: User | undefined): string | undefined {
  return Cookies.get("CURRENT_LEDGER_ID") || (user?.ledgers.length > 0 ? user?.ledgers[0].toString() : undefined);
}

function initContext(): LedgerContext {
  return {
    ledger_id: Cookies.get("CURRENT_LEDGER_ID"),
    transactions: {}
  } as LedgerContext
}


const LedgerContext = createContext(initContext());
export const userLedger = () => useContext(LedgerContext)


export const LedgerProvider = ({children}) => {

  const {user} = useAuth();
  const [ledgerId, setLedgerId] = useState(initCurrentLedger(user));
  const [transactions, setTransactions] = useState({});
  const [accounts, setAccounts] = useState({});

  async function loadTransactions() {
    const {data: trxRes} = await api.get(`/ledgers/${ledgerId}/journals`);
    const raw_directives = trxRes.data;
    let groupedTransactions: { [key: string]: any } = {}
    for (let it of raw_directives) {
      const date = dayjs(it.create_time).format('YYYY-MM-DD');
      if (groupedTransactions[date] === undefined) {
        groupedTransactions[date] = []
      }
      groupedTransactions[date].push(it)
    }
    setTransactions(groupedTransactions);
  }

  async function loadAccount() {
    const {data: accountRes} = await api.get(`/ledgers/${ledgerId}/accounts`);
    const accountsData = accountRes.data;
    let accountMap: { [key: string]: any } = {}
    for (let it of accountsData) {
      accountMap[it.id] = it;
    }
    setAccounts(accountMap);
  }


  useEffect(() => {
    console.log("ledgerId changed", ledgerId);
    if (ledgerId !== undefined) {
      loadAccount();
      loadTransactions();
    }
  }, [ledgerId])

  const getAccountAlias = (id: number) => {
    let account = accounts[id];
    return account?.alias || account?.full_name;
  }


  return (
    <LedgerContext.Provider value={{ledger_id: ledgerId, transactions, getAccountAlias}}>
      {children}
    </LedgerContext.Provider>
  )
}
