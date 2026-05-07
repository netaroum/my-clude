"use client";

import { useState } from "react";
import { BusinessInfo } from "@/lib/types";

interface Props {
  onSubmit: (info: BusinessInfo) => void;
  isLoading: boolean;
}

export default function MangaForm({ onSubmit, isLoading }: Props) {
  const [form, setForm] = useState<BusinessInfo>({
    companyName: "",
    industry: "",
    productService: "",
    targetCustomer: "",
    keyMessage: "",
    panelCount: "6",
    tone: "friendly",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const set = (field: keyof BusinessInfo) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Company Name */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            会社名 / 店舗名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.companyName}
            onChange={set("companyName")}
            placeholder="例: 田中ベーカリー"
            required
            className="w-full px-4 py-2.5 border-2 border-gray-800 rounded-lg focus:outline-none focus:border-red-500 bg-white text-gray-900 font-medium transition-colors"
          />
        </div>

        {/* Industry */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            業種 / 業態 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.industry}
            onChange={set("industry")}
            placeholder="例: 飲食業（パン屋）、IT企業、不動産"
            required
            className="w-full px-4 py-2.5 border-2 border-gray-800 rounded-lg focus:outline-none focus:border-red-500 bg-white text-gray-900 font-medium transition-colors"
          />
        </div>

        {/* Product/Service */}
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-1">
            商品・サービス <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.productService}
            onChange={set("productService")}
            placeholder="例: 天然酵母を使った体に優しいパン、毎日焼きたて"
            required
            className="w-full px-4 py-2.5 border-2 border-gray-800 rounded-lg focus:outline-none focus:border-red-500 bg-white text-gray-900 font-medium transition-colors"
          />
        </div>

        {/* Target Customer */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            ターゲット顧客 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.targetCustomer}
            onChange={set("targetCustomer")}
            placeholder="例: 健康意識の高い30代ファミリー"
            required
            className="w-full px-4 py-2.5 border-2 border-gray-800 rounded-lg focus:outline-none focus:border-red-500 bg-white text-gray-900 font-medium transition-colors"
          />
        </div>

        {/* Key Message */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            伝えたいメッセージ <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.keyMessage}
            onChange={set("keyMessage")}
            placeholder="例: 毎日食べたくなる、本物の味"
            required
            className="w-full px-4 py-2.5 border-2 border-gray-800 rounded-lg focus:outline-none focus:border-red-500 bg-white text-gray-900 font-medium transition-colors"
          />
        </div>

        {/* Panel Count */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            コマ数
          </label>
          <select
            value={form.panelCount}
            onChange={set("panelCount")}
            className="w-full px-4 py-2.5 border-2 border-gray-800 rounded-lg focus:outline-none focus:border-red-500 bg-white text-gray-900 font-medium transition-colors"
          >
            <option value="4">4コマ漫画</option>
            <option value="6">6コマ漫画</option>
            <option value="8">8コマ漫画</option>
          </select>
        </div>

        {/* Tone */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            トーン・雰囲気
          </label>
          <select
            value={form.tone}
            onChange={set("tone")}
            className="w-full px-4 py-2.5 border-2 border-gray-800 rounded-lg focus:outline-none focus:border-red-500 bg-white text-gray-900 font-medium transition-colors"
          >
            <option value="friendly">😊 親しみやすい・温かい</option>
            <option value="professional">💼 プロフェッショナル・信頼感</option>
            <option value="humorous">😄 ユーモア・楽しい</option>
            <option value="emotional">💝 感動・エモーショナル</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-gray-900 text-white font-black text-lg rounded-lg border-4 border-gray-900 hover:bg-red-600 hover:border-red-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            漫画を生成中...（約15〜30秒）
          </span>
        ) : (
          "✏️ 漫画を生成する"
        )}
      </button>
    </form>
  );
}
