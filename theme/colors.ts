export const palette = {
  void: '#0D0A12',
  surface: '#1C1528',
  surface2: '#241D33',
  surface3: '#2E2542',
  rim: '#3D3255',
  rim2: '#524569',
  plum: '#7B4FA6',
  plumLight: '#9B6EC8',
  plumGlow: '#C49AE8',
  rose: '#C4708A',
  roseLight: '#E8A0B8',
  gold: '#C8A96E',
  text: '#F0EAF8',
  textSoft: '#B8A8D0',
  textFaint: '#8D7DA5',
  textGhost: '#3D3255',
} as const;

export type CategorySlug =
  | 'warmup'
  | 'connection'
  | 'depth'
  | 'intimacy'
  | 'challenges'
  | 'spicy';

export const categoryAccent: Record<CategorySlug, string> = {
  warmup: '#8BB88A',
  connection: '#7A9EC4',
  depth: '#9B6EC8',
  intimacy: '#C4708A',
  challenges: '#C8A96E',
  spicy: '#E8A0B8',
};

export const gradients = {
  ctaButton: { angle: 135, stops: ['#7B4FA6', '#9B50C8'] },
  headlineText: { angle: 135, stops: ['#C49AE8', '#E8A0B8'] },
  cardBack: { angle: 160, stops: ['#241D33', '#1C1528'] },
  ambientGlow: { type: 'radial', stops: ['rgba(123,79,166,0.25)', 'transparent'] },
  progressBar: { angle: 90, stops: ['#7B4FA6', '#C49AE8'] },
} as const;

export type Palette = typeof palette;
export type PaletteToken = keyof Palette;
