import { AppTheme } from "./react-native-paper";

// Function to convert RGB string to hex
const rgbToHex = (rgbString: string): string => {
  // Extract RGB values from string like "rgb(120, 69, 172)"
  const rgbMatch = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!rgbMatch) return "#000000"; // fallback

  const r = parseInt(rgbMatch[1]);
  const g = parseInt(rgbMatch[2]);
  const b = parseInt(rgbMatch[3]);

  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

// Function to create map style based on theme colors
export const createMapStyle = (theme: AppTheme, isDark: boolean) => {
  if (!isDark) return []; // Use default light style

  return [
    {
      elementType: "geometry",
      stylers: [
        {
          color: rgbToHex(theme.colors.surface),
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: rgbToHex(theme.colors.onSurface),
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: rgbToHex(theme.colors.surface),
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          color: rgbToHex(theme.colors.outline),
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: rgbToHex(theme.colors.onSurfaceVariant),
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: rgbToHex(theme.colors.surfaceVariant),
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: rgbToHex(theme.colors.primary),
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: rgbToHex(theme.colors.secondaryContainer),
        },
      ],
    },
  ];
};
