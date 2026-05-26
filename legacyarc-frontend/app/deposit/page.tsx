"use client";

import { useState } from "react";

import Link from "next/link";

import {
  useWriteContract,
  useReadContract,
  useAccount,
} from "wagmi";

import {
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
  USDC_ADDRESS,
  ERC20_ABI,
} from "../../lib/contract";

export default function DepositPage() {

  const [amount, setAmount] = useState("");

  const { address } = useAccount();

  const { writeContract } = useWriteContract();

  // WALLET BALANCE
  const { data: usdcBalance } = useReadContract({
    address: USDC_ADDRESS,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  });

  // APPROVE
  const approveUSDC = async () => {
    writeContract({
      address: USDC_ADDRESS,
      abi: ERC20_ABI,
      functionName: "approve",
      args: [
        CONTRACT_ADDRESS,
        BigInt(Number(amount) * 1e6),
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
              Deposit
            </h1>

            <p className="text-zinc-400 mt-3">
              Fund your inheritance vault securely.
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
            Wallet Balance
          </p>

          <h2 className="text-4xl font-semibold mb-8">
            {usdcBalance
              ? Number(usdcBalance) / 1e6
              : "0"} USDC
          </h2>

          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input-modern w-full p-5 rounded-2xl mb-6"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <button
              onClick={approveUSDC}
              className="bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-2xl font-semibold transition"
            >
              Approve USDC
            </button>

            <button
              onClick={depositUSDC}
              className="primary-btn py-4 rounded-2xl"
            >
              Deposit USDC
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}