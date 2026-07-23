const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const TileColours = [
  ["#00A99D", "#35E0CF", "#123C69", "#0B6B7A"],
  ["#F2994A", "#FFD36A", "#D97D2D", "#8C3F12"],
  ["#9B51E0", "#C078FF", "#4B1D91", "#123C69"],
  ["#2E7D6B", "#56D6A7", "#123C69", "#0B6B7A"],
  ["#1F4F7D", "#32B8E8", "#123C69", "#9B51E0"],
] as const;