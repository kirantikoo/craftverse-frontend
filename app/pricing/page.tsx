"use client";

import { Check, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  detectUserCountry,
  getPricingByCountry,
} from "@/src/lib/pricing";

const STORAGE_KEY = "craftverse_region";

const countryOptions = [
  { label: "Australia", value: "AU" },
  { label: "India", value: "IN" },
  { label: "United States", value: "US" },
  { label: "United Kingdom", value: "GB" },
  { label: "Europe", value: "EU" },
  { label: "Other", value: "DEFAULT" },
];

const trialFeatures = [
  "Premium tutorials",
  "AI Craft Tutor access",
  "Save projects",
  "XP and badges",
];

const premiumFeatures = [
  "Full AI Tutor",
  "Unlimited saved projects",
  "Premium learning paths",
  "Marketplace seller tools later",
  "Priority new features",
];

type RegionSource = "detecting" | "detected" | "selected";

export default function PricingPage() {
  const [selectedCountry, setSelectedCountry] = useState("DEFAULT");
  const [regionSource, setRegionSource] = useState<RegionSource>("detecting");

  useEffect(() => {
    const detectionTimer = window.setTimeout(() => {
      const savedRegion = window.localStorage.getItem(STORAGE_KEY);

      if (savedRegion) {
        setSelectedCountry(savedRegion);
        setRegionSource("selected");
        return;
      }

      detectUserCountry().then((countryCode) => {
        setSelectedCountry(countryCode);
        setRegionSource("detected");
      });
    }, 0);

    return () => window.clearTimeout(detectionTimer);
  }, []);

  const selectedPricing = useMemo(
    () => getPricingByCountry(selectedCountry),
    [selectedCountry],
  );

  const handleRegionChange = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setRegionSource("selected");
    window.localStorage.setItem(STORAGE_KEY, countryCode);
  };

  const regionLabel =
    regionSource === "selected"
      ? `Selected region: ${selectedPricing.country}`
      : regionSource === "detected"
        ? `Detected region: ${selectedPricing.country}`
        : "Detecting your region...";

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-[#FFF8F3] via-white to-[#EFFFF0] px-4 py-6 text-slate-950 shadow-[0_22px_70px_rgba(0,128,153,0.12)] sm:px-6 sm:py-8 lg:px-8 dark:border-slate-700 dark:bg-[#050816] dark:bg-none dark:text-slate-100">
      <div className="mx-auto max-w-[1100px]">
        <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6 dark:border-slate-700 dark:bg-[#0B1220] dark:shadow-none">
          <div className="grid gap-5 lg:grid-cols-[1fr_310px] lg:items-center">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#008099]/15 bg-[#FFF8F3] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#008099] shadow-sm dark:border-[#4EFE32]/25 dark:bg-[#111827] dark:text-[#4EFE32]">
                <Sparkles size={14} />
                CraftVerse plans
              </p>
              <h1 className="max-w-3xl text-3xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                Start free, upgrade when you are ready
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700 dark:text-slate-300">
                Enjoy 15 days of premium CraftVerse learning. Your price is shown in your local region when available.
              </p>
            </div>

            <label className="block rounded-2xl border border-slate-200 bg-[#FFF8F3]/80 p-4 shadow-sm dark:border-slate-700 dark:bg-[#111827]">
              <span className="mb-2 block text-sm font-black text-slate-900 dark:text-slate-100">
                Choose your region
              </span>
              <select
                value={selectedCountry}
                onChange={(event) => handleRegionChange(event.target.value)}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-950 shadow-sm outline-none transition hover:border-[#008099]/50 focus:border-[#008099] focus:ring-4 focus:ring-[#008099]/15 dark:border-slate-700 dark:bg-[#0B1220] dark:text-white dark:hover:border-[#4EFE32]/60"
              >
                {countryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs font-bold text-slate-600 dark:text-slate-400">
                {regionLabel}
              </p>
            </label>
          </div>
        </div>

        <div className="mt-6 grid items-stretch gap-5 md:grid-cols-2">
          <article className="flex min-h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 text-slate-950 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-slate-700 dark:bg-[#0B1220] dark:text-slate-100 dark:shadow-none">
            <div>
              <span className="inline-flex rounded-full border border-[#008099]/15 bg-[#008099]/8 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#008099] dark:border-[#4EFE32]/25 dark:bg-[#4EFE32]/10 dark:text-[#4EFE32]">
                15-day trial
              </span>
              <h2 className="mt-4 text-2xl font-black text-slate-950 dark:text-white">
                Free Trial
              </h2>
              <p className="mt-3 text-4xl font-black text-[#008099] dark:text-[#4EFE32]">
                15 days
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Explore premium learning tools before choosing a paid plan.
              </p>
            </div>

            <ul className="mt-6 space-y-3">
              {trialFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm font-bold text-slate-800 dark:text-slate-200">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#4EFE32]/20 text-[#008099] ring-1 ring-[#4EFE32]/30 dark:bg-[#4EFE32]/12 dark:text-[#4EFE32] dark:ring-[#4EFE32]/20">
                    <Check size={16} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href="/login"
              className="mt-auto flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-[#008099]/25 bg-white px-5 text-center text-base font-black text-[#008099] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#008099] hover:text-white hover:shadow-lg dark:border-slate-600 dark:bg-[#111827] dark:text-slate-100 dark:hover:border-[#4EFE32] dark:hover:bg-[#4EFE32] dark:hover:text-slate-950"
            >
              Start learning
              <ChevronRight size={18} />
            </Link>
          </article>

          <article className="relative flex min-h-full flex-col overflow-hidden rounded-3xl border border-[#7C4DFF]/35 bg-gradient-to-br from-[#008099] via-[#7C4DFF] to-[#111827] p-6 text-white shadow-[0_24px_70px_rgba(124,77,255,0.28)] dark:border-slate-700 dark:shadow-none">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/35" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 left-8 h-52 w-52 rounded-full bg-[#4EFE32]/10 blur-3xl" />

            <div className="relative">
              <span className="inline-flex rounded-full border border-white/20 bg-white/12 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#4EFE32]">
                Best value
              </span>
              <h2 className="mt-4 text-2xl font-black text-white">
                Premium
              </h2>
              <p className="mt-3 text-4xl font-black text-[#4EFE32]">
                {selectedPricing.label}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-100">
                Keep every premium lesson, AI helper, and creator tool open as CraftVerse grows.
              </p>
            </div>

            <ul className="relative mt-6 space-y-3">
              {premiumFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm font-bold text-white">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#4EFE32]/18 text-[#4EFE32] ring-1 ring-[#4EFE32]/30">
                    <Check size={16} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href="/pricing"
              className="relative mt-auto flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 text-center text-base font-black text-[#111827] shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-[#4EFE32] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#4EFE32]/25"
            >
              Upgrade for {selectedPricing.label}
              <ChevronRight size={18} />
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
