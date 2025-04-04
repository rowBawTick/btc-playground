# Bitcoin Playground

A JavaScript-based playground for experimenting with Bitcoin-related functionality and interactions.

## Overview

This project provides a sandbox environment for exploring Bitcoin operations, including:
- Interacting with the Bitcoin (test) network
- Working with Bitcoin transactions
- Testing Bitcoin-related code

## Prerequisites

- Node.js (latest LTS version recommended)
- Bitcoin Core (for connecting to the Bitcoin network)

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Set up your environment:
   - Copy `.env.example` to `.env`
   - Update the `.env` file with your settings (it should match the bitcoin.conf)
4. Configure your Bitcoin Core settings in `.bitcoin/bitcoin.conf`
5. Start Bitcoin Core in regtest mode with explicit RPC settings:
```bash
bitcoind -regtest -server -rpcuser=bitcoin -rpcpassword=bitcoin -rpcport=18443 -rpcallowip=127.0.0.1 -rpcbind=127.0.0.1 -fallbackfee=0.0002 -daemon
```
   - Regtest mode creates a local blockchain for testing
   - No need to wait for block downloads
   - Check status with `bitcoin-cli -regtest -rpcuser=bitcoin -rpcpassword=bitcoin -rpcport=18443 getblockchaininfo`
6. To stop the Bitcoin Core daemon:
```bash
bitcoin-cli -regtest -rpcuser=bitcoin -rpcpassword=bitcoin -rpcport=18443 stop
```

> Note: Regtest mode is recommended for development as it allows you to create a local blockchain without real Bitcoin.

## Usage

Run the project:
```bash
node index.js
```

## License

MIT

## Contributing

Feel free to submit issues and pull requests.
