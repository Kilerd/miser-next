import React from "react";
import TransactionLine from "./TransactionLine";


export default function TransactionGroup({date, items}) {

  const lines = items.map((one) => (<TransactionLine key={one.id} {...one} />))
  return (
    <>
      <div className="group">
        <div className="head">
          <h2>{date}</h2>
        </div>
        <div className="lines">
          {lines}
        </div>

      </div>

      <style jsx>{`
        .group {
          display:flex;
          flex-direction: column;
          margin-bottom:1rem;
          .lines {
          color: #2E3033;
          }
        }
      `}</style>
    </>
  )
}
