import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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
          <div>
            <ThemeChanger />
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
