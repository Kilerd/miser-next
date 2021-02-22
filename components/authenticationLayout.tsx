import styles from './layout.module.scss'
import Nav from "./Nav";
import LedgerChoicer from "./LedgerChoicer";

export default function AuthenticationLayout({children}) {
  return <main className={styles.container}>
    <Nav/>
    <LedgerChoicer/>
    {children}
  </main>
}
