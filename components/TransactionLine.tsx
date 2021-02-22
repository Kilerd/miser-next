import React from "react";
import Big from 'big.js'
import {userLedger} from "../contexts/ledger";

export default function TransactionLine({id, flag, narration, payee, create_time, lines}) {

  const {getAccountAlias} = userLedger();

  const outAccounts = lines.filter(value => new Big(value.cost[0]).s === -1).map(value => value.account);
  const inAccounts = lines.filter(value => new Big(value.cost[0]).s === 1).map(value => value.account);

  const outAccount = outAccounts.length !== 1 ? `${outAccounts.length} Accounts` : getAccountAlias(outAccounts[0])
  const inAccount = inAccounts.length !== 1 ? `${inAccounts.length} Accounts` : getAccountAlias(inAccounts[0])
  const outAmount = lines.filter(value => new Big(value.cost[0]).s === -1).map(value => value.cost[0]).reduce((sum, cur) => sum.add(cur), new Big(0));

  return (<tr>
    <td>{id}</td>
    <td>{create_time}</td>
    <td>{flag} {payee} {narration}</td>
    <td>{outAccount} ¥{outAmount.mul(-1).toFixed(2)} {inAccount}</td>
    <td><a>edit</a></td>
  </tr>)
}
