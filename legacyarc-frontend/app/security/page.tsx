"use client";

import Link from "next/link";

import {
  ShieldCheck,
  Activity,
} from "lucide-react";

export default function SecurityPage() {

  return (
    <main className="min-h-screen text-white px-6 py-10">

      <div className="max-w-5xl mx-auto">

        {/* TOP */}
        <div className="flex items-center justify-between mb-12">

          <div>
            <h1 className="text-5xl font-semibold">
              Security Layer
            </h1>

            <p className="text-zinc-400 mt-3">
              Monitor inheritance protection and vault activity.
            </p>
          </div>

          <Link
            href="/"
            className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 transition"
          >
            Dashboard
          </Link>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="glass rounded-3xl p-8">

            <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6">
              <ShieldCheck className="text-green-300" />
            </div>

            <h2 className="text-2xl font-semibold mb-4">
              Vault Protection
            </h2>

            <p className="text-zinc-400 leading-relaxed">
              LegacyArc continuously protects vault assets
              until inactivity conditions are met.
            </p>

          </div>

          <div className="glass rounded-3xl p-8">

            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6">
              <Activity className="text-cyan-300" />
            </div>

            <h2 className="text-2xl font-semibold mb-4">
              Activity Monitoring
            </h2>

            <p className="text-zinc-400 leading-relaxed">
              Owners can maintain vault protection
              through heartbeat verification activity.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}