export const space = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 28,
  '2xl': 48,
} as const;

export type SpaceToken = keyof typeof space;

export const radius = {
  card: 24,
  tile: 20,
  stat: 18,
  button: 16,
  buttonTight: 14,
  pill: 100,
  bar: 100,
} as const;

export type RadiusToken = keyof typeof radius;

export const shadow = {
  playingCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.6,
    shadowRadius: 48,
    elevation: 18,
  },
  ctaButton: {
    shadowColor: '#7B4FA6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 32,
    elevation: 12,
  },
} as const;

export const minTapTarget = 44;
