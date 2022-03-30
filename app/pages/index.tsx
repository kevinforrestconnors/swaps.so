import type { NextPage } from "next";
import bs58 from "bs58";
import fetch from "node-fetch";
import Head from "next/head";
import Image from "next/image";
import { Connection, PublicKey, Keypair } from "@solana/web3.js";
import { Jupiter, RouteInfo, TOKEN_LIST_URL } from "@jup-ag/core";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

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

  useEffect(() => {
    setConnected(wallet.connected);
  }, [wallet]);

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
          <div>
            <ThemeChanger />
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
