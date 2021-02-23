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

    <div className={styles.account_item}>
      <span>
        {alias} ({name})
      </span>
      <span>
        {commodities_map}
      </span>
      <span>
            <span>
            {amount} CNY
            </span>
      </span>
      {id &&
      <span>
        <a onClick={() => openEditAccount(id, fullName, alias, commodities)}>edit</a>
      </span>
      }

      <div className={styles.children}>
        {childrenDOM}
      </div>
    </div>
  )
}
