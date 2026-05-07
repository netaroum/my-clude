export function buildImageUrl(prompt: string, panelId: number): string {
  const mangaPrompt = `manga panel illustration, ${prompt}, black and white manga art style, clean ink lines, detailed, expressive characters, professional manga artwork`;
  const encoded = encodeURIComponent(mangaPrompt);
  return `https://image.pollinations.ai/prompt/${encoded}?width=512&height=384&model=flux&nologo=true&seed=${panelId * 42}`;
}

export function extractJson(text: string): string {
  // Remove markdown code blocks if present
  const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "");
  // Find JSON object boundaries
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON found in response");
  return cleaned.slice(start, end + 1);
}
