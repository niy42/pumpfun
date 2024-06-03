/*import React from 'react';
import { Buffer } from 'buffer';
import {
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import {
    createMint,
    getOrCreateAssociatedTokenAccount,
    mintTo,
} from '@solana/spl-token';

// Polyfill Buffer
window.Buffer = window.Buffer || Buffer;

async function createToken() {
    // Connect to the Solana devnet
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

    // Generate a new keypair
    const payer = Keypair.generate();

    // Airdrop SOL to the payer account
    const airdropSignature = await connection.requestAirdrop(
        payer.publicKey,
        2 * LAMPORTS_PER_SOL
    );

    await connection.confirmTransaction(airdropSignature);

    // Create a new token mint
    const mint = await createMint(
        connection,
        payer,
        payer.publicKey,
        null,
        9 // Number of decimals
    );

    console.log(`Token Mint Address: ${mint.toBase58()}`);

    // Get the token account of the payer address, and if it does not exist, create it
    const payerTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        mint,
        payer.publicKey
    );

    console.log(`Payer Token Account: ${payerTokenAccount.address.toBase58()}`);

    // Mint 1000 tokens to the payer token account
    await mintTo(
        connection,
        payer,
        mint,
        payerTokenAccount.address,
        payer.publicKey,
        1000 * LAMPORTS_PER_SOL
    );

    console.log(`Minted 1000 tokens to ${payerTokenAccount.address.toBase58()}`);
};

const MintToken = () => {
    return (
        <div className="flex space-x-4">
            <button className="border" onClick={createToken}>Create Token</button>
            <button className="border">Mint Token</button>
            <button className="border">Check Balance</button>
            <button className="border">Send Token</button>
        </div>
    );
};

export default MintToken;
*/