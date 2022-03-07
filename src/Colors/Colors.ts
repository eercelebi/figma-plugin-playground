export interface Color {
  name: string;
  hex: string;
}

interface FigmaColor {
  r: number, 
  g: number,
  b: number
}

export class Colors {

  private _colorRows: Array<Array<Color>>;
  private _colorsFrame: FrameNode;
  private _colorRectHeight: number;
  private _colorRectWidth: number;
  private _colorRectMarginBottom: number;
  private _colorRowMarginBottom: number;
  private _colorCommponentMarginRight: number;

  static init(colorRows: Array<Array<Color>>) {
    new this(colorRows)
  }

  // source: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb#answer-5624139
  static hexToRgb(hex: string): FigmaColor|null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255
    } : null;
  }

  constructor(colorRows: Array<Array<Color>>) {
    this._colorRows = colorRows;
    this._colorsFrame = figma.createFrame();
    this._colorRectHeight = 60;
    this._colorRectWidth = 140;
    this._colorRectMarginBottom = 12;
    this._colorRowMarginBottom = 30;
    this._colorCommponentMarginRight = 26;

    // font must be loaded before any attempt at modifying text nodes.
    figma.loadFontAsync({
      family: 'Roboto',
      style: 'Regular'
    }).then(() => {
      this.buildColorsFrame();
      this.appendToCanvas();
    })
  }

  private buildColorsFrame() {
    let frameHeight = 0;
    for (const colorRow of this._colorRows) {
      const row = figma.createFrame();

      let rowHeight = 0;
      let rowItemCount = 0;
      for (const color of colorRow) {
        const component = this.buildColorComponent(color);
        if (component) {
          rowHeight = Math.max(rowHeight, component.height);
          row.appendChild(component);
          component.x = rowItemCount * (component.width + this._colorCommponentMarginRight);
          rowItemCount++;
        }
      }
      row.layoutMode = 'HORIZONTAL';
      row.counterAxisSizingMode = 'AUTO';
      row.itemSpacing = this._colorCommponentMarginRight;

      this._colorsFrame.appendChild(row);
      row.y = frameHeight;
      frameHeight += rowHeight + this._colorRowMarginBottom;
    }
    this._colorsFrame.layoutMode = 'VERTICAL';
    this._colorsFrame.counterAxisSizingMode = 'AUTO';
    this._colorsFrame.itemSpacing = this._colorRowMarginBottom;
  }

  /**
   * color components will have two children, a rectangle of that color and a text node with the color's name
   */
  private buildColorComponent(color: Color): ComponentNode|null {
    const component: ComponentNode = figma.createComponent();
    const { name, hex } = color;
    
    const textNode = figma.createText();
    textNode.characters = name;
    textNode.fontSize = 16;
    textNode.lineHeight = { value: 24, unit: 'PIXELS' };

    const rgb = Colors.hexToRgb(hex);
    const rectangleNode = figma.createRectangle();
    rectangleNode.resize(this._colorRectWidth, this._colorRectHeight);
    rectangleNode.fills = [{type: 'SOLID', color: rgb}];
    rectangleNode.cornerRadius = 5;

    component.appendChild(rectangleNode);
    component.appendChild(textNode);

    // set dimensions of component and positions of children
    component.resize(this._colorRectWidth, this._colorRectHeight + this._colorRectMarginBottom + textNode.height);
    textNode.y = this._colorRectHeight + this._colorRectMarginBottom;
    return component;
  }

  private appendToCanvas() {
    figma.currentPage.appendChild(this._colorsFrame);
  }
}