import Link from "next/link";
import styles from './layout.module.scss'
import {useAuth} from "../contexts/auth";
import React from "react";

export default function Nav() {
  const {user} = useAuth();
  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <h1 className="logo">Miser</h1>
          <nav className={styles.nav}>
            <Link href="/dashboard"><a className="link">DashBoard</a></Link>
            <Link href="/transactions"><a>Transactions</a></Link>
            <Link href="/accounts"><a>Accounts</a></Link>
            <Link href="/commodities"><a>Commodities</a></Link>
            <Link href="/me"><a>{user.username}</a></Link>
          </nav>
        </div>
      </header>
      <style jsx>{`
        header {
        .container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 90%;
          margin: 0 auto;
          
          nav {
            display: flex;
            a {
            margin-right: 0.25rem;
            color: black;
            text-decoration: none;
            }
          }
          }
        }
      `}</style>
    </>
  )
}
