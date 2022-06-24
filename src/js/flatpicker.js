import flatpickr from 'flatpickr';
import refs from './refs';

flatpickr('#datetime-picker', {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  time_24hr: true,
  minDate: current,
  // altInput: 'd M Y H:i',
  // altFormat: true,
});
