"use client";

import { useState } from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";

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

export default function WithdrawPage() {

  const [amount, setAmount] = useState("");

  const { address } = useAccount();

  const { writeContract } = useWriteContract();

  const { data: vaultBalance } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getBalance",
  });

  const { data: walletBalance } = useReadContract({
    address: USDC_ADDRESS,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  });

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

      <div className="max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-10">

          <div>
            <h1 className="text-5xl font-semibold">
              Withdraw Assets
            </h1>

            <p className="text-zinc-400 mt-3 text-lg">
              Securely withdraw liquidity from your inheritance vault.
            </p>
          </div>

          <ConnectButton showBalance={false} />

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          <div className="glass rounded-3xl p-8">

            <p className="text-zinc-400 mb-3">
              Vault Balance
            </p>

            <h2 className="text-4xl font-semibold">
              {vaultBalance
                ? Number(vaultBalance) / 1e6
                : "0"}
            </h2>

            <p className="text-cyan-300 mt-2">
              USDC
            </p>

          </div>

          <div className="glass rounded-3xl p-8">

            <p className="text-zinc-400 mb-3">
              Wallet Balance
            </p>

            <h2 className="text-4xl font-semibold">
              {walletBalance
                ? Number(walletBalance) / 1e6
                : "0"}
            </h2>

            <p className="text-purple-300 mt-2">
              USDC
            </p>

          </div>

        </div>

        <div className="glass rounded-3xl p-10 max-w-2xl">

          <h2 className="text-3xl font-semibold mb-4">
            Withdraw USDC
          </h2>

          <p className="text-zinc-400 mb-8">
            Enter the amount you want to withdraw from the vault.
          </p>

          <div className="flex flex-col gap-5">

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input-modern w-full p-5 rounded-2xl"
            />

            <button
              onClick={withdrawUSDC}
              className="bg-orange-500 hover:bg-orange-400 text-black py-5 rounded-2xl font-semibold text-lg transition"
            >
              Withdraw USDC
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}