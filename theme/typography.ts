import type { TextStyle } from 'react-native';

export const fontFamily = {
  serif: 'CormorantGaramond',
  serifItalic: 'CormorantGaramond-Italic',
  sans: 'Jost',
} as const;

export type FontFamilyToken = keyof typeof fontFamily;

export const typeScale = {
  display: {
    fontFamily: fontFamily.serifItalic,
    fontWeight: '300',
    fontSize: 42,
  },
  categoryName: {
    fontFamily: fontFamily.serifItalic,
    fontWeight: '300',
    fontSize: 38,
  },
  statsHeadline: {
    fontFamily: fontFamily.serifItalic,
    fontWeight: '300',
    fontSize: 36,
  },
  statValue: {
    fontFamily: fontFamily.serif,
    fontWeight: '300',
    fontSize: 38,
  },
  cardText: {
    fontFamily: fontFamily.serifItalic,
    fontWeight: '300',
    fontSize: 21,
  },
  cardWordmark: {
    fontFamily: fontFamily.serifItalic,
    fontWeight: '300',
    fontSize: 32,
  },
  uiBody: {
    fontFamily: fontFamily.sans,
    fontWeight: '400',
    fontSize: 13,
  },
  button: {
    fontFamily: fontFamily.sans,
    fontWeight: '500',
    fontSize: 15,
    letterSpacing: 0.6,
  },
  pillText: {
    fontFamily: fontFamily.sans,
    fontWeight: '400',
    fontSize: 12,
  },
  tileName: {
    fontFamily: fontFamily.sans,
    fontWeight: '500',
    fontSize: 13,
  },
  labelCap: {
    fontFamily: fontFamily.sans,
    fontWeight: '500',
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  metaHint: {
    fontFamily: fontFamily.sans,
    fontWeight: '400',
    fontSize: 11,
  },
} as const satisfies Record<string, TextStyle>;

export type TypeScaleToken = keyof typeof typeScale;
