import { paint } from "../Helpers/Helpers";

export class DocumentStyles {
  private _config: any;
  private _styles: Map<String, any>;

  constructor(config: any) {
    this._config = config;

    this._styles = this.getDocumentStyles();
    
    this.updateDocumentColors();
    this.updateDocumentTexts();
  }

  /**
   * gets the color and text styles from figma document and creates a 
   * mapping between each style's name and the style itself for easier 
   * access throughout the rest of the class
   */
  getDocumentStyles(): Map<String, any> {
    const styles = new Map<String, any>();

    for (const style of figma.getLocalTextStyles()) {
      styles.set(style.name, style);
    }

    for (const style of figma.getLocalPaintStyles()) {
      styles.set(style.name, style);
    }

    return styles;
  }

  updateDocumentColors() {
    for (const base in this._config.colors) {
      for (const type in this._config.colors[base]) {
        const style = this._styles.get(`${base}/${type}`);
        style.paints = paint(this._config.colors[base][type].hex);
      }
    }
  }

  updateDocumentTexts() {
    // headings 
    for (const base in this._config.headings) {
      for (const type in this._config.headings[base]) {
        const style = this._styles.get(`${base}/${type}`);
        const configStyles = this._config.headings[base][type];
        style.fontSize = configStyles.fontSize;
        style.lineHeight = {
          value: configStyles.lineHeight,
          unit: 'PIXELS'
        }
        style.fontName = {
          family: 'Roboto',
          style: configStyles.fontWeight == 700 ? 'Bold' : 'Regular'
        }
        style.textCase = configStyles.textCase || 'ORIGINAL';
      }
    }

    // body text
    for (const base in this._config.bodies) {
      for (const type in this._config.bodies[base]) {
        for (const variation in this._config.bodies[base][type]) {
          const style = this._styles.get(`${base}/${type}/${variation}`);
          const configStyles = this._config.bodies[base][type][variation];
          style.fontSize = configStyles.fontSize;
          style.lineHeight = {
            value: configStyles.lineHeight,
            unit: 'PIXELS'
          }
          style.fontName = {
            family: 'Roboto',
            style: configStyles.fontWeight == 700 ? 'Bold' : 'Regular'
          }
          style.textDecoration = configStyles.textDecoration || 'NONE';
        }
      }
    }
  }
}