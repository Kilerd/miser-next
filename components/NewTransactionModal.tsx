import React, {useState} from "react";
import Modal from 'react-modal'
import api from "../api";
import {userLedger} from "../contexts/ledger";

export default function NewTransactionModal({modalStatus, setModalStatus}) {
  const ledgerContext = userLedger();

  const [simpleMode, setSimpleMode] = useState(true);

  const [date, setDate] = useState(() => {
    let defaultDate = new Date();
    defaultDate.setMinutes(defaultDate.getMinutes() - defaultDate.getTimezoneOffset());
    return defaultDate.toISOString().substring(0, 16);
  });
  const [payee, setPayee] = useState("");
  const [narration, setNarration] = useState("");
  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState([]);
  const [lines, setLines] = useState([
    {account: null, amount: null, commodity: null, commodity_candidates: []},
    {account: null, amount: null, commodity: null, commodity_candidates: []}
  ])


  const [isLoading, setLoading] = useState(false);
  const canBeSubmit = !isLoading;


  const handleNewTag = (e) => {
    if (e.code == 'Enter') {
      const value = e.target.value.trim();
      if (value !== '') {
        if (tags.indexOf(value) === -1) {
          setTags([...tags, value])
        }
        setNewTag("")
      }
    }
  }

  const handleLineChange = (e, index, fieldId) => {
    const newLines = [...lines]
    newLines[index][fieldId] = e.target.value;
    setLines(newLines);
  }
  const newLine = () => {
    setLines([
      ...lines,
      {account: null, amount: null, commodity: null, commodity_candidates: []}
    ])
  }
  const deleteLine = (target_index) => {
    setLines(lines.filter((value, index) => index != target_index));
  }

  const accountOptions = Object.values(ledgerContext.accounts).map(one => <option
    value={one.id}>{one.alias} ({one.full_name})</option>)

  function handleAccountChange(e: React.ChangeEvent<HTMLSelectElement>, index: number) {
    const newLines = [...lines]
    newLines[index].account = parseInt(e.target.value);
    let commodityCandidates = ledgerContext.accounts[e.target.value]?.commodities || [];
    newLines[index].commodity_candidates = commodityCandidates;
    newLines[index].commodity = commodityCandidates.length > 0 ? commodityCandidates[0] : null;
    setLines(newLines);
  }


  const submit = async () => {
    setLoading(true);
    const lineReq = lines.map(line => ({
      account: line.account,
      amount: [line.amount, line.commodity],
      description: ""
    }));
    await api.createTransaction(new Date(date), payee, narration, tags, [], lineReq)
    setLoading(false);
    setModalStatus(false);
    ledgerContext.update("TRANSACTIONS")
  }


  return (
    <Modal
      isOpen={modalStatus}
      // onRequestClose={()=> setIsOpen(false)}
      contentLabel="Example Modal"
      // style={customStyles}
    >
      <button onClick={() => setModalStatus(false)}>close</button>
      <h2>new Transaction</h2>
      <div>
        <label htmlFor="date" className="input">Date</label>
        <input type="datetime-local" name="date" id="date" placeholder="2020-10-10" value={date}
               onChange={e => setDate(e.target.value)}/>

        <label htmlFor="payee" className="input">Payee</label>
        <input type="text" placeholder="Payee" id="payee" className="input" value={payee}
               onChange={e => setPayee(e.target.value)}/>

        <label htmlFor="narration" className="input">Narration</label>
        <input type="text" placeholder="Narration" id="narration" className="input" value={narration}
               onChange={e => setNarration(e.target.value)}/>
      </div>

      <div>
        {tags.map(one => <span key={one}>{one}</span>)}
      </div>
      <div>
        <input type="text" placeholder="New Tag" className="input" value={newTag}
               onChange={e => setNewTag(e.target.value)} onKeyUp={handleNewTag}/>
      </div>

      <h3>Lines</h3>
      <button onClick={newLine}>new Lines</button>
      {lines.map((one, index) =>
        <div>
          <select name="select" id="exampleSelect" className="input" onChange={e => handleAccountChange(e, index)}>
            {accountOptions}
          </select>
          <input type="number" placeholder="Amount" className="input" value={one.amount}
                 onChange={e => handleLineChange(e, index, "amount")}/>

          <select name="select" id="exampleSelect"
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
            {one.commodity_candidates.map(candidate =>
              <option selected={one.commodity === candidate} value={candidate}>{candidate}</option>
            )}
          </select>
          <button onClick={() => deleteLine(index)}>delete</button>
        </div>
      )}

      <button disabled={!canBeSubmit} onClick={submit}> create</button>
    </Modal>
  )
}
