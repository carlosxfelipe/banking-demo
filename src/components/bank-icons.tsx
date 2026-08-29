import Svg, { Rect, Path, Text } from "react-native-svg";

export function NubankIcon({ size = 16, color = "#8A05BE" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect width="24" height="24" rx="6" fill={color} />
      <Path
        d="M15.46 9.4c-1.54 0-2.58.85-2.85 2.08v-.32H11.2v6.94h1.41v-3.79c0-1.39.62-2.4 1.78-2.4.93 0 1.47.7 1.47 1.93v4.25h1.41v-4.66c0-2.31-1.32-4.03-3.41-4.03h.15V9.4zM9.42 9.4c-1.85 0-3.17 1.24-3.17 3.09v7.55H7.66v-5.88c0-1.08.62-1.62 1.62-1.62 1.01 0 1.55.62 1.55 1.62v5.88h1.41V12.5c0-1.85-1.31-3.09-2.82-3.09"
        fill="#FFF"
      />
    </Svg>
  );
}

export function InterIcon({ size = 16, color = "#FF7A00" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect width="24" height="24" rx="6" fill={color} />
      <Text
        x="12"
        y="16.5"
        fontSize="13"
        fontWeight="bold"
        fontFamily="System"
        fill="#FFF"
        textAnchor="middle"
      >
        in
      </Text>
    </Svg>
  );
}
