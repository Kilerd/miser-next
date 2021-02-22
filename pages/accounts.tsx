import {ProtectRoute, useAuth} from "../contexts/auth";
import {connect} from 'react-redux'
import {State} from "../store";
import React from "react";
import AuthenticationLayout from "../components/authenticationLayout";
import {userLedger} from "../contexts/ledger";
import AccountListItem from "../components/AccountListItem";
import {Account, AccountListItemType} from "../types";


export function accountTreeGenerator(value: { [id: number]: Account }) {
  let ret: { [name: string]: AccountListItemType } = {
    liabilities: {
      name: 'Liabilities',
      fullName: 'Liabilities',
      isAvailable: false,
      amount: "0",
      children: {},
      commodities: [],
    },
    assets: {
      name: 'Assets',
      fullName: 'Assets',
      isAvailable: false,
      amount: "0",
      children: {},
      commodities: [],
    }, equity: {
      name: 'Equity',
      fullName: 'Equity',
      isAvailable: false,
      amount: "0",
      children: {},
      commodities: [],
    }, expenses: {
      name: 'Expenses',
      fullName: 'Expenses',
      isAvailable: false,
      amount: "0",
      children: {},
      commodities: [],
    }, income: {
      name: 'Income',
      fullName: 'Income',
      isAvailable: false,
      amount: "0",
      children: {},
      commodities: [],
    }
  };
  Object.values(value).forEach(it => {
    let strings = it.full_name.split(':');
    let accountType = strings[0].toLocaleLowerCase();
    let targetCategory = ret[accountType];
    for (let i = 1; i < strings.length - 1; i++) {
      let item = strings[i];
      if (!(item in targetCategory.children)) {
        targetCategory.children[item] = {
          name: item,
          fullName: strings.slice(0, i + 1).join(':'),
          isAvailable: false,
          amount: "0",
          commodities: [],
          children: {}
        }
      }
      targetCategory = targetCategory.children[item];
    }
    let leafItem = strings[strings.length - 1];
    if (targetCategory.children[leafItem] === undefined) {
      targetCategory.children[leafItem] = {
        name: leafItem,
        fullName: it.full_name,
        isAvailable: true,
        alias: it.alias,
        commodities: it.commodities,
        amount: it.amount,
        id: it.id,
        children: {}
      }
    } else {
      targetCategory.children[leafItem].isAvailable = true;
      targetCategory.children[leafItem].alias = it.alias;
      targetCategory.children[leafItem].commodities = it.commodities;
      targetCategory.children[leafItem].amount = it.amount;
      targetCategory.children[leafItem].id = it.id;
    }

  })
  return ret;
}


function Dashboard(state: State) {

  const {user} = useAuth();
  const ledgerContext = userLedger();

  const accountTreeGenerator1 = accountTreeGenerator(ledgerContext.accounts);
  console.log(accountTreeGenerator1)

  const accounts = Object.values(accountTreeGenerator1).map(one => <AccountListItem key={one.fullName} {...one}/>)
  return (
    <AuthenticationLayout>
      <h1>Accounts</h1>
      {accounts}
    </AuthenticationLayout>
  )
}


export default connect(state => state)(ProtectRoute(Dashboard))
