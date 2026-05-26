"use client";

import { useState } from "react";

import Link from "next/link";

import {
  useWriteContract,
  useReadContract,
} from "wagmi";

import {
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
} from "../../lib/contract";

export default function WithdrawPage() {

  const [amount, setAmount] = useState("");

  const { writeContract } = useWriteContract();

  // VAULT BALANCE
  const { data: vaultBalance } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getBalance",
  });

  // WITHDRAW
  const withdrawUSDC = async () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "withdraw",
      args: [
        BigInt(Number(amount) * 1e6),
      ],
    });
  };

  return (
    <main className="min-h-screen text-white px-6 py-10">

      <div className="max-w-3xl mx-auto">

        {/* TOP */}
        <div className="flex items-center justify-between mb-10">

          <div>
            <h1 className="text-5xl font-semibold">
              Withdraw
            </h1>

            <p className="text-zinc-400 mt-3">
              Withdraw funds from your inheritance vault.
            </p>
          </div>

          <Link
            href="/"
            className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 transition"
          >
            Dashboard
          </Link>

        </div>

        {/* CARD */}
        <div className="glass rounded-3xl p-8">

          <p className="text-zinc-400 mb-3">
            Vault Balance
          </p>

          <h2 className="text-4xl font-semibold mb-8">
            {vaultBalance
              ? Number(vaultBalance) / 1e6
              : "0"} USDC
          </h2>

          <input
            type="number"
            placeholder="Withdraw Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input-modern w-full p-5 rounded-2xl mb-6"
          />

          <button
            onClick={withdrawUSDC}
            className="w-full bg-orange-500 hover:bg-orange-400 text-black py-4 rounded-2xl font-semibold transition"
          >
            Withdraw USDC
          </button>

        </div>

      </div>

    </main>
  );
}