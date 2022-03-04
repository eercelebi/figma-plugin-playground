import './ui.css';

document.getElementById('generate').onclick = () => {
  const input = <HTMLInputElement>document.getElementById('json-input');
  const error = <HTMLElement>document.querySelector('.error');
  let data;
  try {
    const data = JSON.parse(input.value);
    error.style.visibility = 'hidden';
    parent.postMessage({ pluginMessage: { type: 'generate', data } }, '*')
  } catch(err) {
    error.style.visibility = null;
  }
  console.log('data', data); 
}

document.getElementById('cancel').onclick = () => {
  parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
}