(() => {
  const typingArea = document.getElementById('capture-area');
  const replayButton = document.getElementById('start-replay');
  const replayArea = document.getElementById('show-replay');

  window.addEventListener('DOMContentLoaded', () => {
    console.log('./index.js DOMContentLoaded');

    const history = new EventHistory();

    typingArea.addEventListener('input', (evt) => {
      const events = history.recordEvent(evt);
      updateResult(JSON.stringify(events));
    });
  });
})();

function doReplay(events, el) {
  if (!events.length) {
    return;
  }

  function appendText(data) {
    el.textContent += data;
  }

  function chopText() {
    el.textContent = el.textContent.slice(0, -1);
  }

  const actions = {
    insertText: appendText,
    deleteContentBackward: chopText,
  };

  function applyKeyboardEvent({ data, inputType }) {
    const fn = actions[inputType] || function() {};
    fn(data);
  }

  (function replay(events) {
    applyKeyboardEvent(events[0]);
    if (events.length > 1) {
      setTimeout(() => replay(events.slice(1)), events[1].timeStamp - events[0].timeStamp);
    }
  })(events);
}

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
    return this.events;
  }
}

export default doReplay;

console.log('./index.js is loaded');