import type { NextPage } from "next";
import bs58 from "bs58";
import Head from "next/head";

import { useTheme } from "next-themes";
import { ReactElement, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

import { TOKEN_LIST_URL } from "@jup-ag/core";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

interface Token {
  chainId: number; // 101,
  address: string; // 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  symbol: string; // 'USDC',
  name: string; // 'Wrapped USDC',
  decimals: number; // 6,
  logoURI: string; // 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/BXXkv6z8ykpG1yuvUDPgh732wzVHB69RnB9YgSYh3itW/logo.png',
  tags: string[]; // [ 'stablecoin' ]
}

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div>
      The current theme is: {theme}
      <button className="btn btn-blue" onClick={() => setTheme("light")}>
        Light Mode
      </button>
      <button className="btn" onClick={() => setTheme("dark")}>
        Dark Mode
      </button>
    </div>
  );
};

const Home: NextPage = () => {
  const wallet = useWallet();

  const [connected, setConnected] = useState(false);
  const [tokens, setTokens] = useState<Token[]>([]);
  useEffect(() => {
    // Fetch token list from Jupiter API
    const network = (process.env.network ||
      WalletAdapterNetwork.Devnet) as WalletAdapterNetwork;
    fetch(TOKEN_LIST_URL[network])
      .then((response) => response.json())
      .then((result) => setTokens(result as Token[]));
  }, []);

  useEffect(() => {
    setConnected(wallet.connected);
  }, [wallet]);

  console.log(tokens);

  function Tokens(tokens: Token[]): React.ReactElement {
    let e: ReactElement[] = [];

    tokens.forEach((t: Token) => {
      e.push(
        <div>{`Symbol: ${t.symbol}, Address: ${t.address}, Name: ${t.name}, Decimals: ${t.decimals}`}</div>
      );
    });

    return <>{e}</>;
  }

  return (
    <>
      <Head>
        <title>Swaps.so ✨</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div>
        <main>
          <h1>Connect your wallet to use Swaps.so 🪐❤️🐇</h1>
          <h2>
            {connected ? "Wallet is connected." : "Wallet is not connected"}
          </h2>
          <h2>Tokens: {Tokens(tokens)}</h2>
          <div>
            <ThemeChanger />
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
