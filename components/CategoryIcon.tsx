import Svg, { Circle, Path } from 'react-native-svg';

import { categoryAccent, type CategorySlug } from '~/theme';

type Props = {
  slug: CategorySlug;
  size?: number;
  color?: string;
  strokeWidth?: number;
};

export function CategoryIcon({ slug, size = 22, color, strokeWidth = 1 }: Props) {
  const stroke = color ?? categoryAccent[slug];

  switch (slug) {
    case 'warmup':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M12 21 V10" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
          <Path
            d="M12 12 C12 9 9.5 7 6.5 7.5"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <Path
            d="M12 14 C12 11.5 14.5 9.5 17.5 10"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            opacity={0.75}
          />
        </Svg>
      );
    case 'connection':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Circle cx={9.5} cy={12} r={5.5} stroke={stroke} strokeWidth={strokeWidth} />
          <Circle
            cx={14.5}
            cy={12}
            r={5.5}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={stroke}
            fillOpacity={0.22}
          />
        </Svg>
      );
    case 'depth':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M2 6 Q7 3 12 6 T22 6"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <Path
            d="M2 12 Q7 9 12 12 T22 12"
            stroke={stroke}
            strokeWidth={strokeWidth * 0.9}
            strokeLinecap="round"
            opacity={0.7}
          />
          <Path
            d="M2 18 Q7 15 12 18 T22 18"
            stroke={stroke}
            strokeWidth={strokeWidth * 0.8}
            strokeLinecap="round"
            opacity={0.45}
          />
        </Svg>
      );
    case 'intimacy':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M2 14 H8 Q10 14 11 10 Q12 5 13 10 Q14 14 16 14 H22"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case 'challenges':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Circle cx={12} cy={12} r={9} stroke={stroke} strokeWidth={strokeWidth} />
          <Circle
            cx={12}
            cy={12}
            r={5}
            stroke={stroke}
            strokeWidth={strokeWidth * 0.9}
            opacity={0.7}
          />
          <Circle cx={12} cy={12} r={1.2} fill={stroke} />
        </Svg>
      );
    case 'spicy':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 3 C16 8 18 11 18 15 C18 18 15.5 21 12 21 C8.5 21 6 18 6 15 C6 12 8.5 10 10 7 C11 9 10 12 12 12 C13 10 11 7 12 3 Z"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
        </Svg>
      );
  }
}
