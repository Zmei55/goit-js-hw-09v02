const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

refs.startBtn.addEventListener('click', () => {
  colorSwitch.start();
});
refs.stopBtn.addEventListener('click', () => {
  colorSwitch.stop();
});

deactivateStopBtn();

const colorSwitch = {
  intervalId: null,
  isActive: false,

  start() {
    if (this.isActive) {
      return;
    }

    deactivateStartBtn();
    activateStopBtn();

    this.intervalId = setInterval(() => {
      updateBodyBgColor();
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
    activateStartBtn();
    deactivateStopBtn();
    clearBodyBg();
  },
};

function activateStartBtn() {
  refs.startBtn.removeAttribute('disabled', true);
}

function activateStopBtn() {
  refs.stopBtn.removeAttribute('disabled', true);
}

function deactivateStartBtn() {
  refs.startBtn.setAttribute('disabled', true);
}

function deactivateStopBtn() {
  refs.stopBtn.setAttribute('disabled', true);
}

function updateBodyBgColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function clearBodyBg() {
  document.body.removeAttribute('style');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
