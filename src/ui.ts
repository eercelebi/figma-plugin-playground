import './ui.css';

document.getElementById('generate').onclick = () => {
  const input = <HTMLInputElement>document.getElementById('json-input');
  const error = <HTMLElement>document.querySelector('.error');
  try {
    const data = JSON.parse(input.value);
    error.style.visibility = 'hidden';
    parent.postMessage({ pluginMessage: { type: 'generate', data } }, '*')
  } catch(err) {
    error.style.visibility = null;
  }
}

document.getElementById('close').onclick = () => {
  parent.postMessage({ pluginMessage: { type: 'close' } }, '*')
}

document.getElementById('updateStyles').onclick = () => {
  const input = <HTMLInputElement>document.getElementById('json-input');
  const error = <HTMLElement>document.querySelector('.error');
  try {
    const data = JSON.parse(input.value);
    error.style.visibility = 'hidden';
    parent.postMessage({ pluginMessage: { type: 'updateStyles', data } }, '*');
    console.log('post message');
  } catch(err) {
    error.style.visibility = null;
  }
  console.log('hello');
}