"use client";

import { MangaScript } from "@/lib/types";
import MangaPanel from "./MangaPanel";

interface Props {
  script: MangaScript;
}

export default function MangaViewer({ script }: Props) {
  const handlePrint = () => window.print();

  return (
    <div className="w-full">
      {/* Manga header */}
      <div className="mb-6 text-center">
        <div className="inline-block bg-gray-900 text-white px-6 py-3 mb-2">
          <h2 className="text-2xl md:text-3xl font-black tracking-wider">{script.title}</h2>
        </div>
        <p className="text-gray-600 font-medium text-sm mt-2">{script.subtitle}</p>
        {script.characters.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {script.characters.map((c, i) => (
              <span
                key={i}
                className="text-xs bg-gray-100 border border-gray-300 px-3 py-1 rounded-full font-medium text-gray-700"
              >
                <span className="font-bold text-gray-900">{c.name}</span>
                {" — "}{c.role}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Manga grid */}
      <div
        className="grid gap-1 bg-gray-900 border-4 border-gray-900 p-1"
        style={{
          gridTemplateColumns: "repeat(2, 1fr)",
          gridAutoRows: "minmax(220px, auto)",
        }}
      >
        {script.panels.map((panel, index) => (
          <MangaPanel key={panel.id} panel={panel} index={index} />
        ))}
      </div>

      {/* Closing message */}
      {script.closing && (
        <div className="mt-4 border-4 border-gray-900 bg-gray-900 text-white p-4 text-center">
          <p className="font-bold text-base">{script.closing}</p>
        </div>
      )}

      {/* Actions */}
      <div className="mt-6 flex gap-3 justify-center flex-wrap">
        <button
          onClick={handlePrint}
          className="px-6 py-2.5 bg-white border-2 border-gray-900 text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-colors"
        >
          🖨️ 印刷する
        </button>
        <ShareButton script={script} />
      </div>

      {/* Image generation note */}
      <p className="mt-4 text-center text-xs text-gray-400">
        ※ 画像はAI（pollinations.ai）によって自動生成されます。生成に少し時間がかかる場合があります。
      </p>
    </div>
  );
}

function ShareButton({ script }: { script: MangaScript }) {
  const handleCopy = async () => {
    const text = `【PR漫画】${script.title}\n${script.subtitle}\n\n${script.panels
      .map((p, i) => `[コマ${i + 1}] ${p.scene}\n${p.dialogue.map((d) => `${d.character}: ${d.text}`).join("\n")}`)
      .join("\n\n")}\n\n${script.closing}`;
    await navigator.clipboard.writeText(text);
    alert("テキストをコピーしました！");
  };

  return (
    <button
      onClick={handleCopy}
      className="px-6 py-2.5 bg-gray-900 text-white font-bold rounded-lg hover:bg-red-600 transition-colors border-2 border-gray-900"
    >
      📋 テキストをコピー
    </button>
  );
}
