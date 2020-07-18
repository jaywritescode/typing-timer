import clickclack from '../index';

window.addEventListener('DOMContentLoaded', () => {
  console.log('webpage/index.js DOMContentLoaded');

  new ClipboardJS(document.getElementById('copy'), {
    text: () => codeArea.getValue(),
  });

  const replayButton = document.getElementById('start-replay');
  const replayArea = document.getElementById('show-replay');
  replayButton.addEventListener('click', () => {
    const commands = JSON.parse(codeArea.getValue());
    clickclack(commands, replayArea);
  });
});

console.log('webpage/index.js is loaded');