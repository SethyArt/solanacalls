const solanaweb3 = require('@solana/web3.js');
const bs58 = require('bs58');

const connection = new solanaweb3.Connection('https://api.devnet.solana.com');

const senderWallet = solanaweb3.Keypair.fromSecretKey(bs58.decode("63YLAYgRJc8pyXjyDBnM4pt13dKQVgVQVkP6DNoHnX7mZ4RqGzryLACqUYkzqFEP384NZykLPstTDXcVLnYbn3sK"));

const receiverBalance = "2SysXH1L4DqQAMRBeE8Mhz42drEm5dMi3EiBCS4xXqL6";


(async () => {
    let senderBalance = await connection.getBalance(senderWallet.publicKey);
    /* let receiverBalance = await connection.getBalance(receiverWallet.publicKey); */
  
    console.log(`Sender Balance: ${senderBalance / solanaweb3.LAMPORTS_PER_SOL} SOL`);
    /* console.log(`Receiver Balance: ${receiverBalance / solanaweb3.LAMPORTS_PER_SOL} SOL`);*/
  })();


(async()=>{
    let txhash = await connection.requestAirdrop(senderWallet.publicKey, 100);
    console.log(`Transaction hash : ${txhash}`)
    

    const transaction = new solanaweb3.Transaction().add(
        solanaweb3.SystemProgram.transfer({
          fromPubkey: senderWallet.publicKey,
          toPubkey: receiverBalance,
          lamports: solanaweb3.LAMPORTS_PER_SOL / 100,
        }),
      );
    
      // Sign transaction, broadcast, and confirm
      const signature = await solanaweb3.sendAndConfirmTransaction(
        connection,
        transaction,
        [senderWallet],
      );
      console.log('SIGNATURE', signature);
    })()