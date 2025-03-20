require('dotenv').config();
console.log('RPC_HOST:', process.env.RPC_HOST);
const Client = require('bitcoin-core');

const client = new Client({
  network: 'regtest',
  username: process.env.RPC_USERNAME,
  password: process.env.RPC_PASSWORD,
  port: process.env.RPC_PORT,
  host: process.env.RPC_HOST
});

async function main() {
  try {
    // Fetch basic blockchain info
    const info = await client.getBlockchainInfo();
    console.log('Blockchain Info:', info);

    // Generate a new address for mining rewards
    const miningAddress = await client.getNewAddress();
    console.log('Mining Address:', miningAddress);

    // Mine 101 blocks to activate the chain and fund your wallet
    await client.generateToAddress(101, miningAddress);
    console.log('Generated 101 blocks.');

    // Get your current wallet balance
    const balance = await client.getBalance();
    console.log('Wallet Balance:', balance);

    // Generate another new address for testing transactions
    const testAddress = await client.getNewAddress();
    console.log('Test Address:', testAddress);

    // Send coins (example: send 10 coins)
    const txId = await client.sendToAddress(testAddress, 10);
    console.log('Sent transaction ID:', txId);

    // Mine one block to confirm the transaction
    await client.generateToAddress(1, miningAddress);
    console.log('Mined a block to confirm transaction.');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
