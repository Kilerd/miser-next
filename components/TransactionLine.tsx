import React from "react";
import Big from 'big.js'
import {userLedger} from "../contexts/ledger";
import classNames from "classnames";
import dayjs from 'dayjs'
import api from "../api";

export default function TransactionLine({id, flag, narration, payee, create_time, lines, is_balance, setEditId}) {

  const {getAccountAlias, update} = userLedger();


  // todo multiple commodities
  const outAccounts = lines.filter(value => new Big(value.cost[0]).s === -1).map(value => value.account);
  const inAccounts = lines.filter(value => new Big(value.cost[0]).s === 1).map(value => value.account);

  const outAccount = outAccounts.length !== 1 ? `${outAccounts.length} Accounts` : getAccountAlias(outAccounts[0])
  const inAccount = inAccounts.length !== 1 ? `${inAccounts.length} Accounts` : getAccountAlias(inAccounts[0])
  const outAmount = lines.filter(value => new Big(value.cost[0]).s === -1).map(value => value.cost[0]).reduce((sum, cur) => sum.add(cur), new Big(0));

  const s = dayjs(create_time).format("HH:mm");

  const deleteTrx = async (id) => {
    // setLoading(true);
    await api.deleteTransaction(id)
    // setLoading(false);
    update("TRANSACTIONS")
  }
  return (

    <>
      <div className={classNames("line", {
        error: flag !== "Complete",
        notBalance: !is_balance,
      })}>
        <div className="left">
          <div className="info"><span>{payee}</span> {narration}</div>
          <div className="time">{s}</div>
        </div>
        <div className="right">
          <div className="info">
            <div className="amount">¥{outAmount.mul(-1).toFixed(2)}</div>
            <div className="orientation">{outAccount} -{">"} {inAccount}</div>
          </div>
          <div className="operation">
            <a onClick={() => setEditId(id)}>edit</a>
            <a onClick={() => deleteTrx(id)}>delete</a>
          </div>
          </div>
      </div>
      <style jsx>{`
        .line {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 0.75rem;
          border-left: 1px solid rgb(213, 213, 218);
          border-right: 1px solid rgb(213, 213, 218);
          border-bottom: 1px solid rgb(213, 213, 218);

          :first-child {
            border-top: 1px solid rgb(213, 213, 218);
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
          }

          :last-child {
            border-bottom-left-radius: 3px;
            border-bottom-right-radius: 3px;
          }

          .left {
            display: flex;
            flex-direction: column;

            .info {
              font-size: 1.1rem;

              span {
                font-weight: 500;
              }
            }

            .time {
              font-size: 0.85rem;
              color: #b1b1b1;
            }
          }

          .right {
            display: flex;
            .info{
              display: flex;
              flex-direction: column;
              align-items: flex-end;
              .amount {
                font-size: 1.25rem;
              }
  
              .orientation {
                font-size: 0.85rem;
              }
            }
          }
        }

        .notBalance {
          border-left: 3px solid red;
        }
      `}</style>
    </>
  )
}
