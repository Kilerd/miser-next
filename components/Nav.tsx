import Link from "next/link";
import styles from './layout.module.scss'
import {useAuth} from "../contexts/auth";

export default function Nav() {
  const {user} = useAuth();
  return (
    <header className={styles.header}>
      <h1 className="logo">Miser</h1>
      <nav className={styles.nav}>
        <Link href="/dashboard">DashBoard</Link>
        <Link href="/transactions">Transactions</Link>
        <Link href="/accounts">Accounts</Link>
        <Link href="/commodities">Commodities</Link>
        <a href="/me">{user.username}</a>
      </nav>
    </header>
  )
}
