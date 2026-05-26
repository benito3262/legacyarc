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
  Sparkles,
  LockKeyhole,
  Network,
  HeartPulse,
  HandCoins,
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
      <div className="fixed top-[-320px] left-[-320px] w-[720px] h-[720px] bg-cyan-500/20 rounded-full blur-3xl" />

      <div className="fixed bottom-[-320px] right-[-320px] w-[720px] h-[720px] bg-purple-600/20 rounded-full blur-3xl" />

      {/* NAVBAR */}
      <nav className="w-full border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-5 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-xl">
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
      <section className="max-w-7xl mx-auto px-5 lg:px-8 pt-28 lg:pt-40 pb-32 relative z-10">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          <div>

            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-sm mb-10">
              <Sparkles size={16} />
              SECURE • ONCHAIN • AUTOMATED
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight">

              Protect digital
              wealth beyond
              your lifetime.

            </h1>

            <p className="text-lg sm:text-xl text-zinc-400 mt-10 leading-relaxed max-w-2xl">

              LegacyArc helps users securely manage
              inheritance for stablecoins and digital assets
              through decentralized vaults, inactivity
              detection, and automated beneficiary execution.

            </p>

            <div className="flex flex-col sm:flex-row gap-5 mt-14">

              <Link
                href="/deposit"
                className="primary-btn px-8 py-5 rounded-2xl text-lg text-center"
              >
                Launch Vault
              </Link>

              <Link
                href="/security"
                className="glass px-8 py-5 rounded-2xl text-lg text-center"
              >
                Security Layer
              </Link>

            </div>

          </div>

          {/* HERO PANEL */}
          <div className="glass rounded-[40px] p-7 lg:p-10">

            <div className="flex items-center justify-between mb-8">

              <div>

                <p className="text-zinc-400 text-sm">
                  Protected Assets
                </p>

                <h2 className="text-5xl font-semibold mt-2">
                  {vaultBalance
                    ? Number(vaultBalance) / 1e6
                    : "0"}
                </h2>

                <p className="text-cyan-300 mt-3">
                  USDC IN VAULT
                </p>

              </div>

              <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 flex items-center justify-center">
                <Landmark className="text-cyan-300" size={36} />
              </div>

            </div>

            <div className="space-y-5">

              <div className="p-6 rounded-3xl bg-white/5">

                <div className="flex items-center justify-between gap-5">

                  <div>

                    <p className="text-zinc-400 text-sm">
                      Wallet Balance
                    </p>

                    <h3 className="text-3xl font-semibold mt-2">
                      {usdcBalance
                        ? Number(usdcBalance) / 1e6
                        : "0"} USDC
                    </h3>

                  </div>

                  <Wallet className="text-purple-300 shrink-0" />

                </div>

              </div>

              <div className="p-6 rounded-3xl bg-white/5">

                <div className="flex items-center justify-between gap-5">

                  <div>

                    <p className="text-zinc-400 text-sm">
                      Vault Status
                    </p>

                    <h3 className="text-3xl font-semibold mt-2">
                      {inheritanceStatus
                        ? "Triggered"
                        : "Protected"}
                    </h3>

                  </div>

                  <Activity className="text-green-300 shrink-0" />

                </div>

              </div>

              <div className="p-6 rounded-3xl bg-white/5">

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
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-28 relative z-10">

        <div className="max-w-3xl mb-20">

          <p className="text-cyan-300 mb-5 tracking-[0.2em] text-sm">
            WHY LEGACYARC
          </p>

          <h2 className="text-4xl lg:text-6xl font-semibold leading-tight">
            Traditional inheritance systems were never built for crypto.
          </h2>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          <div className="glass rounded-[32px] p-10">

            <Clock3 className="text-cyan-300 mb-8" size={36} />

            <h3 className="text-3xl font-semibold mb-6">
              Automated Detection
            </h3>

            <p className="text-zinc-400 text-lg leading-relaxed">
              LegacyArc continuously tracks vault
              inactivity periods before inheritance
              execution becomes available.
            </p>

          </div>

          <div className="glass rounded-[32px] p-10">

            <ShieldCheck className="text-green-300 mb-8" size={36} />

            <h3 className="text-3xl font-semibold mb-6">
              Onchain Security
            </h3>

            <p className="text-zinc-400 text-lg leading-relaxed">
              Funds remain decentralized and secured
              through transparent smart contract logic.
            </p>

          </div>

          <div className="glass rounded-[32px] p-10">

            <Network className="text-purple-300 mb-8" size={36} />

            <h3 className="text-3xl font-semibold mb-6">
              Institutional Design
            </h3>

            <p className="text-zinc-400 text-lg leading-relaxed">
              Premium fintech-inspired infrastructure
              built for modern digital asset management.
            </p>

          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-28 relative z-10">

        <div className="max-w-3xl mb-20">

          <p className="text-cyan-300 mb-5 tracking-[0.2em] text-sm">
            HOW IT WORKS
          </p>

          <h2 className="text-4xl lg:text-6xl font-semibold leading-tight">
            Four layers of inheritance protection.
          </h2>

        </div>

        <div className="space-y-8">

          <div className="glass rounded-[32px] p-10 lg:p-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

            <div className="max-w-2xl">

              <h3 className="text-3xl font-semibold mb-5">
                1. Deposit Stablecoins
              </h3>

              <p className="text-zinc-400 text-lg leading-relaxed">
                Users deposit USDC into a decentralized
                inheritance vault secured by Arc smart contracts.
              </p>

            </div>

            <Link
              href="/deposit"
              className="primary-btn px-8 py-5 rounded-2xl flex items-center gap-3 w-fit"
            >
              Deposit Assets
              <ChevronRight />
            </Link>

          </div>

          <div className="glass rounded-[32px] p-10 lg:p-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

            <div className="max-w-2xl">

              <h3 className="text-3xl font-semibold mb-5">
                2. Configure Beneficiaries
              </h3>

              <p className="text-zinc-400 text-lg leading-relaxed">
                Add wallet addresses and allocate
                inheritance percentages securely.
              </p>

            </div>

            <Link
              href="/beneficiaries"
              className="glass px-8 py-5 rounded-2xl flex items-center gap-3 w-fit"
            >
              Manage Beneficiaries
              <ChevronRight />
            </Link>

          </div>

          <div className="glass rounded-[32px] p-10 lg:p-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

            <div className="max-w-2xl">

              <h3 className="text-3xl font-semibold mb-5">
                3. Maintain Activity
              </h3>

              <p className="text-zinc-400 text-lg leading-relaxed">
                The owner periodically uses the Ping Alive
                system to maintain vault ownership activity.
              </p>

            </div>

            <Link
              href="/security"
              className="glass px-8 py-5 rounded-2xl flex items-center gap-3 w-fit"
            >
              Open Security Layer
              <ChevronRight />
            </Link>

          </div>

          <div className="glass rounded-[32px] p-10 lg:p-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

            <div className="max-w-2xl">

              <h3 className="text-3xl font-semibold mb-5">
                4. Inheritance Execution
              </h3>

              <p className="text-zinc-400 text-lg leading-relaxed">
                Once inactivity thresholds are reached,
                beneficiaries can claim allocated assets.
              </p>

            </div>

            <Link
              href="/claim"
              className="glass px-8 py-5 rounded-2xl flex items-center gap-3 w-fit"
            >
              Claim Assets
              <ChevronRight />
            </Link>

          </div>

        </div>

      </section>

      {/* VAULT ACTIONS */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-28 relative z-10">

        <div className="max-w-3xl mb-20">

          <p className="text-cyan-300 mb-5 tracking-[0.2em] text-sm">
            VAULT ACTIONS
          </p>

          <h2 className="text-4xl lg:text-6xl font-semibold leading-tight">
            Dedicated pages for every vault operation.
          </h2>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {/* DEPOSIT */}
          <Link
            href="/deposit"
            className="glass rounded-[32px] p-10 hover:scale-[1.02] transition duration-300"
          >

            <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 flex items-center justify-center mb-8">
              <ArrowDownToLine className="text-cyan-300" size={30} />
            </div>

            <h3 className="text-3xl font-semibold mb-5">
              Deposit
            </h3>

            <p className="text-zinc-400 text-lg leading-relaxed">
              Securely move USDC into your
              inheritance vault.
            </p>

          </Link>

          {/* WITHDRAW */}
          <Link
            href="/withdraw"
            className="glass rounded-[32px] p-10 hover:scale-[1.02] transition duration-300"
          >

            <div className="w-16 h-16 rounded-3xl bg-orange-500/10 flex items-center justify-center mb-8">
              <ArrowUpFromLine className="text-orange-300" size={30} />
            </div>

            <h3 className="text-3xl font-semibold mb-5">
              Withdraw
            </h3>

            <p className="text-zinc-400 text-lg leading-relaxed">
              Access vault liquidity securely
              before inheritance activation.
            </p>

          </Link>

          {/* BENEFICIARIES */}
          <Link
            href="/beneficiaries"
            className="glass rounded-[32px] p-10 hover:scale-[1.02] transition duration-300"
          >

            <div className="w-16 h-16 rounded-3xl bg-purple-500/10 flex items-center justify-center mb-8">
              <Users className="text-purple-300" size={30} />
            </div>

            <h3 className="text-3xl font-semibold mb-5">
              Beneficiaries
            </h3>

            <p className="text-zinc-400 text-lg leading-relaxed">
              Manage recipient wallets and
              inheritance allocations.
            </p>

          </Link>

          {/* PING */}
          <Link
            href="/security"
            className="glass rounded-[32px] p-10 hover:scale-[1.02] transition duration-300"
          >

            <div className="w-16 h-16 rounded-3xl bg-green-500/10 flex items-center justify-center mb-8">
              <HeartPulse className="text-green-300" size={30} />
            </div>

            <h3 className="text-3xl font-semibold mb-5">
              Ping Alive
            </h3>

            <p className="text-zinc-400 text-lg leading-relaxed">
              Maintain activity status and
              prevent inheritance execution.
            </p>

          </Link>

          {/* CLAIM */}
          <Link
            href="/claim"
            className="glass rounded-[32px] p-10 hover:scale-[1.02] transition duration-300"
          >

            <div className="w-16 h-16 rounded-3xl bg-blue-500/10 flex items-center justify-center mb-8">
              <HandCoins className="text-blue-300" size={30} />
            </div>

            <h3 className="text-3xl font-semibold mb-5">
              Claim Inheritance
            </h3>

            <p className="text-zinc-400 text-lg leading-relaxed">
              Beneficiaries can securely claim
              inherited digital assets.
            </p>

          </Link>

          {/* SECURITY */}
          <Link
            href="/security"
            className="glass rounded-[32px] p-10 hover:scale-[1.02] transition duration-300"
          >

            <div className="w-16 h-16 rounded-3xl bg-red-500/10 flex items-center justify-center mb-8">
              <ShieldCheck className="text-red-300" size={30} />
            </div>

            <h3 className="text-3xl font-semibold mb-5">
              Security Layer
            </h3>

            <p className="text-zinc-400 text-lg leading-relaxed">
              Monitor inheritance protection
              and trigger security operations.
            </p>

          </Link>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-14 relative z-10">

        <div className="max-w-7xl mx-auto px-5 lg:px-8 flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">

          <div>

            <h2 className="text-2xl font-semibold mb-3">
              LegacyArc
            </h2>

            <p className="text-zinc-400 max-w-xl leading-relaxed">
              A decentralized inheritance protocol designed
              for stablecoin vaults, long-term wealth
              preservation, and secure beneficiary execution.
            </p>

          </div>

          <div className="flex items-center gap-3 text-zinc-500">
            <LockKeyhole size={18} />
            LegacyArc © 2026
          </div>

        </div>

      </footer>

    </main>
  );
}