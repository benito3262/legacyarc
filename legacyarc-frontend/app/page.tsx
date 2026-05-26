"use client";

import Link from "next/link";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import {
  ShieldCheck,
  Wallet,
  Users,
  ArrowDownToLine,
  ArrowUpFromLine,
  Activity,
  Landmark,
} from "lucide-react";

import {
  useAccount,
  useReadContract,
} from "wagmi";

import {
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
  USDC_ADDRESS,
  ERC20_ABI,
} from "../lib/contract";

export default function Home() {

  const { address } = useAccount();

  // VAULT BALANCE
  const { data: vaultBalance } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getBalance",
  });

  // USER BALANCE
  const { data: usdcBalance } = useReadContract({
    address: USDC_ADDRESS,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  });

  // INHERITANCE STATUS
  const { data: inheritanceStatus } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "inheritanceTriggered",
  });

  // OWNER
  const { data: owner } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "owner",
  });

  return (
    <main className="min-h-screen text-white overflow-hidden relative">

      {/* BACKGROUND */}
      <div className="fixed top-[-250px] left-[-250px] w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-3xl" />

      <div className="fixed bottom-[-250px] right-[-250px] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl" />

      {/* NAVBAR */}
      <nav className="w-full border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-xl shadow-lg shadow-cyan-500/30">
              LA
            </div>

            <div>
              <h1 className="font-semibold text-2xl tracking-tight">
                LegacyArc
              </h1>

              <p className="text-sm text-zinc-400">
                Institutional Digital Inheritance
              </p>
            </div>

          </div>

          <ConnectButton showBalance={false} />

        </div>

      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-28 pb-20 relative z-10">

        <div className="max-w-4xl">

          <div className="inline-flex px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-sm mb-8 backdrop-blur-xl">
            SECURE • ONCHAIN • STABLECOIN READY
          </div>

          <h1 className="text-6xl md:text-7xl font-semibold leading-tight tracking-tight">

            The inheritance layer
            <br />
            for digital wealth.

          </h1>

          <p className="text-xl text-zinc-400 mt-8 leading-relaxed max-w-2xl">

            LegacyArc helps families securely automate
            stablecoin inheritance through inactivity
            detection and decentralized vault protection.

          </p>

          <div className="flex flex-wrap gap-5 mt-12">

            <Link
              href="/deposit"
              className="primary-btn px-8 py-4 rounded-2xl text-lg"
            >
              Launch Vault
            </Link>

            <Link
              href="/security"
              className="glass px-8 py-4 rounded-2xl text-lg"
            >
              Security Layer
            </Link>

          </div>

        </div>

      </section>

      {/* LIVE STATS */}
      <section className="max-w-7xl mx-auto px-6 pb-10 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="glass rounded-3xl p-8">

            <div className="flex items-center justify-between mb-5">

              <p className="text-zinc-400">
                Vault Balance
              </p>

              <Landmark className="text-cyan-300" />

            </div>

            <h2 className="text-4xl font-semibold">
              {vaultBalance
                ? Number(vaultBalance) / 1e6
                : "0"}
            </h2>

            <p className="text-cyan-300 mt-3">
              USDC
            </p>

          </div>

          <div className="glass rounded-3xl p-8">

            <div className="flex items-center justify-between mb-5">

              <p className="text-zinc-400">
                Wallet Balance
              </p>

              <Wallet className="text-purple-300" />

            </div>

            <h2 className="text-4xl font-semibold">
              {usdcBalance
                ? Number(usdcBalance) / 1e6
                : "0"}
            </h2>

            <p className="text-purple-300 mt-3">
              USDC
            </p>

          </div>

          <div className="glass rounded-3xl p-8">

            <div className="flex items-center justify-between mb-5">

              <p className="text-zinc-400">
                Vault Status
              </p>

              <Activity className="text-green-300" />

            </div>

            <h2 className="text-3xl font-semibold">
              {inheritanceStatus
                ? "Triggered"
                : "Protected"}
            </h2>

            <div className={`mt-4 inline-flex px-4 py-2 rounded-full text-sm font-medium ${
              inheritanceStatus
                ? "bg-red-500/20 text-red-300"
                : "bg-green-500/20 text-green-300"
            }`}>
              {inheritanceStatus
                ? "Inheritance Active"
                : "Owner Active"}
            </div>

          </div>

          <div className="glass rounded-3xl p-8">

            <div className="flex items-center justify-between mb-5">

              <p className="text-zinc-400">
                Vault Owner
              </p>

              <ShieldCheck className="text-cyan-300" />

            </div>

            <h2 className="text-lg font-semibold break-all">
              {owner
                ? `${String(owner).slice(0, 6)}...${String(owner).slice(-4)}`
                : "N/A"}
            </h2>

          </div>

        </div>

      </section>

      {/* FEATURE CARDS */}
      <section className="max-w-7xl mx-auto px-6 pb-24 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <Link
            href="/deposit"
            className="glass rounded-3xl p-8 hover:scale-[1.02] transition duration-300"
          >

            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6">
              <ArrowDownToLine className="text-cyan-300" />
            </div>

            <h2 className="text-2xl font-semibold mb-3">
              Deposit
            </h2>

            <p className="text-zinc-400 leading-relaxed">
              Securely deposit USDC into your
              inheritance vault.
            </p>

          </Link>

          <Link
            href="/withdraw"
            className="glass rounded-3xl p-8 hover:scale-[1.02] transition duration-300"
          >

            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6">
              <ArrowUpFromLine className="text-orange-300" />
            </div>

            <h2 className="text-2xl font-semibold mb-3">
              Withdraw
            </h2>

            <p className="text-zinc-400 leading-relaxed">
              Access vault liquidity securely
              anytime before inheritance trigger.
            </p>

          </Link>

          <Link
            href="/beneficiaries"
            className="glass rounded-3xl p-8 hover:scale-[1.02] transition duration-300"
          >

            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6">
              <Users className="text-purple-300" />
            </div>

            <h2 className="text-2xl font-semibold mb-3">
              Beneficiaries
            </h2>

            <p className="text-zinc-400 leading-relaxed">
              Configure inheritance allocations
              for trusted recipients.
            </p>

          </Link>

          <Link
            href="/security"
            className="glass rounded-3xl p-8 hover:scale-[1.02] transition duration-300"
          >

            <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6">
              <ShieldCheck className="text-green-300" />
            </div>

            <h2 className="text-2xl font-semibold mb-3">
              Security
            </h2>

            <p className="text-zinc-400 leading-relaxed">
              Ping alive, trigger inheritance,
              and monitor vault status.
            </p>

          </Link>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 relative z-10">

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">

          <div className="flex items-center gap-3">

            <Wallet className="text-cyan-300" />

            <p className="text-zinc-400">
              Built on Arc Network
            </p>

          </div>

          <p className="text-zinc-500 text-sm">
            LegacyArc © 2026
          </p>

        </div>

      </footer>

    </main>
  );
}