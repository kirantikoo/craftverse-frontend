"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Bot, Check, Clock, MessageCircle, Play, Sparkles, Trophy, Upload } from "lucide-react";
import type { Tutorial } from "@/src/data/tutorials";

export default function TutorialDetail({ tutorial }: { tutorial: Tutorial }) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [uploadReady, setUploadReady] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([
    "This lesson is saved to your CraftVerse learning path.",
  ]);

  const progress = useMemo(
    () => Math.round((completedSteps.length / tutorial.steps.length) * 100),
    [completedSteps.length, tutorial.steps.length],
  );

  function toggleStep(index: number) {
    setCompletedSteps((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  }

  function addComment() {
    const trimmed = comment.trim();
    if (!trimmed) return;
    setComments((current) => [trimmed, ...current]);
    setComment("");
  }

  return (
    <div className="mx-auto w-full max-w-[1540px] space-y-6 pb-4">
      <section className="overflow-hidden rounded-[32px] border border-slate-200/80 bg-[#FFF8F3] shadow-[0_24px_70px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-white/[0.07]">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_.9fr]">
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/70 px-4 py-2 text-sm font-black text-[#008099] dark:border-white/10 dark:bg-white/10 dark:text-cyan-200">
                <Sparkles size={16} />
                {tutorial.category} Tutorial
              </span>
              <span className="rounded-full bg-[#4EFE32]/18 px-4 py-2 text-sm font-black text-emerald-700 dark:text-[#4EFE32]">
                {tutorial.difficulty}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#7C4DFF]/10 px-4 py-2 text-sm font-black text-[#7C4DFF] dark:text-violet-200">
                <Clock size={16} />
                {tutorial.timeRequired}
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl dark:text-white">
              {tutorial.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-slate-200">
              {tutorial.description}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/ai-tutor" className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#008099] via-[#7C4DFF] to-pink-500 px-5 text-sm font-black text-white shadow-[0_12px_30px_rgba(124,77,255,0.30)] transition hover:-translate-y-0.5 hover:brightness-110">
                <Bot size={18} />
                Ask AI Tutor
              </Link>
              <Link href="/projects" className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-5 text-sm font-black text-slate-900 transition hover:border-[#4EFE32]/70 hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white">
                Upload Result
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          <div className="flex min-h-[340px] items-center justify-center bg-gradient-to-br from-[#008099] via-[#7C4DFF] to-pink-500 p-6 text-white">
            <div className="w-full rounded-[28px] border border-white/25 bg-white/15 p-5 shadow-2xl backdrop-blur-xl">
              <div className="flex aspect-video items-center justify-center rounded-3xl bg-slate-950/45">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#7C4DFF] shadow-xl">
                    <Play size={28} className="ml-1 fill-current" />
                  </div>
                  <p className="mt-4 text-sm font-black">{tutorial.videoTitle}</p>
                  <p className="mt-1 text-xs text-white/75">YouTube embed placeholder with attribution</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm font-black">
                <div className="rounded-2xl bg-white/15 p-3">{tutorial.difficulty}</div>
                <div className="rounded-2xl bg-white/15 p-3">{tutorial.timeRequired}</div>
                <div className="rounded-2xl bg-white/15 p-3">{tutorial.xp} XP</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[.8fr_1.2fr]">
        <div className="space-y-4">
          <div className="rounded-[28px] border border-slate-200 bg-white/85 p-5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Materials Checklist</h2>
            <div className="mt-4 space-y-3">
              {tutorial.materials.map((material) => (
                <label key={material} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#FFF8F3]/70 p-3 text-sm font-bold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                  <input type="checkbox" className="h-4 w-4 accent-[#008099]" />
                  {material}
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-[#7C4DFF]/20 bg-white/85 p-5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#008099] to-[#7C4DFF] text-white">
                <Bot size={22} />
              </div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">AI Summary</h2>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{tutorial.aiSummary}</p>
            <Link href="/ai-tutor" className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-[#7C4DFF] px-4 text-sm font-black text-white transition hover:brightness-110">
              Ask AI Tutor
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white/85 p-5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Earn XP</h2>
            <div className="mt-4 rounded-3xl bg-gradient-to-br from-[#4EFE32]/20 via-[#FFF8F3] to-[#7C4DFF]/15 p-5 dark:from-[#4EFE32]/10 dark:via-white/5 dark:to-[#7C4DFF]/20">
              <div className="flex items-center gap-3">
                <Trophy className="h-10 w-10 text-[#7C4DFF]" />
                <div>
                  <p className="text-3xl font-black text-slate-900 dark:text-white">+{tutorial.xp} XP</p>
                  <p className="text-sm font-bold text-slate-600 dark:text-slate-300">{progress}% lesson progress</p>
                </div>
              </div>
              <div className="mt-5 h-3 rounded-full bg-slate-900/10 dark:bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-[#4EFE32] to-[#008099]" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[28px] border border-slate-200 bg-white/85 p-5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Step-by-step Lessons</h2>
            <div className="mt-4 space-y-3">
              {tutorial.steps.map((step, index) => {
                const complete = completedSteps.includes(index);
                return (
                  <article key={step.title} className="rounded-3xl border border-slate-200 bg-[#FFF8F3]/75 p-4 dark:border-white/10 dark:bg-white/5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-black uppercase tracking-wide text-[#008099]">Step {index + 1} · {step.duration}</p>
                        <h3 className="mt-1 text-lg font-black text-slate-900 dark:text-white">{step.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{step.lesson}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleStep(index)}
                        className={`inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-black transition ${
                          complete
                            ? "bg-[#4EFE32] text-slate-950"
                            : "bg-white text-slate-900 shadow-sm hover:bg-cyan-50 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
                        }`}
                      >
                        {complete && <Check size={16} />}
                        {complete ? "Completed" : "Mark Step Complete"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[28px] border border-slate-200 bg-white/85 p-5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Tips</h2>
              <ul className="mt-4 space-y-3">
                {tutorial.tips.map((tip) => (
                  <li key={tip} className="rounded-2xl bg-[#4EFE32]/12 p-3 text-sm font-bold text-slate-700 dark:text-slate-200">{tip}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-white/85 p-5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Common Mistakes</h2>
              <ul className="mt-4 space-y-3">
                {tutorial.commonMistakes.map((mistake) => (
                  <li key={mistake} className="rounded-2xl bg-pink-500/10 p-3 text-sm font-bold text-slate-700 dark:text-slate-200">{mistake}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[28px] border border-slate-200 bg-white/85 p-5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#008099] text-white">
              <Upload size={22} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Upload Result</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">Placeholder for project image upload and moderation.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setUploadReady((value) => !value)}
            className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-2xl border border-dashed border-[#008099]/50 bg-[#FFF8F3] px-4 text-sm font-black text-slate-900 transition hover:bg-white dark:border-white/20 dark:bg-white/10 dark:text-white"
          >
            {uploadReady ? "Result Ready for Upload" : "Prepare Upload Placeholder"}
          </button>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white/85 p-5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7C4DFF] text-white">
              <MessageCircle size={22} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Comments</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">Local placeholder discussion for Phase 1.</p>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <input
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Add a project note..."
              className="h-12 min-w-0 flex-1 rounded-2xl border border-slate-200 bg-[#FFF8F3] px-4 text-sm font-bold text-slate-900 outline-none transition focus:border-[#7C4DFF] dark:border-white/10 dark:bg-white/10 dark:text-white"
            />
            <button type="button" onClick={addComment} className="h-12 rounded-2xl bg-[#7C4DFF] px-5 text-sm font-black text-white transition hover:brightness-110">
              Add Comment
            </button>
          </div>
          <div className="mt-4 space-y-2">
            {comments.map((item, index) => (
              <p key={`${item}-${index}`} className="rounded-2xl bg-[#FFF8F3]/80 p-3 text-sm font-bold text-slate-700 dark:bg-white/5 dark:text-slate-200">
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
