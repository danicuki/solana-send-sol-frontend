import { FC, useState } from 'react'
import styles from '../styles/Home.module.css'
import * as Web3 from "@solana/web3.js"
import { useConnection, useWallet } from '@solana/wallet-adapter-react'

export const SendSolForm: FC = () => {

    const { connection } = useConnection()
    const { publicKey, sendTransaction } = useWallet()

    const [amount, setAmount] = useState(0.0)
    const [recipient, setRecipient] = useState("")

    const sendSol = event => {
        event.preventDefault()
        console.log("Sending " + amount + " SOL to " + recipient)

        const to = new Web3.PublicKey(recipient)
        const transfer = Web3.SystemProgram.transfer({
            /** Account that will transfer lamports */
            fromPubkey: publicKey,
            /** Account that will receive transferred lamports */
            toPubkey: to,
            /** Amount of lamports to transfer */
            lamports: amount * Web3.LAMPORTS_PER_SOL,
        })

        const transaction = new Web3.Transaction()
        transaction.add(transfer)

        sendTransaction(transaction, connection).then((sig) => {
            console.log(`Transaction https://explorer.solana.com/tx/${sig}?cluster=devnet`)
        })
    }

    return (
        <div>
            <form onSubmit={sendSol} className={styles.form}>
                <label htmlFor="amount">Amount (in SOL) to send:</label>
                <input id="amount" type="text" onChange={(e) => { setAmount(Number(e.target.value)) }} className={styles.formField} placeholder="e.g. 0.1" required />
                <br />
                <label htmlFor="recipient">Send SOL to:</label>
                <input id="recipient" type="text" onChange={(e) => { setRecipient(e.target.value) }} className={styles.formField} placeholder="e.g. 4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA" required />
                <button type="submit" className={styles.formButton}>Send</button>
            </form>
        </div>
    )
}