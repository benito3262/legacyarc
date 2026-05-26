"use client";

import { useState } from "react";

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

  const { address } = useAccount();

  const { writeContract } = useWriteContract();

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

  const { data: vaultBalance } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getBalance",
  });

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

  const now = Math.floor(Date.now() / 1000);

  const timeRemaining =
    lastAlive && inactivityLimit
      ? Number(lastAlive) + Number(inactivityLimit) - now
      : 0;

  const daysRemaining =
    timeRemaining > 0
      ? Math.floor(timeRemaining / 86400)
      : 0;

  return (
    <main className="min-h-screen text-white overflow-hidden">

      {/* BACKGROUND GLOWS */}
      <div className="fixed top-[-200px] left-[-200px] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl" />

      <div className="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl" />

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
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-20 relative z-10">

        <div className="max-w-4xl">

          <div className="inline-flex px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-sm mb-8 backdrop-blur-xl">
            SECURE • ONCHAIN • STABLECOIN READY
          </div>

          <h1 className="text-6xl md:text-7xl font-semibold leading-tight tracking-tight">

            The inheritance layer
            <br />
            for digital assets.

          </h1>

          <p className="text-xl text-zinc-400 mt-8 leading-relaxed max-w-2xl">

            Securely distribute stablecoins and onchain wealth
            to beneficiaries through automated inactivity detection.

          </p>

        </div>

      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <div className="glass rounded-3xl p-8">
            <p className="text-zinc-400 text-sm mb-3">
              Vault Balance
            </p>

            <h2 className="text-4xl font-semibold">
              {vaultBalance ? Number(vaultBalance) / 1e6 : "0"}
            </h2>

            <p className="text-cyan-300 mt-2">
              USDC
            </p>
          </div>

          <div className="glass rounded-3xl p-8">
            <p className="text-zinc-400 text-sm mb-3">
              Wallet Balance
            </p>

            <h2 className="text-4xl font-semibold">
              {usdcBalance ? Number(usdcBalance) / 1e6 : "0"}
            </h2>

            <p className="text-cyan-300 mt-2">
              USDC
            </p>
          </div>

          <div className="glass rounded-3xl p-8">
            <p className="text-zinc-400 text-sm mb-3">
              Owner
            </p>

            <h2 className="text-lg font-semibold break-all">
              {owner
                ? `${String(owner).slice(0, 6)}...${String(owner).slice(-4)}`
                : "N/A"}
            </h2>
          </div>

          <div className="glass rounded-3xl p-8">
            <p className="text-zinc-400 text-sm mb-3">
              Inactivity Timer
            </p>

            <h2 className="text-4xl font-semibold">
              {daysRemaining}
            </h2>

            <p className="text-cyan-300 mt-2">
              Days Remaining
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}