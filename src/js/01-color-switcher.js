import '../scss/main.scss';

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
refs.stopBtn.setAttribute('disabled', true);

const colorSwitch = {
  intervalId: null,

  start() {
    if (this.isActive) {
      return;
    }

    refs.startBtn.setAttribute('disabled', true);
    refs.stopBtn.removeAttribute('disabled', true);

    this.intervalId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
    refs.startBtn.removeAttribute('disabled', true);
    refs.stopBtn.setAttribute('disabled', true);
    document.body.removeAttribute('style');
  },
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
