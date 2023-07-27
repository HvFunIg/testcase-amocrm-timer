const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  let timerId;
 
  return (seconds) => {

    // Максимальное значение таймера из-за размерности
    if (seconds > 2147483)
      seconds = 2147483;
    let estimatedTime = seconds;

    /**
     * Создание строки таймера
     * @param {Number} estimatedTime - Время в секундах
     * @returns 
     */
    const getTimeString = (estimatedTime) =>{
      let estHours = Math.floor(estimatedTime / 3600);
        let estMinutes = Math.floor(estimatedTime % 3600 / 60);
        let estSeconds = estimatedTime % 60;

        estHours = estHours < 10 ? `0${estHours}` : estHours;
        estMinutes = estMinutes < 10 ? `0${estMinutes}` : estMinutes;
        estSeconds = estSeconds < 10 ? `0${estSeconds}` : estSeconds;

        return `${estHours}:${estMinutes}:${estSeconds}`;
    }
    
    if (!timerId){
      timerEl.innerHTML = getTimeString(estimatedTime);
      timerId = setInterval(() =>  {
        estimatedTime--;
        timerEl.innerHTML = getTimeString(estimatedTime);
      }, 1000);
    }
   
    // Очистка таймера
    setTimeout(() => { clearInterval(timerId); timerId = null;}, seconds * 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/[^0-9+]/g, '')
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);
  animateTimer(seconds);
  inputEl.value = '';
});
