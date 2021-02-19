import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import {useAuth} from "../contexts/auth";

export default function Home() {

  const {user} = useAuth();
  console.log("suer", user);

  const userButton = user === undefined ? (
    <>
      <p><Link href="/login">Login</Link></p>
      <p><Link href="/register">Register</Link></p>
    </>
  ) : (
    <>
      <p><Link href="/dashbroad">dashbroad</Link></p>
      <p><Link href="/journals">Journals</Link></p>
      <p><Link href="/logout">logout</Link></p>
    </>
  )

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main>

        <h1>Miser</h1>

        <h2>hello {user?.username}</h2>

        {userButton}
      </main>

    </div>
  )
}
