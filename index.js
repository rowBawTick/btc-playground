require('dotenv').config();
console.log('RPC_HOST:', process.env.RPC_HOST);
const Client = require('bitcoin-core');

// Bitcoin Core RPC error codes, defined in rpc/protocol.h
const WALLET_EXISTS = -4;
const WALLET_LOADING = -35;

const client = new Client({
  network: 'regtest',
  username: process.env.RPC_USERNAME,
  password: process.env.RPC_PASSWORD,
  host: `${process.env.RPC_HOST}:${process.env.RPC_PORT}`,
  wallet: 'regtest_wallet'
});

async function initializeWallet() {
  try {
    await client.createWallet('regtest_wallet');
    console.log('Created new wallet: regtest_wallet');
  } catch (walletError) {
    if (walletError.code === WALLET_EXISTS) {
      console.log('Wallet already exists, loading it...');
      try {
        await client.loadWallet('regtest_wallet');
      } catch (loadError) {
        if (loadError.code !== WALLET_EXISTS && loadError.code !== WALLET_LOADING) {
          throw loadError;
        }
      }
    } else {
      throw walletError;
    }
  }
}

async function setupMining() {
  const info = await client.getBlockchainInfo();
  console.log('Blockchain Info:', info);

  const miningAddress = await client.getNewAddress();
  console.log('Mining Address:', miningAddress);

  // Mine 50 blocks to activate the chain and fund your wallet
  await client.generateToAddress(50, miningAddress);
  console.log('Generated 101 blocks.');

  return miningAddress;
}

async function performTransaction() {
  const balance = await client.getBalance();
  console.log('Wallet Balance:', balance);

  const testAddress = await client.getNewAddress();
  console.log('Test Address:', testAddress);

  const txId = await client.sendToAddress(testAddress, 10);
  console.log('Sent transaction ID:', txId);

  return { testAddress, txId };
}

async function main() {
  try {
    await initializeWallet();
    const miningAddress = await setupMining();
    await performTransaction();
    
    // Mine one block to confirm the transaction
    await client.generateToAddress(1, miningAddress);
    console.log('Mined a block to confirm transaction.');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
