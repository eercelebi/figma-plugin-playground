figma.showUI(__html__);

figma.ui.onmessage = msg => {
  if (msg.type === 'generate') {
    const { data } = msg;
    const { colorRows } = data;
    console.log(data);
    console.log('colorRows 2', colorRows);
  }

  figma.closePlugin();
};
