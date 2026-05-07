"use client";

import { useState } from "react";
import { MangaPanel as MangaPanelType } from "@/lib/types";
import { buildImageUrl } from "@/lib/utils";

interface Props {
  panel: MangaPanelType;
  index: number;
}

export default function MangaPanel({ panel, index }: Props) {
  const [imgError, setImgError] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  const imageUrl = buildImageUrl(panel.imagePrompt, panel.id);

  const sizeClass =
    panel.size === "large"
      ? "col-span-2 row-span-2"
      : panel.size === "small"
      ? "col-span-1"
      : "col-span-1";

  return (
    <div
      className={`${sizeClass} relative bg-white border-4 border-gray-900 overflow-hidden min-h-[200px] flex flex-col`}
      style={{ boxShadow: "inset 0 0 0 2px rgba(0,0,0,0.05)" }}
    >
      {/* Panel number */}
      <div className="absolute top-1 left-1 z-10 bg-gray-900 text-white text-xs font-black w-5 h-5 flex items-center justify-center rounded-full opacity-70">
        {index + 1}
      </div>

      {/* Scene image */}
      <div className="relative flex-1 min-h-[140px] bg-gray-100 overflow-hidden">
        {imgLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
              <span className="text-xs text-gray-400">画像生成中...</span>
            </div>
          </div>
        )}
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={panel.scene}
            className={`w-full h-full object-cover transition-opacity duration-300 ${imgLoading ? "opacity-0" : "opacity-100"}`}
            onLoad={() => setImgLoading(false)}
            onError={() => {
              setImgLoading(false);
              setImgError(true);
            }}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="text-4xl mb-2">🎨</div>
            <p className="text-xs text-gray-500 text-center">{panel.scene}</p>
          </div>
        )}

        {/* Narration overlay */}
        {panel.narration && (
          <div className="absolute top-2 right-2 left-2 bg-white/90 border border-gray-700 px-2 py-1 text-xs font-medium text-gray-800 text-center">
            {panel.narration}
          </div>
        )}
      </div>

      {/* Dialogue section */}
      {panel.dialogue.length > 0 && (
        <div className="p-2 space-y-1.5 bg-white border-t-2 border-gray-900">
          {panel.dialogue.map((d, i) => (
            <SpeechBubble key={i} dialogue={d} />
          ))}
        </div>
      )}
    </div>
  );
}

function SpeechBubble({ dialogue }: { dialogue: MangaPanelType["dialogue"][0] }) {
  if (dialogue.type === "narration") {
    return (
      <div className="text-xs text-gray-600 italic px-1 text-center">
        【{dialogue.text}】
      </div>
    );
  }

  const bubbleStyle =
    dialogue.type === "thought"
      ? "rounded-[50%] border-dashed border-2 border-gray-700 bg-gray-50"
      : dialogue.type === "shout"
      ? "border-4 border-gray-900 bg-yellow-50 font-black"
      : "rounded-2xl border-2 border-gray-800 bg-white";

  return (
    <div className={`relative px-3 py-1.5 text-xs text-gray-900 ${bubbleStyle}`}>
      <span className="font-bold text-red-600 mr-1">{dialogue.character}:</span>
      <span className={dialogue.type === "shout" ? "font-black text-gray-900" : "font-medium"}>
        {dialogue.text}
      </span>
    </div>
  );
}
