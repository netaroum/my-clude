"use client";

import { useState } from "react";
import { BusinessInfo, MangaScript } from "@/lib/types";
import MangaForm from "@/components/MangaForm";
import MangaViewer from "@/components/MangaViewer";

type AppState = "form" | "loading" | "result";

export default function Home() {
  const [state, setState] = useState<AppState>("form");
  const [script, setScript] = useState<MangaScript | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (info: BusinessInfo) => {
    setState("loading");
    setError(null);

    try {
      const res = await fetch("/api/generate-manga", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? `サーバーエラー (${res.status})`);
      }

      const data: MangaScript = await res.json();
      setScript(data);
      setState("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "予期しないエラーが発生しました");
      setState("form");
    }
  };

  const handleReset = () => {
    setScript(null);
    setError(null);
    setState("form");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 text-white py-4 px-4 no-print">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-wider">
              <span className="text-red-500">PR</span>漫画ジェネレーター
            </h1>
            <p className="text-gray-400 text-xs mt-0.5">
              お店・企業のPR広報漫画を自動生成
            </p>
          </div>
          {state === "result" && (
            <button
              onClick={handleReset}
              className="text-sm px-4 py-2 border-2 border-gray-500 hover:border-white text-gray-300 hover:text-white rounded-lg transition-colors font-bold"
            >
              ← 新しく作る
            </button>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Form view */}
        {(state === "form" || state === "loading") && (
          <div className="no-print">
            {/* Intro */}
            {state === "form" && (
              <div className="text-center mb-8">
                <div className="inline-block bg-red-600 text-white px-4 py-1 text-xs font-black tracking-widest mb-3 rounded">
                  AI自動生成
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
                  あなたのお店・会社の<br className="md:hidden" />PR漫画を作ろう
                </h2>
                <p className="text-gray-500 text-sm max-w-lg mx-auto">
                  情報を入力するだけで、AIがストーリーを考えて画像付きの漫画を自動生成します。
                  SNSやチラシ、ウェブサイトにご活用ください。
                </p>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-lg text-red-700 font-medium text-sm">
                <span className="font-bold">エラー: </span>{error}
              </div>
            )}

            {/* Card */}
            <div className="bg-white border-4 border-gray-900 rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)] p-6 md:p-8">
              <MangaForm onSubmit={handleSubmit} isLoading={state === "loading"} />
            </div>

            {/* Features */}
            {state === "form" && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: "🤖", title: "AIが脚本を生成", desc: "Claude AIが最適なストーリーを自動作成" },
                  { icon: "🎨", title: "画像も自動生成", desc: "各コマにAIイラストを自動で付与" },
                  { icon: "📱", title: "すぐ使える", desc: "印刷・SNS投稿・ウェブ掲載に対応" },
                ].map((f) => (
                  <div key={f.title} className="bg-white border-2 border-gray-200 rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">{f.icon}</div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{f.title}</h3>
                    <p className="text-gray-500 text-xs">{f.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Loading overlay */}
            {state === "loading" && (
              <div className="mt-8 text-center p-8 bg-white border-4 border-gray-900 rounded-xl">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center text-2xl">✏️</div>
                  </div>
                  <div>
                    <p className="font-black text-gray-900 text-lg">漫画を生成中...</p>
                    <p className="text-gray-500 text-sm mt-1">AIがストーリーを考えています（約15〜30秒）</p>
                  </div>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Result view */}
        {state === "result" && script && (
          <div>
            <div className="mb-6 no-print flex items-center justify-between">
              <div>
                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 text-xs font-bold rounded-full border border-green-300">
                  ✅ 生成完了
                </span>
                <p className="text-gray-500 text-xs mt-1 ml-1">
                  印刷ボタンでPDFとして保存できます
                </p>
              </div>
              <button
                onClick={handleReset}
                className="text-sm px-4 py-2 bg-gray-900 text-white rounded-lg font-bold hover:bg-red-600 transition-colors"
              >
                ✏️ 作り直す
              </button>
            </div>
            <MangaViewer script={script} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-gray-200 text-center text-xs text-gray-400 no-print">
        <p>PR漫画ジェネレーター — Powered by Claude AI × Pollinations.ai</p>
      </footer>
    </div>
  );
}
