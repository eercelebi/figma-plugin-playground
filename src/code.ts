import { Color, Colors } from "./Colors/Colors";

figma.showUI(__html__);

figma.ui.onmessage = msg => {
  if (msg.type === 'generate') {
    const { data } = msg;
    const { colorRows }: { colorRows: Array<Array<Color>>} = data;
    if (colorRows && colorRows.length) {
      Colors.init(colorRows);
    }
  }

  // figma.closePlugin();
};
