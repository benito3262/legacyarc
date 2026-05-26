"use client";

import { useState, useEffect } from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import {
  useAccount,
  useReadContract,
  useWriteContract,
} from "wagmi";

import {
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
  USDC_ADDRESS,
  ERC20_ABI,
} from "../lib/contract";

export default function Home() {

  const [beneficiary, setBeneficiary] = useState("");
  const [share, setShare] = useState("");
  const [depositAmount, setDepositAmount] = useState("");

  const [timeLeft, setTimeLeft] = useState("Loading...");

  const { address } = useAccount();

  const { writeContract } = useWriteContract();

  // OWNER
  const { data: owner } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "owner",
  });

  // LAST ACTIVE
  const { data: lastAlive } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "lastAlive",
  });

  // INACTIVITY LIMIT
  const { data: inactivityLimit } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "inactivityLimit",
  });

  // VAULT BALANCE
  const { data } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getBalance",
  });

  // USER USDC BALANCE
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

  // CLAIM STATUS
  const { data: hasClaimed } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "hasClaimed",
    args: address ? [address] : undefined,
  });

  // COUNTDOWN TIMER
  useEffect(() => {

    if (!lastAlive || !inactivityLimit) return;

    const interval = setInterval(() => {

      const currentTime = Math.floor(Date.now() / 1000);

      const expiry =
        Number(lastAlive) + Number(inactivityLimit);

      const difference = expiry - currentTime;

      if (difference <= 0) {
        setTimeLeft("Inheritance Trigger Available");
        return;
      }

      const days = Math.floor(difference / 86400);

      const hours = Math.floor(
        (difference % 86400) / 3600
      );

      const minutes = Math.floor(
        (difference % 3600) / 60
      );

      setTimeLeft(
        `${days}d ${hours}h ${minutes}m`
      );

    }, 1000);

    return () => clearInterval(interval);

  }, [lastAlive, inactivityLimit]);

  // ADD BENEFICIARY
  const addBeneficiary = async () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "addBeneficiary",
      args: [beneficiary, BigInt(share)],
    });
  };

  // HEARTBEAT
  const pingAlive = async () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "pingAlive",
    });
  };

  // TRIGGER
  const triggerInheritance = async () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "triggerInheritance",
    });
  };

  // CLAIM
  const claimInheritance = async () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "claim",
    });
  };

  // APPROVE USDC
  const approveUSDC = async () => {
    writeContract({
      address: USDC_ADDRESS,
      abi: ERC20_ABI,
      functionName: "approve",
      args: [
        CONTRACT_ADDRESS,
        BigInt(Number(depositAmount) * 1e6),
      ],
    });
  };

  // DEPOSIT
  const depositUSDC = async () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "deposit",
      args: [
        BigInt(Number(depositAmount) * 1e6),
      ],
    });
  };

  // WITHDRAW
  const withdrawUSDC = async () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "withdraw",
      args: [
        BigInt(Number(depositAmount) * 1e6),
      ],
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0B1020] via-[#111827] to-[#1E293B] text-white">

      {/* NAVBAR */}
      <nav className="w-full border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-xl shadow-lg shadow-cyan-500/20">
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
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-14">

        <div className="max-w-4xl">

          <div className="inline-flex px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-sm mb-8">
            SECURE • ONCHAIN • STABLECOIN READY
          </div>

          <h1 className="text-6xl md:text-7xl font-semibold leading-tight tracking-tight">
            The inheritance layer
            for digital assets.
          </h1>

          <p className="text-xl text-zinc-400 mt-8 leading-relaxed max-w-2xl">
            Securely distribute stablecoins and onchain wealth
            to beneficiaries through automated inactivity detection.
          </p>

        </div>

      </section>

      {/* DASHBOARD */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        {/* TOP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <p className="text-zinc-400 text-sm mb-4">
              Vault Balance
            </p>

            <h2 className="text-5xl font-semibold">
              {data ? Number(data) / 1e6 : "0"}
            </h2>

            <p className="text-cyan-300 mt-2">
              USDC
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <p className="text-zinc-400 text-sm mb-4">
              Wallet Balance
            </p>

            <h2 className="text-5xl font-semibold">
              {usdcBalance ? Number(usdcBalance) / 1e6 : "0"}
            </h2>

            <p className="text-cyan-300 mt-2">
              USDC
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <p className="text-zinc-400 text-sm mb-4">
              Inheritance Status
            </p>

            <h2 className="text-3xl font-semibold">
              {inheritanceStatus ? "ACTIVE" : "SECURE"}
            </h2>

            <div className={`mt-5 inline-flex px-4 py-2 rounded-full text-sm font-medium ${
              inheritanceStatus
                ? "bg-red-500/20 text-red-300"
                : "bg-green-500/20 text-green-300"
            }`}>
              {inheritanceStatus ? "Triggered" : "Protected"}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <p className="text-zinc-400 text-sm mb-4">
              Countdown
            </p>

            <h2 className="text-2xl font-semibold">
              {timeLeft}
            </h2>

            <p className="text-cyan-300 mt-4 text-sm break-all">
              Owner:
            </p>

            <p className="text-sm text-zinc-400 mt-1 break-all">
              {owner ? String(owner) : "Loading..."}
            </p>
          </div>

        </div>

        {/* SECOND GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

          {/* BENEFICIARY */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">

            <h2 className="text-2xl font-semibold mb-2">
              Beneficiaries
            </h2>

            <p className="text-zinc-400 mb-8">
              Configure inheritance allocations.
            </p>

            <div className="flex flex-col gap-4">

              <input
                type="text"
                placeholder="Wallet Address"
                value={beneficiary}
                onChange={(e) => setBeneficiary(e.target.value)}
                className="w-full p-4 rounded-2xl bg-black/30 border border-white/10 outline-none"
              />

              <input
                type="number"
                placeholder="Allocation Percentage"
                value={share}
                onChange={(e) => setShare(e.target.value)}
                className="w-full p-4 rounded-2xl bg-black/30 border border-white/10 outline-none"
              />

              <button
                onClick={addBeneficiary}
                className="bg-cyan-500 hover:bg-cyan-400 text-black py-4 rounded-2xl font-semibold transition"
              >
                Add Beneficiary
              </button>

            </div>

          </div>

          {/* CONTROLS */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">

            <h2 className="text-2xl font-semibold mb-2">
              Vault Controls
            </h2>

            <p className="text-zinc-400 mb-8">
              Deposit funds and manage inheritance execution.
            </p>

            <div className="flex flex-col gap-4">

              <input
                type="number"
                placeholder="Deposit Amount (USDC)"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="w-full p-4 rounded-2xl bg-black/30 border border-white/10 outline-none"
              />

              <button
                onClick={approveUSDC}
                className="bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-2xl font-semibold transition"
              >
                Approve USDC
              </button>

              <button
                onClick={depositUSDC}
                className="bg-cyan-500 hover:bg-cyan-400 text-black py-4 rounded-2xl font-semibold transition"
              >
                Deposit USDC
              </button>

              <button
                onClick={withdrawUSDC}
                className="bg-orange-500 hover:bg-orange-400 text-black py-4 rounded-2xl font-semibold transition"
              >
                Withdraw USDC
              </button>

              <button
                onClick={pingAlive}
                className="bg-green-600 hover:bg-green-500 text-white py-4 rounded-2xl font-semibold transition"
              >
                Ping Alive
              </button>

              <button
                onClick={triggerInheritance}
                className="bg-red-600 hover:bg-red-500 text-white py-4 rounded-2xl font-semibold transition"
              >
                Trigger Inheritance
              </button>

              <button
                onClick={claimInheritance}
                className="bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-semibold transition"
              >
                Claim Inheritance
              </button>

            </div>

            <div className="mt-8 p-5 rounded-2xl bg-black/30 border border-white/10">
              <p className="text-sm text-zinc-400 mb-2">
                Claim Status
              </p>

              <h3 className="text-xl font-semibold">
                {hasClaimed ? "Already Claimed" : "Awaiting Claim"}
              </h3>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}