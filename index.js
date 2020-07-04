
(() => {
  const typingArea = document.getElementById('capture-area');
  const codeArea = document.getElementById('result').firstElementChild;

  window.addEventListener('DOMContentLoaded', () => {
    const history = new EventHistory();
    typingArea.addEventListener('input', (evt) => history.recordEvent(evt));
  });
})();

class EventHistory {
  constructor() {
    this.startTime = null;
    this.events = [];
  }

  recordEvent(evt) {
    const { data } = evt;
    const inputType = evt.inputType;

    let evtValues;
    if (!this.startTime) {
      this.startTime = evt.timeStamp;
      evtValues = { data, inputType, timeStamp: 0 };
    }
    else {
      evtValues = { data, inputType, timeStamp: evt.timeStamp - this.startTime };
    }

    this.events.push(evtValues);
    document.getElementById('result').firstElementChild.innerText = JSON.stringify(this.events);
  }
}