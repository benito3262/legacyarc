"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import {
  useWriteContract,
  useReadContract,
  useAccount,
} from "wagmi";

import {
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
} from "../../lib/contract";

export default function SecurityPage() {

  const { address } = useAccount();

  const { writeContract } = useWriteContract();

  const { data: inheritanceStatus } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "inheritanceTriggered",
  });

  const { data: hasClaimed } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "hasClaimed",
    args: address ? [address] : undefined,
  });

  const { data: lastAlive } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "lastAlive",
  });

  const { data: inactivityLimit } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "inactivityLimit",
  });

  const pingAlive = async () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "pingAlive",
    });
  };

  const triggerInheritance = async () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "triggerInheritance",
    });
  };

  const claimInheritance = async () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "claim",
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
    <main className="min-h-screen text-white px-6 py-10">

      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-5xl font-semibold">
              Security Layer
            </h1>

            <p className="text-zinc-400 mt-3 text-lg">
              Manage inactivity detection and inheritance execution.
            </p>

          </div>

          <ConnectButton showBalance={false} />

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="glass rounded-3xl p-8">

            <p className="text-zinc-400 mb-3">
              Inheritance Status
            </p>

            <h2 className="text-3xl font-semibold">
              {inheritanceStatus
                ? "Triggered"
                : "Protected"}
            </h2>

          </div>

          <div className="glass rounded-3xl p-8">

            <p className="text-zinc-400 mb-3">
              Claim Status
            </p>

            <h2 className="text-3xl font-semibold">
              {hasClaimed
                ? "Claimed"
                : "Pending"}
            </h2>

          </div>

          <div className="glass rounded-3xl p-8">

            <p className="text-zinc-400 mb-3">
              Days Remaining
            </p>

            <h2 className="text-4xl font-semibold">
              {daysRemaining}
            </h2>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="glass rounded-3xl p-8 flex flex-col">

            <h2 className="text-2xl font-semibold mb-3">
              Ping Alive
            </h2>

            <p className="text-zinc-400 mb-8">
              Reset inactivity timer and maintain vault protection.
            </p>

            <button
              onClick={pingAlive}
              className="bg-green-600 hover:bg-green-500 text-white py-4 rounded-2xl font-semibold transition mt-auto"
            >
              Ping Alive
            </button>

          </div>

          <div className="glass rounded-3xl p-8 flex flex-col">

            <h2 className="text-2xl font-semibold mb-3">
              Trigger Inheritance
            </h2>

            <p className="text-zinc-400 mb-8">
              Execute inheritance if inactivity conditions are met.
            </p>

            <button
              onClick={triggerInheritance}
              className="bg-red-600 hover:bg-red-500 text-white py-4 rounded-2xl font-semibold transition mt-auto"
            >
              Trigger
            </button>

          </div>

          <div className="glass rounded-3xl p-8 flex flex-col">

            <h2 className="text-2xl font-semibold mb-3">
              Claim Assets
            </h2>

            <p className="text-zinc-400 mb-8">
              Beneficiaries can claim allocated inheritance funds.
            </p>

            <button
              onClick={claimInheritance}
              className="bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-semibold transition mt-auto"
            >
              Claim Inheritance
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}