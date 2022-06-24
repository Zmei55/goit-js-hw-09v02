import flatpickr from 'flatpickr';

const refs = {
  inputRef: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
};

const fp = flatpickr(refs.inputRef, {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  minDate: new Date(),
  time_24hr: true,
});
console.log('fp', fp);

// fp.open();
