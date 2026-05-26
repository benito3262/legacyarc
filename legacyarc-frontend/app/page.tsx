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
  ChevronRight,
  Clock3,
  Layers3,
  Sparkles,
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

  // STATUS
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

        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-5 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-xl shadow-lg shadow-cyan-500/30">
              LA
            </div>

            <div>
              <h1 className="font-semibold text-2xl tracking-tight">
                LegacyArc
              </h1>

              <p className="text-sm text-zinc-400">
                Digital Inheritance Infrastructure
              </p>
            </div>

          </div>

          <ConnectButton showBalance={false} />

        </div>

      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 pt-24 lg:pt-32 pb-24 relative z-10">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-sm mb-8 backdrop-blur-xl">
              <Sparkles size={16} />
              SECURE • ONCHAIN • STABLECOIN READY
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight">

              Preserve wealth
              across generations.

            </h1>

            <p className="text-lg lg:text-xl text-zinc-400 mt-8 leading-relaxed max-w-2xl">

              LegacyArc automates digital inheritance using
              decentralized inactivity detection, secure vault
              management, and beneficiary distribution powered
              by smart contracts.

            </p>

            <div className="flex flex-wrap gap-4 mt-12">

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
                Explore Security
              </Link>

            </div>

          </div>

          {/* HERO CARD */}
          <div className="glass rounded-[32px] p-8 lg:p-10">

            <div className="flex items-center justify-between mb-8">

              <div>
                <p className="text-zinc-400 text-sm">
                  Protected Vault
                </p>

                <h2 className="text-4xl font-semibold mt-2">
                  {vaultBalance
                    ? Number(vaultBalance) / 1e6
                    : "0"}
                </h2>

                <p className="text-cyan-300 mt-2">
                  USDC Stored
                </p>
              </div>

              <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 flex items-center justify-center">
                <Landmark className="text-cyan-300" size={30} />
              </div>

            </div>

            <div className="space-y-5">

              <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5">

                <div>
                  <p className="text-zinc-400 text-sm">
                    Wallet Balance
                  </p>

                  <h3 className="text-2xl font-semibold mt-1">
                    {usdcBalance
                      ? Number(usdcBalance) / 1e6
                      : "0"} USDC
                  </h3>
                </div>

                <Wallet className="text-purple-300" />

              </div>

              <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5">

                <div>
                  <p className="text-zinc-400 text-sm">
                    Vault Status
                  </p>

                  <h3 className="text-2xl font-semibold mt-1">
                    {inheritanceStatus
                      ? "Triggered"
                      : "Protected"}
                  </h3>
                </div>

                <Activity className="text-green-300" />

              </div>

              <div className="p-5 rounded-2xl bg-white/5">

                <p className="text-zinc-400 text-sm mb-3">
                  Vault Owner
                </p>

                <h3 className="break-all text-lg font-semibold">
                  {owner
                    ? `${String(owner).slice(0, 6)}...${String(owner).slice(-4)}`
                    : "N/A"}
                </h3>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* WHY SECTION */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-24 relative z-10">

        <div className="max-w-3xl mb-16">

          <p className="text-cyan-300 mb-4">
            WHY LEGACYARC
          </p>

          <h2 className="text-4xl lg:text-5xl font-semibold leading-tight">
            Digital assets deserve inheritance infrastructure.
          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="glass rounded-3xl p-8">
            <Clock3 className="text-cyan-300 mb-6" size={32} />

            <h3 className="text-2xl font-semibold mb-4">
              Automated Detection
            </h3>

            <p className="text-zinc-400 leading-relaxed">
              Smart contracts monitor inactivity windows
              and automate inheritance execution securely.
            </p>
          </div>

          <div className="glass rounded-3xl p-8">
            <ShieldCheck className="text-green-300 mb-6" size={32} />

            <h3 className="text-2xl font-semibold mb-4">
              Non-Custodial Security
            </h3>

            <p className="text-zinc-400 leading-relaxed">
              Assets remain secured onchain with
              transparent and verifiable execution logic.
            </p>
          </div>

          <div className="glass rounded-3xl p-8">
            <Layers3 className="text-purple-300 mb-6" size={32} />

            <h3 className="text-2xl font-semibold mb-4">
              Institutional Structure
            </h3>

            <p className="text-zinc-400 leading-relaxed">
              Designed with premium fintech architecture
              and scalable inheritance management.
            </p>
          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-24 relative z-10">

        <div className="flex items-center justify-between mb-14">

          <div>
            <p className="text-cyan-300 mb-3">
              HOW IT WORKS
            </p>

            <h2 className="text-4xl font-semibold">
              Navigate the vault system.
            </h2>
          </div>

        </div>

        <div className="grid lg:grid-cols-4 gap-6">

          <Link
            href="/deposit"
            className="glass rounded-3xl p-8 hover:translate-y-[-4px] transition"
          >

            <ArrowDownToLine className="text-cyan-300 mb-6" size={32} />

            <h3 className="text-2xl font-semibold mb-4">
              Deposit
            </h3>

            <p className="text-zinc-400 leading-relaxed mb-8">
              Approve and deposit USDC into your inheritance vault.
            </p>

            <div className="flex items-center gap-2 text-cyan-300">
              Open Page
              <ChevronRight size={18} />
            </div>

          </Link>

          <Link
            href="/withdraw"
            className="glass rounded-3xl p-8 hover:translate-y-[-4px] transition"
          >

            <ArrowUpFromLine className="text-orange-300 mb-6" size={32} />

            <h3 className="text-2xl font-semibold mb-4">
              Withdraw
            </h3>

            <p className="text-zinc-400 leading-relaxed mb-8">
              Withdraw assets securely while the vault remains active.
            </p>

            <div className="flex items-center gap-2 text-orange-300">
              Open Page
              <ChevronRight size={18} />
            </div>

          </Link>

          <Link
            href="/beneficiaries"
            className="glass rounded-3xl p-8 hover:translate-y-[-4px] transition"
          >

            <Users className="text-purple-300 mb-6" size={32} />

            <h3 className="text-2xl font-semibold mb-4">
              Beneficiaries
            </h3>

            <p className="text-zinc-400 leading-relaxed mb-8">
              Allocate inheritance percentages to trusted wallets.
            </p>

            <div className="flex items-center gap-2 text-purple-300">
              Open Page
              <ChevronRight size={18} />
            </div>

          </Link>

          <Link
            href="/security"
            className="glass rounded-3xl p-8 hover:translate-y-[-4px] transition"
          >

            <ShieldCheck className="text-green-300 mb-6" size={32} />

            <h3 className="text-2xl font-semibold mb-4">
              Security
            </h3>

            <p className="text-zinc-400 leading-relaxed mb-8">
              Ping alive, monitor inheritance status, and trigger execution.
            </p>

            <div className="flex items-center gap-2 text-green-300">
              Open Page
              <ChevronRight size={18} />
            </div>

          </Link>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 relative z-10">

        <div className="max-w-7xl mx-auto px-5 lg:px-8 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">

          <div>

            <h2 className="text-2xl font-semibold mb-2">
              LegacyArc
            </h2>

            <p className="text-zinc-400 max-w-lg">
              Secure digital inheritance infrastructure
              built for stablecoin wealth management.
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