import '../scss/common.scss';
import '../scss/timer.scss';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  inputRef: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  daysRef: document.querySelector('span[data-days]'),
  hoursRef: document.querySelector('span[data-hours]'),
  minutesRef: document.querySelector('span[data-minutes]'),
  secondsRef: document.querySelector('span[data-seconds]'),
};

deactivateStartBtn();
deactivateStopBtn();

let CURRENT_DATE = 0;
let TARGET_DATE = 0;
let INTERVAL_ID = 0;

const fp = flatpickr(refs.inputRef, {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  defaultDate: new Date(),
  minuteIncrement: 1,
  time_24hr: true,
  onClose(selectedDates) {
    if (selectedDates[0] <= CURRENT_DATE) {
      Notiflix.Notify.failure('Please choose a date in the future');
    }

    if (selectedDates[0] > CURRENT_DATE) {
      activateStartBtn();
      TARGET_DATE = selectedDates[0];
    }
  },
});

refs.startBtn.addEventListener('click', onClickStartBtn);
refs.stopBtn.addEventListener('click', onClickStopBtn);

function onClickStartBtn() {
  deactivateStartBtn();
  activateStopBtn();

  INTERVAL_ID = setInterval(() => {
    if (TARGET_DATE <= CURRENT_DATE) {
      onTimerStop();
      Notiflix.Notify.success('Action!!!');
      return;
    }

    CURRENT_DATE = new Date();
    const deltaTime = Date.parse(TARGET_DATE) - Date.parse(CURRENT_DATE);
    const time = getTimeComponents(deltaTime);

    updateTimerFace(time);
  }, 1000);
}

function onClickStopBtn() {
  onTimerStop();
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function getTimeComponents(time) {
  const days = addLeadingZero(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = addLeadingZero(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const mins = addLeadingZero(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = addLeadingZero(Math.floor((time % (1000 * 60)) / 1000));

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
  deactivateStopBtn();
  const time = getTimeComponents(0);
  updateTimerFace(time);
}

function deactivateStartBtn() {
  refs.startBtn.setAttribute('disabled', true);
}

function deactivateStopBtn() {
  refs.stopBtn.setAttribute('disabled', true);
}

function activateStartBtn() {
  refs.startBtn.removeAttribute('disabled', true);
}

function activateStopBtn() {
  refs.stopBtn.removeAttribute('disabled', true);
}
