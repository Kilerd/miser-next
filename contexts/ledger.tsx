import React, {createContext, useContext, useEffect, useState} from "react";
import Cookies from 'js-cookie'
import api from "../api";
import {useAuth} from "./auth";
import useSWR from "swr";
import dayjs from "dayjs";
import {Account, Commodity, RESOURCE_TYPE, User} from "../types"


interface IdMap<DATA> {
  [id: number]: DATA
}

interface NameMap<DATA> {
  [name: string]: DATA
}


interface TransactionMap {
  [date: string]: any[]
}


interface LedgerContext {
  ledger_id: string | undefined,
  transactions: TransactionMap,
  ledgers: IdMap<any>,
  accounts: IdMap<Account>,
  commodities: NameMap<Commodity>

  getAccountAlias(id: number): string,

  changeLedgerId(id: string): void,

  loadCommodities(): void;
  update(type: RESOURCE_TYPE): void;
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

  let initialState = initCurrentLedger(user);
  const [ledgerId, setLedgerId] = useState(initialState);
  const [transactions, setTransactions] = useState({});
  const [accounts, setAccounts] = useState({} as IdMap<Account>);
  const [ledgers, setLedgers] = useState({});
  const [commodities, setCommodities] = useState({} as NameMap<Commodity>);


  const update = async (type: RESOURCE_TYPE) => {
    switch (type) {
      case "TRANSACTIONS":
        await loadTransactions();
        break;
      case "ACCOUNT":
        await loadAccount();
        break;
    }
  }


  async function loadTransactions() {
    const groupedTransactions = await api.loadTransactions();
    setTransactions(groupedTransactions);
  }

  async function loadAccount() {
    const accountMap = await api.loadAccount();
    setAccounts(accountMap);
  }

  const loadCommodities = async () => setCommodities(await api.loadCommodities());

  async function loadLedgers() {
    const data = await api.loadLedgers();
    setLedgers(data);
  }


  useEffect(() => {
    console.log("ledgerId changed", ledgerId);
    api.setLedgerId(ledgerId);
    if (ledgerId !== undefined) {
      loadAccount();
      loadCommodities();
      loadTransactions();
    }
  }, [ledgerId])

  useEffect(() => {
    loadLedgers();
  }, [])

  const getAccountAlias = (id: number) => {
    let account = accounts[id];
    return account?.alias || account?.full_name;
  }

  const changeLedgerId = (id: string) => {
    Cookies.set("CURRENT_LEDGER_ID", id, {expires: 60})
    api.setLedgerId(id);
    setLedgerId(id);
  }

  return (
    <LedgerContext.Provider
      value={{
        ledger_id: ledgerId, transactions, ledgers, accounts, commodities,
        getAccountAlias, changeLedgerId,
        loadCommodities, update
      }}>
      {children}
    </LedgerContext.Provider>
  )
}
