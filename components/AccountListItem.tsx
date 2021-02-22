import {AccountListItemType} from "../types";
import styles from './layout.module.scss'

export default function AccountListItem({name, fullName, isAvailable, alias, commodities, amount, id, children}: AccountListItemType) {

  const commodities_map = commodities.map(one => <span key={one}>{one}</span>);
  const childrenDOM = Object.values(children).map(one => <AccountListItem key={one.fullName} {...one}/>)

  console.log(styles)
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
      <div className={styles.children}>
        {childrenDOM}
      </div>

    </div>

  )
}
