export function darken(hex: string, percent = 20) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  // Convert RGB → HSL
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h: number,
    s: number,
    l: number = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h /= 6;
  }

  // DARKEN by reducing lightness
  l = l * (1 - percent / 100);
  l = Math.max(0, Math.min(1, l));

  // Convert HSL → RGB
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  function hue2rgb(p: number, q: number, t: number) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }

  r = hue2rgb(p, q, h + 1 / 3);
  g = hue2rgb(p, q, h);
  b = hue2rgb(p, q, h - 1 / 3);

  return (
    '#' +
    Math.round(r * 255)
      .toString(16)
      .padStart(2, '0') +
    Math.round(g * 255)
      .toString(16)
      .padStart(2, '0') +
    Math.round(b * 255)
      .toString(16)
      .padStart(2, '0')
  );
}

export const applyTheme = (theme: {
  primaryColor: string;
  secondaryColor: string;
  chatBotResponseBGColor?: string;
  chatBotResponseTextColor?: string;
}) => {
  document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
  document.documentElement.style.setProperty('--secondary-color', theme.secondaryColor);

  console.log(theme.primaryColor, darken(theme.primaryColor, 30));

  document.documentElement.style.setProperty('--primary-hover', darken(theme.primaryColor, 30));

  if (theme.chatBotResponseBGColor) {
    document.documentElement.style.setProperty(
      '--chatBotResponseBGColor',
      theme.chatBotResponseBGColor,
    );
  }
  if (theme.chatBotResponseTextColor) {
    document.documentElement.style.setProperty(
      '--chatBotResponseTextColor',
      theme.chatBotResponseTextColor,
    );
  }
};
