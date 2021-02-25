import {AccountListItemType} from "../types";
import styles from './layout.module.scss'
import React from "react";

interface ModalStatus {
  openEditAccount: any
}


export default function AccountListItem({name, fullName, isAvailable, alias, commodities, amount, id, children, openEditAccount}: AccountListItemType & ModalStatus) {
  const commodities_map = commodities.map(one => <span key={one}>{one}</span>);
  const childrenDOM = Object.values(children).map(one =>
    <AccountListItem key={one.fullName} {...one} openEditAccount={openEditAccount}/>
  )
  return (

    <>
      <div className="account">
        <div className="content">
          <div className="left">
            <div className="name">{alias || name}</div>
            <div className="meta">{fullName}</div>
            <div className="commodities">{commodities_map}</div>
          </div>
          <div className="right">
            <div className="amount">{amount} CNY</div>
            {id &&
            <span>
        <a onClick={() => openEditAccount(id, fullName, alias, commodities)}>edit</a>
      </span>
            }
          </div>
        </div>
        {childrenDOM.length !== 0 &&
        <div className="children">
          {childrenDOM}
        </div>
        }

      </div>

      <style jsx>{`
        .account {
          margin: 1rem 0;
          padding: 1rem 1.5rem;
          border-radius: 5px;
          background-color: rgba(0,114,239,0.06);
          display: flex;
          flex-direction: column;
          border: 1px solid #eee;
          .content {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            .left {
              .name {
                font-size: 1.25rem;
              }
              .meta {
                font-size: 0.85rem;
                color: #5e5e5e;
              }
            }
          }
          .children {
          }
        }
      `}</style>
    </>
  )
}
