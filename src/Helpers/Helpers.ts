interface FigmaColor {
  r: number;
  g: number;
  b: number;
}

// source: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb#answer-5624139
export const hexToRgb = (hex: string): FigmaColor|null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : null;
}

export const paint = (color: string, opacity?: number): Array<Paint> => {
  const rgb = hexToRgb(color); 
  const op = opacity ? opacity : 1;

  return [
    {
      opacity: op,
      blendMode: 'NORMAL',
      type: 'SOLID',
      color: rgb
    }
  ];
}
