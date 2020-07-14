window.addEventListener('DOMContentLoaded', () => {
  new ClipboardJS(document.getElementById('copy'), {
    text: () => codeArea.getValue(),
  });
});