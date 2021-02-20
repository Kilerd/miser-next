import React from "react";
import TransactionLine from "./TransactionLine";


export default function TransactionGrop({date, items}) {

  const lines = items.map((one) => (<TransactionLine key={one.id} {...one} />))
  return <div>
    <h2>{date}</h2>

    <table style={{width: "100%"}}>
      <thead>
      <tr>
        <th>id</th>
        <th>Date</th>
        <th>Payee . Narration</th>
        <th></th>
      </tr>
      </thead>

      <tbody>
      {lines}
      </tbody>
    </table>
  </div>
}
