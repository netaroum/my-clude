export interface Character {
  name: string;
  role: string;
  description: string;
}

export interface Dialogue {
  character: string;
  text: string;
  type: "speech" | "thought" | "shout" | "narration";
}

export interface MangaPanel {
  id: number;
  size: "large" | "medium" | "small";
  scene: string;
  dialogue: Dialogue[];
  imagePrompt: string;
  narration?: string;
}

export interface MangaScript {
  title: string;
  subtitle: string;
  characters: Character[];
  panels: MangaPanel[];
  closing: string;
}

export interface BusinessInfo {
  companyName: string;
  industry: string;
  productService: string;
  targetCustomer: string;
  keyMessage: string;
  panelCount: "4" | "6" | "8";
  tone: "friendly" | "professional" | "humorous" | "emotional";
}
