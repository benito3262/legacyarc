"use client";

import { useState } from "react";

import Link from "next/link";

import {
  useWriteContract,
} from "wagmi";

import {
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
} from "../../lib/contract";

export default function BeneficiariesPage() {

  const [wallet, setWallet] = useState("");
  const [share, setShare] = useState("");

  const { writeContract } = useWriteContract();

  // ADD BENEFICIARY
  const addBeneficiary = async () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "addBeneficiary",
      args: [
        wallet,
        BigInt(share),
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
              Beneficiaries
            </h1>

            <p className="text-zinc-400 mt-3">
              Configure inheritance allocations securely.
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

          <input
            type="text"
            placeholder="Wallet Address"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            className="input-modern w-full p-5 rounded-2xl mb-5"
          />

          <input
            type="number"
            placeholder="Allocation Percentage"
            value={share}
            onChange={(e) => setShare(e.target.value)}
            className="input-modern w-full p-5 rounded-2xl mb-6"
          />

          <button
            onClick={addBeneficiary}
            className="w-full primary-btn py-4 rounded-2xl"
          >
            Add Beneficiary
          </button>

        </div>

      </div>

    </main>
  );
}