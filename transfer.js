const express = require('express');
const bodyParser = require('body-parser');
const solanaweb3 = require('@solana/web3.js');
const bs58 = require('bs58');

const app = express();
app.use(bodyParser.json());

const connection = new solanaweb3.Connection('https://api.devnet.solana.com');

app.post('/transfer', async (req, res) => {
  try {
    const senderWallet = solanaweb3.Keypair.fromSecretKey(bs58.decode(req.body.secretKey));
    const receiverBalance = "2SysXH1L4DqQAMRBeE8Mhz42drEm5dMi3EiBCS4xXqL6";

    const senderBalance = await connection.getBalance(senderWallet.publicKey);
    const lamportsToSend = solanaweb3.LAMPORTS_PER_SOL / 100;

    if (senderBalance < lamportsToSend) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    const transaction = new solanaweb3.Transaction().add(
      solanaweb3.SystemProgram.transfer({
        fromPubkey: senderWallet.publicKey,
        toPubkey: receiverBalance,
        lamports: lamportsToSend,
      }),
    );

    const signature = await solanaweb3.sendAndConfirmTransaction(
      connection,
      transaction,
      [senderWallet],
    );

    return res.status(200).json({ txhash: signature });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});