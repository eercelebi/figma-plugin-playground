import { ButtonConfig, Buttons } from "./Buttons/Buttons";
import { Color, Colors } from "./Colors/Colors";

figma.showUI(__html__);

figma.ui.onmessage = msg => {
  if (msg.type === 'generate') {
    const { data } = msg;

    const styleGuide = figma.createFrame();
    styleGuide.name = 'Style Guide';
    styleGuide.layoutMode = 'VERTICAL';
    styleGuide.counterAxisSizingMode = 'AUTO';
    styleGuide.itemSpacing = 100;
    styleGuide.paddingBottom = 24;
    styleGuide.paddingLeft = 24;
    styleGuide.paddingRight = 24;
    styleGuide.paddingTop = 24;


    const { colorRows }: { colorRows: Array<Array<Color>>} = data;
    if (colorRows && colorRows.length) {
      Colors.init({styleGuide, colorRows});
    }

    const { buttons }: { buttons: Array<ButtonConfig> } = data;
    if (buttons && buttons.length) {
      Buttons.init({styleGuide, buttons});
    }

    figma.currentPage.appendChild(styleGuide);
  }

  // figma.closePlugin();
};
