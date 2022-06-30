import Notiflix from 'notiflix';

const refs = {
  firstDelayRef: document.querySelector('input[name="delay"]'),
  delayStepRef: document.querySelector('input[name="step"]'),
  amountRef: document.querySelector('input[name="amount"]'),
  submitBtn: document.querySelector('button[type="submit"]'),
};

let delay = 0;

refs.submitBtn.addEventListener('click', onClickSubmitBtn);

function onClickSubmitBtn(event) {
  event.preventDefault();

  let step = Number(refs.delayStepRef.value);
  let amount = Number(refs.amountRef.value);

  delay = Number(refs.firstDelayRef.value);

  for (let i = 1; i <= amount; i += 1) {
    delay += step;

    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
