import { ButtonConfig, Buttons } from "./Buttons/Buttons";
import { Color, Colors } from "./Colors/Colors";
import { HeadingConfig, Text, TextConfig } from "./Text/Text";

figma.showUI(__html__);

figma.ui.onmessage = async msg => {
  if (msg.type === 'generate') {

    await figma.loadFontAsync({
      family: 'Roboto',
      style: 'Regular'
    })
    await figma.loadFontAsync({
      family: 'Roboto',
      style: 'Bold'
    });
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

    const { headings, body }: { headings: Array<HeadingConfig>, body: Array<TextConfig>} = data;
    if (headings && headings.length) {
      Text.init({styleGuide, headings, body});
    }

    const { buttons }: { buttons: Array<ButtonConfig> } = data;
    if (buttons && buttons.length) {
      Buttons.init({styleGuide, buttons});
    }

    figma.currentPage.appendChild(styleGuide);
  } else if (msg.type == 'close') {
    figma.closePlugin();
  }
};
