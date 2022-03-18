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

export const styleGuideHeader = (heading: string): FrameNode => {
  const frame = figma.createFrame();
  frame.name = heading;
  frame.layoutMode = 'VERTICAL';
  frame.counterAxisSizingMode = 'AUTO';

  const text = figma.createText();
  text.fontName = {
    family: 'Roboto',
    style: 'Bold'
  }
  text.characters = heading;
  text.textCase = 'UPPER';
  text.letterSpacing = {
    value: 2,
    unit: 'PIXELS'
  }
  text.fontSize = 32;
  text.lineHeight = {
    value: 64,
    unit: 'PIXELS'
  }

  const underline = figma.createRectangle();
  underline.resize(500, 3);
  underline.fills = paint('#CCCCCC');

  frame.appendChild(text);
  frame.appendChild(underline);

  return frame;
}
