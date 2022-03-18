import { createColumn, createRow, hexToRgb, styleGuideHeader } from "../Helpers/Helpers";
export interface Color {
  name: string;
  hex: string;
}

interface Options {
  colorRows: Array<Array<Color>>;
  styleGuide: FrameNode
}

export class Colors {

  private _styleGuide: FrameNode;
  private _colorRows: Array<Array<Color>>;
  private _colorsFrame: FrameNode;
  private _colorRectHeight: number;
  private _colorRectWidth: number;
  private _colorRectMarginBottom: number;
  private _colorCommponentMarginRight: number;

  static init(options: Options) {
    new this(options)
  }

  constructor(options: Options) {
    this._styleGuide = options.styleGuide;
    this._colorRows = options.colorRows;
    this._colorsFrame = createColumn('Colors', 30);
    this._colorRectHeight = 60;
    this._colorRectWidth = 140;
    this._colorRectMarginBottom = 12;
    this._colorCommponentMarginRight = 26;
    
    this.buildColorsFrame();
    this.appendToStyleGuide();
  }

  private buildColorsFrame() {
    this._colorsFrame.appendChild(styleGuideHeader('Colors'));
    for (const colorRow of this._colorRows) {
      const row = createRow('Color row', this._colorCommponentMarginRight);

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

      this._colorsFrame.appendChild(row);
    }
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

    const rgb = hexToRgb(hex);
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

  private appendToStyleGuide() {
    this._styleGuide.appendChild(this._colorsFrame);
  }
}