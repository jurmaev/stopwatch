(() => {
  let milliseconds = 0;
  let intervalId;
  let laps = 0;
  let previousLap = 0;

  const stopwatch = document.querySelector('.stopwatch');
  const startBtn = document.querySelector('.btn');
  const controls = document.querySelector('.controls');
  const lapsContainer = document.querySelector('.laps');

  function getNumber(number) {
    return number < 10 ? '0' + number : number;
  }

  function getTime(milliseconds) {
    const minutes = parseInt(milliseconds / 1000 / 60);
    const seconds = parseInt(milliseconds / 1000);
    const decimal = parseInt((milliseconds % 1000) / 10);
    return `${getNumber(minutes)}:${getNumber(seconds)}.${getNumber(decimal)}`;
  }

  function startInterval() {
    const id = setInterval(() => {
      stopwatch.textContent = getTime(milliseconds);
      milliseconds += 10;
    }, 10);
    return id;
  }

  startBtn.addEventListener('click', () => {
    intervalId = startInterval();

    const lapResetBtn = document.createElement('button');
    lapResetBtn.classList.add('btn');
    lapResetBtn.textContent = 'Lap';
    lapResetBtn.id = 'lap';

    const pauseResumeBtn = document.createElement('button');
    pauseResumeBtn.classList.add('btn');
    pauseResumeBtn.textContent = 'Pause';
    pauseResumeBtn.id = 'pause';

    controls.innerHTML = '';
    controls.append(lapResetBtn);
    controls.append(pauseResumeBtn);

    lapResetBtn.addEventListener('click', () => {
      if (lapResetBtn.id === 'lap') {
        const lapsItem = document.createElement('div');
        const lapsNumber = document.createElement('span');
        const lapsTime = document.createElement('span');
        const lapsDiff = document.createElement('span');

        lapsItem.classList.add('laps__item');
        lapsNumber.classList.add('laps__number');
        lapsTime.classList.add('laps__time');
        lapsDiff.classList.add('laps__diff');

        lapsNumber.textContent = getNumber(++laps);
        lapsTime.textContent = getTime(milliseconds);
        lapsDiff.textContent = `+${getTime(milliseconds - previousLap)}`;
        previousLap = milliseconds;

        lapsItem.append(lapsNumber);
        lapsItem.append(lapsTime);
        lapsItem.append(lapsDiff);
        lapsContainer.prepend(lapsItem);
      } else if (lapResetBtn.id === 'reset') {
        milliseconds = 0;
        laps = 0;
        stopwatch.textContent = '00:00.00';
        controls.innerHTML = '';
        lapsContainer.innerHTML = '';
        controls.append(startBtn);
        clearInterval(intervalId);
      }
    });

    pauseResumeBtn.addEventListener('click', () => {
      if (pauseResumeBtn.id === 'pause') {
        clearInterval(intervalId);
        lapResetBtn.textContent = 'Reset';
        lapResetBtn.id = 'reset';
        pauseResumeBtn.textContent = 'Resume';
        pauseResumeBtn.id = 'resume';
      } else if (pauseResumeBtn.id === 'resume') {
        intervalId = startInterval();
        lapResetBtn.textContent = 'Lap';
        lapResetBtn.id = 'lap';
        pauseResumeBtn.textContent = 'Pause';
        pauseResumeBtn.id = 'pause';
      }
    });
  });
})();
