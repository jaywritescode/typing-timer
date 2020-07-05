(() => {
  const typingArea = document.getElementById('capture-area');
  const codeArea = document.getElementById('result').firstElementChild;
  const replayButton = document.getElementById('start-replay');
  const replayArea = document.getElementById('show-replay');

  window.addEventListener('DOMContentLoaded', () => {
    const history = new EventHistory();

    typingArea.addEventListener('input', (evt) => {
      const events = history.recordEvent(evt);
      codeArea.innerText = JSON.stringify(events);
    });

    replayButton.addEventListener('click', () => {
      fetch('_test.json')
      .then(res => res.json())
      .then(doReplay)
      .catch(function (err) {
        var p = document.createElement('p');
        p.appendChild(
          document.createTextNode('Error: ' + error.message)
        );
        document.body.insertBefore(p, replayArea);
      });
    });
  });
})();

function doReplay(events) {
  if (!events.length) {
    return;
  }

  applyKeyboardEvent(events[0]);
  if (events.length > 1) {
    setTimeout(() => doReplay(events.slice(1)), events[1].timeStamp - events[0].timeStamp);
  }
}

function applyKeyboardEvent({ data, inputType }) {
    if (inputType == 'insertText') {
      appendText(data);
    }
}

function appendText(text) {
  console.group('appendText: "%s"', text);
  const replayArea = document.getElementById('show-replay');
  replayArea.textContent += text;
  console.groupEnd();
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