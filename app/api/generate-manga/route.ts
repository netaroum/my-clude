import Anthropic from "@anthropic-ai/sdk";
import { BusinessInfo, MangaScript } from "@/lib/types";
import { extractJson } from "@/lib/utils";

const client = new Anthropic();

const TONE_LABELS: Record<BusinessInfo["tone"], string> = {
  friendly: "親しみやすく温かい",
  professional: "プロフェッショナルで信頼感がある",
  humorous: "ユーモアがあって楽しい",
  emotional: "感動的でエモーショナル",
};

export async function POST(request: Request) {
  const body: BusinessInfo = await request.json();

  const prompt = `あなたはプロの漫画脚本家です。以下の企業・店舗情報をもとに、PR広報漫画の脚本を作成してください。

企業・店舗情報:
- 会社名/店舗名: ${body.companyName}
- 業種: ${body.industry}
- 商品・サービス: ${body.productService}
- ターゲット顧客: ${body.targetCustomer}
- 伝えたいメッセージ: ${body.keyMessage}
- コマ数: ${body.panelCount}コマ
- トーン・雰囲気: ${TONE_LABELS[body.tone]}

以下のJSON形式のみで漫画脚本を作成してください。マークダウン記法は使わず、純粋なJSONのみを返してください:

{
  "title": "漫画タイトル（キャッチーで覚えやすい20文字以内）",
  "subtitle": "サブタイトル（会社名・サービス名を含む）",
  "characters": [
    {
      "name": "キャラクター名",
      "role": "役割（例：20代OLのお客様）",
      "description": "Appearance and personality for image generation (in English)"
    }
  ],
  "panels": [
    {
      "id": 1,
      "size": "large",
      "scene": "シーンの説明（日本語）",
      "dialogue": [
        {
          "character": "キャラクター名",
          "text": "セリフ（自然な日本語、30文字以内）",
          "type": "speech"
        }
      ],
      "imagePrompt": "Detailed scene description in English for manga illustration: character appearance, action, setting, emotion",
      "narration": "ナレーション文（必要な場合のみ、不要なら省略）"
    }
  ],
  "closing": "${body.companyName}のPRメッセージ（1〜2文）"
}

ストーリー構成のガイドライン:
1. 最初のコマ: 主人公（ターゲット顧客）の悩みや問題を紹介
2. 中間のコマ: ${body.companyName}の商品・サービスとの出会い、体験
3. 最後のコマ: 問題解決、満足している主人公、${body.companyName}のブランドメッセージ

技術仕様:
- dialogue.typeは: speech（通常会話）、thought（心の声）、shout（驚き・叫び）
- panel.sizeは: large（見開き・重要シーン）、medium（通常）、small（つなぎのコマ）
- imagePromptは英語で詳細に記述（キャラクター、動作、背景、感情を含む）
- セリフは自然で親しみやすい日本語
- 必ず${body.panelCount}個のpanelを作成すること
- 必ずJSONのみを返すこと（他のテキスト不要）`;

  try {
    const message = await client.messages.create({
      model: "claude-opus-4-7",
      max_tokens: 4096,
      thinking: { type: "adaptive" },
      messages: [{ role: "user", content: prompt }],
    });

    const textContent = message.content.find((b) => b.type === "text");
    if (!textContent || textContent.type !== "text") {
      return Response.json({ error: "No text response from Claude" }, { status: 500 });
    }

    const jsonStr = extractJson(textContent.text);
    const script: MangaScript = JSON.parse(jsonStr);

    // Validate panel count matches request
    if (script.panels.length !== parseInt(body.panelCount)) {
      // Trim or pad if necessary
      while (script.panels.length > parseInt(body.panelCount)) {
        script.panels.pop();
      }
    }

    return Response.json(script);
  } catch (error) {
    console.error("Generate manga error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: `Generation failed: ${message}` }, { status: 500 });
  }
}
