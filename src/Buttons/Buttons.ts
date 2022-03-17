import { paint } from "../Helpers/Helpers";

export interface ButtonConfig {
  name: string;
  default: any;
  hover: any;
  focus: any;
  active: any;
}

interface Options {
  styleGuide: FrameNode;
  buttons: Array<ButtonConfig>;
}

export class Buttons {

  private _styleGuide: FrameNode;
  private _buttons: Array<ButtonConfig>;
  private _buttonsFrame: FrameNode;
  private _typeOrder: Array<string>;

  static init(options) {
    new this(options);
  }

  constructor(options: Options) {
    this._styleGuide = options.styleGuide;
    this._buttons = options.buttons;
    this._buttonsFrame = figma.createFrame();
    this._typeOrder = ['default', 'hover', 'focus', 'active'];

    this._buttonsFrame.name = 'Buttons';
    this._buttonsFrame.layoutMode = 'VERTICAL';
    this._buttonsFrame.counterAxisSizingMode = 'AUTO';
    this._buttonsFrame.itemSpacing = 40;

    figma.loadFontAsync({
      family: 'Roboto',
      style: 'Regular'
    }).then(() => {
      this.buildButtonsFrame();
      this.appendToStyleGuide();
    });
  }

  private buildButtonsFrame() {
    for (const button of this._buttons) {
      const row = figma.createFrame();
      row.name = button.name;
      row.layoutMode = 'HORIZONTAL';
      row.counterAxisSizingMode = 'AUTO';
      row.itemSpacing = 175;
      row.paddingTop = 16;
      row.paddingBottom = 16;

      const defaultStyles = button.default;

      for (const type of this._typeOrder) {
        // start with copy of default styles
        const styles = JSON.parse(JSON.stringify(defaultStyles));

        // override any attributes for that button type
        Object.assign(styles, button[type]);

        const buttonComponent = figma.createComponent();
        const content = figma.createFrame();
        const text = figma.createText();
        let outline = null;

        content.name = type;
        content.layoutMode = 'VERTICAL';
        content.counterAxisSizingMode = 'AUTO';
        content.backgrounds = paint(styles.background);
        content.paddingTop = styles.paddingTop;
        content.paddingBottom = styles.paddingBottom ? styles.paddingBottom : styles.paddingTop;
        content.paddingLeft = styles.paddingLeft;
        content.paddingRight = styles.paddingRight ? styles.paddingRight : styles.paddingLeft;
        if (styles.borderColor) {
          content.strokes = paint(styles.borderColor, styles.opacity);
          content.strokeWeight = styles.borderWidth || 1;
          content.strokeAlign = 'INSIDE';
        } if (styles.outlineColor) {
          outline = figma.createFrame();
          outline.strokes = paint(styles.outlineColor, styles.outlineOpacity);
          outline.strokeWeight = styles.outlineWidth || 1;
          outline.strokeAlign = 'OUTSIDE';
          
          buttonComponent.appendChild(outline);;
        }
        
        text.characters = 'Button';
        text.fills = paint(styles.color);
        text.fontSize = styles.fontSize;
        text.lineHeight = {
          value: styles.lineHeight,
          unit: 'PIXELS'
        }

        content.appendChild(text);
        buttonComponent.appendChild(content);
        buttonComponent.resize(content.width, content.height);
        buttonComponent.name = `Button ${button.name} - ${type}`;
        if (outline) {
          outline.resize(content.width, content.height);
        }
        row.appendChild(buttonComponent);
      }
      this._buttonsFrame.appendChild(row);
    }
  }

  private appendToStyleGuide() {
    this._styleGuide.appendChild(this._buttonsFrame);
  }
}