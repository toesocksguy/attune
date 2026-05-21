import type { TextStyle } from 'react-native';

export const fontFamily = {
  serifLight: 'CormorantGaramond-Light',
  serifLightItalic: 'CormorantGaramond-LightItalic',
  serifSemibold: 'CormorantGaramond-SemiBold',
  sansLight: 'Jost-Light',
  sansRegular: 'Jost-Regular',
  sansMedium: 'Jost-Medium',
} as const;

export type FontFamilyToken = keyof typeof fontFamily;

export const typeScale = {
  display: {
    fontFamily: fontFamily.serifLightItalic,
    fontSize: 42,
  },
  categoryName: {
    fontFamily: fontFamily.serifLightItalic,
    fontSize: 38,
  },
  statsHeadline: {
    fontFamily: fontFamily.serifLightItalic,
    fontSize: 36,
  },
  statValue: {
    fontFamily: fontFamily.serifLight,
    fontSize: 38,
  },
  cardText: {
    fontFamily: fontFamily.serifLightItalic,
    fontSize: 21,
  },
  cardWordmark: {
    fontFamily: fontFamily.serifLightItalic,
    fontSize: 32,
  },
  uiBody: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 13,
  },
  button: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 15,
    letterSpacing: 0.6,
  },
  pillText: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 12,
  },
  tileName: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 13,
  },
  labelCap: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  metaHint: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 11,
  },
} as const satisfies Record<string, TextStyle>;

export type TypeScaleToken = keyof typeof typeScale;
