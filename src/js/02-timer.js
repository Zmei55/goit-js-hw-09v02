import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputRef: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  daysRef: document.querySelector('span[data-days]'),
  hoursRef: document.querySelector('span[data-hours]'),
  minutesRef: document.querySelector('span[data-minutes]'),
  secondsRef: document.querySelector('span[data-seconds]'),
};

refs.startBtn.setAttribute('disabled', true);
refs.stopBtn.setAttribute('disabled', true);

let CURRENT_DATE = 0;
let TARGET_DATE = 0;
let INTERVAL_ID = 0;
let bobyIntervalId = 0;

const fp = flatpickr(refs.inputRef, {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  defaultDate: new Date(),
  minuteIncrement: 1,
  time_24hr: true,
  onClose(selectedDates) {
    if (selectedDates[0] <= CURRENT_DATE) {
      window.alert('Please choose a date in the future');
    }

    if (selectedDates[0] > CURRENT_DATE) {
      refs.startBtn.removeAttribute('disabled', true);
      TARGET_DATE = selectedDates[0];
    }
  },
});

refs.startBtn.addEventListener('click', onClickStartBtn);
refs.stopBtn.addEventListener('click', onClickStopBtn);

function onClickStartBtn() {
  refs.startBtn.setAttribute('disabled', true);
  refs.stopBtn.removeAttribute('disabled', true);

  INTERVAL_ID = setInterval(() => {
    if (TARGET_DATE <= CURRENT_DATE) {
      onTimerStop();
      beacon();
      refs.stopBtn.removeAttribute('disabled', true);
      // window.alert('Action!!!');
      return;
    }

    CURRENT_DATE = new Date();
    const deltaTime = Date.parse(TARGET_DATE) - Date.parse(CURRENT_DATE);
    const time = getTimeComponents(deltaTime);
    console.log('time', time);

    updateTimerFace(time);
  }, 1000);
}

function onClickStopBtn() {
  onTimerStop();
  beaconStop();
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function getTimeComponents(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  return { days, hours, mins, secs };
}

function updateTimerFace({ days, hours, mins, secs }) {
  refs.daysRef.textContent = days;
  refs.hoursRef.textContent = hours;
  refs.minutesRef.textContent = mins;
  refs.secondsRef.textContent = secs;
}

function onTimerStop() {
  clearInterval(INTERVAL_ID);
  refs.stopBtn.setAttribute('disabled', true);
  const time = getTimeComponents(0);
  updateTimerFace(time);
}

function beacon() {
  bobyIntervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 500);
}

function beaconStop() {
  clearInterval(bobyIntervalId);
  refs.stopBtn.addEventListener('click', onClickStopBtn);
  document.body.removeAttribute('style');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
